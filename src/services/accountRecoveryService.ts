import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { sanitizePhone } from './phoneVerificationService';

export interface RecoveryRequest {
  id: string;
  phone: string;
  phoneLast4: string;
  fullName: string;
  note?: string;
  status: 'pending' | 'approved' | 'used' | 'revoked';
  grantId?: string;
  nextVersion?: number;
  matchedUid?: string;
  createdAtMillis?: number | null;
  approvedAtMillis?: number | null;
  usedAtMillis?: number | null;
}

export interface AppUserRecord {
  uid: string;
  displayName: string;
  phone: string;
  email: string;
  role: string;
  disabled: boolean;
  createdAt: string | null;
}

export interface IssuedRecoveryResult {
  requestId: string;
  code: string;
  phone: string;
  fullName: string;
  nextVersion: number;
  matchedExistingAccount: boolean;
}

const LAST_RECOVERY_REQUEST_KEY = 'qataba_last_recovery_request_ts';
const RECOVERY_COOLDOWN_MS = 45 * 1000;

function isPermissionError(error: unknown): boolean {
  const err = error as { code?: string; message?: string } | null;
  return (
    err?.code === 'permission-denied' ||
    String(err?.message || '').includes('Missing or insufficient permissions')
  );
}

function getRecoveryEmail(cleanPhone: string, version: number): string {
  return `user_967${cleanPhone}_v${version}@qataba-blood.app`;
}

export async function sha256Hex(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function buildRecoveryGrantId(cleanPhone: string, code: string): Promise<string> {
  return sha256Hex(`qataba_recovery:${cleanPhone}:${code.trim()}`);
}

function generateSixDigitCode(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return String(100000 + (arr[0] % 900000));
  }
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createSafeDocId(prefix: string): string {
  const randomPart =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 14)
      : Math.random().toString(36).slice(2, 12);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

async function resolveExistingAccountForPhone(cleanPhone: string): Promise<{
  previousUid: string;
  previousDonorId: string;
  currentVersion: number;
  resolvedName: string;
}> {
  let previousUid = '';
  let previousDonorId = '';
  let currentVersion = 0;
  let resolvedName = '';

  try {
    const phoneAuthSnap = await getDoc(doc(db, 'phone_auth', cleanPhone));
    if (phoneAuthSnap.exists()) {
      const data = phoneAuthSnap.data();
      previousUid = String(data.userId || '');
      currentVersion = Number(data.version) || 1;
    }
  } catch (err) {
    console.warn('Could not inspect phone_auth during recovery lookup:', err);
  }

  try {
    const usersSnap = await getDocs(
      query(collection(db, 'users'), where('phone', '==', cleanPhone))
    );
    if (!usersSnap.empty) {
      const userDoc = usersSnap.docs[0];
      if (!previousUid) previousUid = userDoc.id;
      resolvedName = String(userDoc.data()?.displayName || '');
    }
  } catch (err) {
    console.warn('Could not inspect users during recovery lookup:', err);
  }

  try {
    if (previousUid) {
      const byUidSnap = await getDocs(
        query(collection(db, 'donors'), where('userId', '==', previousUid))
      );
      if (!byUidSnap.empty) {
        previousDonorId = byUidSnap.docs[0].id;
        if (!resolvedName) {
          resolvedName = String(byUidSnap.docs[0].data()?.fullName || '');
        }
      }
    }
    if (!previousDonorId) {
      const allDonorsSnap = await getDocs(collection(db, 'donors'));
      const matched = allDonorsSnap.docs.find((d) => {
        const donorPhone = sanitizePhone(String(d.data()?.phone || ''));
        return donorPhone === cleanPhone;
      });
      if (matched) {
        const candidateUid = String(matched.data()?.userId || '');
        if (!previousUid && candidateUid) {
          try {
            const candidateUserSnap = await getDoc(doc(db, 'users', candidateUid));
            const candidateRole = String(candidateUserSnap.data()?.role || 'user');
            if (candidateRole !== 'admin') {
              previousUid = candidateUid;
            }
          } catch {
            // Do not blindly adopt an unverified donor uploader UID
          }
        }
        if (candidateUid && candidateUid === previousUid) {
          previousDonorId = matched.id;
        }
        if (!resolvedName) {
          resolvedName = String(matched.data()?.fullName || '');
        }
      }
    }
  } catch (err) {
    console.warn('Could not inspect donors during recovery lookup:', err);
  }

  return { previousUid, previousDonorId, currentVersion, resolvedName };
}

/**
 * Step 1 (User): Submit a password recovery request using only Phone + Full Name (no UID required).
 */
export async function requestAccountRecoveryByPhone(
  phone: string,
  fullName: string,
  note?: string
): Promise<{ requestId: string; phone: string; fullName: string; message: string }> {
  const cleanPhone = sanitizePhone(phone);
  const trimmedName = fullName.trim();
  const trimmedNote = (note || '').trim().slice(0, 300);

  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
    throw new Error('يرجى إدخال رقم الهاتف المسجل بشكل صحيح (مثال: 773633918).');
  }
  if (trimmedName.length < 2) {
    throw new Error('يرجى إدخال الاسم الكامل للمساعدة في التحقق من الحساب.');
  }

  if (typeof window !== 'undefined') {
    const lastTs = Number(localStorage.getItem(`${LAST_RECOVERY_REQUEST_KEY}_${cleanPhone}`) || 0);
    if (lastTs && Date.now() - lastTs < RECOVERY_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RECOVERY_COOLDOWN_MS - (Date.now() - lastTs)) / 1000);
      throw new Error(`تم إرسال طلب لهذا الرقم قبل قليل. انتظر ${waitSeconds} ثانية أو أدخل الرمز إذا وصلك من المسؤول.`);
    }
  }

  const requestId = createSafeDocId('req');
  const path = `account_recovery_requests/${requestId}`;
  try {
    await setDoc(doc(db, 'account_recovery_requests', requestId), {
      phone: cleanPhone,
      fullName: trimmedName.slice(0, 100),
      ...(trimmedNote ? { note: trimmedNote } : {}),
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
    throw new Error('تعذر حفظ طلب الاستعادة في قاعدة البيانات. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.');
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(`${LAST_RECOVERY_REQUEST_KEY}_${cleanPhone}`, String(Date.now()));
  }

  return {
    requestId,
    phone: cleanPhone,
    fullName: trimmedName,
    message: 'تم إرسال طلب استعادة كلمة المرور للمسؤول بنجاح.',
  };
}

/**
 * Step 2 (User): Validate admin-issued 6-digit recovery code and set a brand-new password.
 * Rotates to next available version slot (_v2.._v50), invalidating older credentials via phone_auth.
 */
export async function completeAccountRecoveryByCode(params: {
  phone: string;
  code: string;
  newPassword: string;
  fullName?: string;
  requestId?: string;
}): Promise<{ message: string; assignedVersion: number; uid: string }> {
  const cleanPhone = sanitizePhone(params.phone);
  const code = params.code.trim();
  const newPassword = params.newPassword;

  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
    throw new Error('يرجى إدخال رقم الهاتف المسجل بشكل صحيح.');
  }
  if (!/^\d{6}$/.test(code)) {
    throw new Error('رمز الاستعادة يجب أن يتكون من 6 أرقام.');
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error('كلمة المرور الجديدة يجب أن لا تقل عن 6 خانات.');
  }

  const grantId = await buildRecoveryGrantId(cleanPhone, code);
  const grantRef = doc(db, 'recovery_grants', grantId);

  let grantSnap;
  try {
    grantSnap = await getDocFromServer(grantRef);
  } catch {
    grantSnap = await getDoc(grantRef);
  }

  if (!grantSnap.exists()) {
    throw new Error('رقم الهاتف أو رمز الاستعادة غير صحيح. تأكد من الرمز المرسل لك من المسؤول.');
  }

  const grantData = grantSnap.data();
  if (grantData.status === 'used') {
    throw new Error('تم استخدام هذا الرمز مسبقاً. يمكنك تسجيل الدخول الآن بكلمة المرور الجديدة.');
  }
  if (grantData.status !== 'active') {
    throw new Error('انتهت صلاحية هذا الرمز أو تم إلغاؤه من المسؤول. اطلب رمزاً جديداً.');
  }

  const startVersion = Math.max(2, Number(grantData.nextVersion) || 2);
  const recoveryDisplayName =
    (params.fullName || '').trim().slice(0, 100) || `مستخدم ${cleanPhone}`;

  if (typeof window !== 'undefined') {
    (window as any).__QATABA_RECOVERY_IN_PROGRESS__ = true;
  }

  try {
    let createdCred = null as Awaited<ReturnType<typeof createUserWithEmailAndPassword>> | null;
    let assignedVersion = startVersion;

    for (let version = startVersion; version <= 50; version++) {
      const candidateEmail = getRecoveryEmail(cleanPhone, version);
      try {
        createdCred = await createUserWithEmailAndPassword(auth, candidateEmail, newPassword);
        assignedVersion = version;
        break;
      } catch (authErr: any) {
        if (authErr?.code === 'auth/email-already-in-use') {
          continue;
        }
        if (authErr?.code === 'auth/weak-password') {
          throw new Error('كلمة المرور الجديدة ضعيفة. اختر كلمة مرور أقوى (6 خانات فأكثر).');
        }
        if (authErr?.code === 'auth/operation-not-allowed') {
          throw new Error('خدمة تسجيل الدخول بكلمة المرور غير مفعلة في إعدادات Firebase.');
        }
        throw authErr;
      }
    }

    if (!createdCred) {
      throw new Error('تعذر تخصيص نسخة دخول جديدة لهذا الرقم. تواصل مع المسؤول.');
    }

    const newUid = createdCred.user.uid;
    try {
      await updateProfile(createdCred.user, { displayName: recoveryDisplayName });
    } catch {
      // Non-fatal; Firestore profile holds canonical name
    }

    const phoneAuthRef = doc(db, 'phone_auth', cleanPhone);
    const existingPhoneAuthSnap = await getDoc(phoneAuthRef);

    const targetRequestId = String(grantData.requestId || params.requestId || '').trim();
    const previousUid = String(grantData.previousUid || '').trim();
    const previousDonorId = String(grantData.previousDonorId || '').trim();

    let canTransferDonor = false;
    if (previousDonorId && previousUid) {
      try {
        const donorSnap = await getDoc(doc(db, 'donors', previousDonorId));
        canTransferDonor = donorSnap.exists() && donorSnap.data()?.userId === previousUid;
      } catch {
        canTransferDonor = false;
      }
    }

    const batch = writeBatch(db);

    batch.set(doc(db, 'users', newUid), {
      displayName: recoveryDisplayName,
      phone: cleanPhone,
      phoneVerified: true,
      role: 'user',
      recoveredFromUid: previousUid,
      recoveredGrantId: grantId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    batch.update(grantRef, {
      status: 'used',
      claimedByUid: newUid,
      usedAt: serverTimestamp(),
    });

    if (existingPhoneAuthSnap.exists()) {
      batch.update(phoneAuthRef, {
        phone: cleanPhone,
        version: assignedVersion,
        userId: newUid,
        grantId,
        updatedAt: serverTimestamp(),
      });
    } else {
      batch.set(phoneAuthRef, {
        phone: cleanPhone,
        version: assignedVersion,
        userId: newUid,
        grantId,
        updatedAt: serverTimestamp(),
      });
    }

    if (targetRequestId) {
      batch.update(doc(db, 'account_recovery_requests', targetRequestId), {
        status: 'used',
        usedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    if (canTransferDonor) {
      batch.update(doc(db, 'donors', previousDonorId), {
        userId: newUid,
        updatedAt: serverTimestamp(),
      });
    }

    try {
      await batch.commit();
    } catch (error) {
      if (isPermissionError(error)) {
        handleFirestoreError(error, OperationType.WRITE, `recovery_grants/${grantId}`);
      }
      throw error;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(`blood_app_phone_auth_version_${cleanPhone}`, String(assignedVersion));
      localStorage.removeItem('blood_app_guest');
      localStorage.removeItem('has_logged_out');
      localStorage.removeItem('qataba_recovery_phone');
      localStorage.removeItem('qataba_recovery_name');
      localStorage.removeItem('qataba_recovery_request_id');
      delete (window as any).__QATABA_RECOVERY_IN_PROGRESS__;
      window.dispatchEvent(new Event('qataba-recovery-complete'));
    }

    return {
      message: 'تم التحقق من الرمز وتعيين كلمة المرور الجديدة بنجاح!',
      assignedVersion,
      uid: newUid,
    };
  } finally {
    if (typeof window !== 'undefined') {
      delete (window as any).__QATABA_RECOVERY_IN_PROGRESS__;
    }
  }
}

/**
 * Admin: List all password recovery requests from Firestore.
 */
export async function listAccountRecoveryRequests(): Promise<RecoveryRequest[]> {
  const path = 'account_recovery_requests';
  try {
    const snap = await getDocs(collection(db, path));
    return snap.docs
      .map((docSnap) => {
        const data = docSnap.data();
        const phone = sanitizePhone(String(data.phone || ''));
        return {
          id: docSnap.id,
          phone,
          phoneLast4: phone ? phone.slice(-4) : String(data.phoneLast4 || ''),
          fullName: String(data.fullName || data.displayName || 'مستخدم'),
          note: typeof data.note === 'string' ? data.note : undefined,
          status: (data.status || 'pending') as RecoveryRequest['status'],
          grantId: typeof data.grantId === 'string' ? data.grantId : undefined,
          nextVersion: typeof data.nextVersion === 'number' ? data.nextVersion : undefined,
          matchedUid: typeof data.matchedUid === 'string' ? data.matchedUid : undefined,
          createdAtMillis: data.createdAt?.toMillis?.() || null,
          approvedAtMillis: data.approvedAt?.toMillis?.() || null,
          usedAtMillis: data.usedAt?.toMillis?.() || null,
        };
      })
      .sort((a, b) => (b.createdAtMillis || 0) - (a.createdAtMillis || 0))
      .slice(0, 100);
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
    throw error;
  }
}

/**
 * Admin: Verify and approve an existing recovery request, creating a hashed 6-digit grant.
 */
export async function approveAccountRecovery(requestId: string): Promise<IssuedRecoveryResult> {
  const reqRef = doc(db, 'account_recovery_requests', requestId);
  const reqSnap = await getDoc(reqRef);
  if (!reqSnap.exists()) {
    throw new Error('طلب الاستعادة غير موجود.');
  }

  const reqData = reqSnap.data();
  const cleanPhone = sanitizePhone(String(reqData.phone || ''));
  if (!cleanPhone || cleanPhone.length < 7) {
    throw new Error('رقم الهاتف المرتبط بالطلب غير صالح.');
  }

  const { previousUid, previousDonorId, currentVersion, resolvedName } =
    await resolveExistingAccountForPhone(cleanPhone);

  const requestedVersion = Math.max(2, currentVersion + 1, (Number(reqData.nextVersion) || 1) + 1);
  const nextVersion = Math.min(50, requestedVersion);
  const code = generateSixDigitCode();
  const grantId = await buildRecoveryGrantId(cleanPhone, code);

  const batch = writeBatch(db);
  if (reqData.grantId && typeof reqData.grantId === 'string') {
    const oldGrantRef = doc(db, 'recovery_grants', reqData.grantId);
    try {
      const oldGrantSnap = await getDoc(oldGrantRef);
      if (oldGrantSnap.exists() && oldGrantSnap.data()?.status === 'active') {
        batch.update(oldGrantRef, {
          status: 'revoked',
          revokedAt: serverTimestamp(),
        });
      }
    } catch {
      // Ignore if old grant is missing or inaccessible
    }
  }

  batch.set(doc(db, 'recovery_grants', grantId), {
    nextVersion,
    ...(previousUid ? { previousUid } : {}),
    ...(previousDonorId ? { previousDonorId } : {}),
    requestId,
    status: 'active',
    createdAt: serverTimestamp(),
  });

  batch.update(reqRef, {
    status: 'approved',
    grantId,
    nextVersion,
    matchedUid: previousUid || '',
    approvedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.WRITE, `account_recovery_requests/${requestId}`);
    }
    throw error;
  }

  return {
    requestId,
    code,
    phone: cleanPhone,
    fullName: String(reqData.fullName || resolvedName || 'مستخدم'),
    nextVersion,
    matchedExistingAccount: Boolean(previousUid),
  };
}

/**
 * Admin: Issue a 6-digit recovery code directly for any phone number without waiting for a prior form.
 */
export async function issueDirectRecoveryByPhone(
  phone: string,
  fullNameHint?: string
): Promise<IssuedRecoveryResult> {
  const cleanPhone = sanitizePhone(phone);
  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
    throw new Error('يرجى إدخال رقم هاتف صحيح (مثال: 773633918).');
  }

  const { previousUid, previousDonorId, currentVersion, resolvedName } =
    await resolveExistingAccountForPhone(cleanPhone);

  const nextVersion = Math.min(50, Math.max(2, currentVersion + 1));
  const code = generateSixDigitCode();
  const grantId = await buildRecoveryGrantId(cleanPhone, code);
  const requestId = createSafeDocId('req');
  const displayName = (fullNameHint || '').trim() || resolvedName || `مستخدم ${cleanPhone}`;

  const batch = writeBatch(db);
  batch.set(doc(db, 'recovery_grants', grantId), {
    nextVersion,
    ...(previousUid ? { previousUid } : {}),
    ...(previousDonorId ? { previousDonorId } : {}),
    requestId,
    status: 'active',
    createdAt: serverTimestamp(),
  });

  batch.set(doc(db, 'account_recovery_requests', requestId), {
    phone: cleanPhone,
    fullName: displayName.slice(0, 100),
    note: 'إصدار مباشر من لوحة المسؤول',
    status: 'approved',
    grantId,
    nextVersion,
    matchedUid: previousUid || '',
    createdAt: serverTimestamp(),
    approvedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  try {
    await batch.commit();
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.WRITE, `recovery_grants/${grantId}`);
    }
    throw error;
  }

  return {
    requestId,
    code,
    phone: cleanPhone,
    fullName: displayName,
    nextVersion,
    matchedExistingAccount: Boolean(previousUid),
  };
}

/**
 * Admin: Revoke an unused recovery code/request.
 */
export async function revokeAccountRecovery(requestId: string): Promise<void> {
  const reqRef = doc(db, 'account_recovery_requests', requestId);
  const reqSnap = await getDoc(reqRef);
  if (!reqSnap.exists()) {
    throw new Error('طلب الاستعادة غير موجود.');
  }

  const grantId = reqSnap.data()?.grantId;
  const batch = writeBatch(db);
  batch.update(reqRef, {
    status: 'revoked',
    revokedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  if (grantId && typeof grantId === 'string') {
    batch.update(doc(db, 'recovery_grants', grantId), {
      status: 'revoked',
      revokedAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.UPDATE, `account_recovery_requests/${requestId}`);
    }
    throw error;
  }
}

/**
 * Admin: Delete a closed/revoked recovery request entry.
 */
export async function deleteAccountRecoveryRequest(requestId: string): Promise<void> {
  const path = `account_recovery_requests/${requestId}`;
  const reqRef = doc(db, 'account_recovery_requests', requestId);
  try {
    const reqSnap = await getDoc(reqRef);
    const batch = writeBatch(db);
    const grantId = reqSnap.exists() ? reqSnap.data()?.grantId : null;
    if (grantId && typeof grantId === 'string') {
      const grantRef = doc(db, 'recovery_grants', grantId);
      const grantSnap = await getDoc(grantRef);
      if (grantSnap.exists() && grantSnap.data()?.status === 'active') {
        batch.update(grantRef, {
          status: 'revoked',
          revokedAt: serverTimestamp(),
        });
      }
    }
    batch.delete(reqRef);
    await batch.commit();
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
    throw error;
  }
}

export async function listAppUsers(): Promise<AppUserRecord[]> {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      displayName: String(data.displayName || 'مستخدم'),
      phone: String(data.phone || ''),
      email: String(data.email || ''),
      role: String(data.role || 'user'),
      disabled: false,
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
    };
  });
}

export async function deleteAppUser(uid: string): Promise<void> {
  const path = `users/${uid}`;
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (error) {
    if (isPermissionError(error)) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
    throw error;
  }
}
