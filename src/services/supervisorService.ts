import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions, handleFirestoreError, OperationType } from '../firebase';
import {
  AdminAuditLog,
  AdminRoleLevel,
  SupervisorLevel,
  SupervisorPermissions,
  SupervisorRecord,
} from '../types';
import { sanitizePhone } from './phoneVerificationService';

const SUPERVISORS_COLLECTION = 'supervisors';
const AUDIT_LOGS_COLLECTION = 'admin_audit_logs';

export const OWNER_EMAILS = new Set<string>([
  'ziadalsyyadi@gmail.com',
  'user_967773633918_v1@qataba-blood.app',
]);

export const OWNER_PHONE = '773633918';

export function isOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}

export const EMPTY_PERMISSIONS: SupervisorPermissions = {
  manageDonors: false,
  manageUrgentRequests: false,
  manageSupportChat: false,
  manageHospitals: false,
  manageLocations: false,
  manageSettings: false,
  manageUsersRecovery: false,
  manageSupervisors: false,
};

export const OWNER_PERMISSIONS: SupervisorPermissions = {
  manageDonors: true,
  manageUrgentRequests: true,
  manageSupportChat: true,
  manageHospitals: true,
  manageLocations: true,
  manageSettings: true,
  manageUsersRecovery: true,
  manageSupervisors: true,
};

export const SUPERVISOR_LEVEL_META: Record<
  SupervisorLevel,
  {
    label: string;
    shortLabel: string;
    description: string;
    defaultPermissions: SupervisorPermissions;
  }
> = {
  donor_admin: {
    label: 'مشرف المتبرعين',
    shortLabel: 'المتبرعون',
    description: 'إضافة وتعديل وإدارة بيانات وسجلات المتبرعين فقط',
    defaultPermissions: {
      ...EMPTY_PERMISSIONS,
      manageDonors: true,
    },
  },
  urgent_admin: {
    label: 'مشرف الطلبات العاجلة',
    shortLabel: 'الطلبات العاجلة',
    description: 'إدارة طلبات الدم العاجلة وإغلاقها أو حذفها فقط',
    defaultPermissions: {
      ...EMPTY_PERMISSIONS,
      manageUrgentRequests: true,
    },
  },
  support_admin: {
    label: 'مشرف الدعم',
    shortLabel: 'الدعم والبلاغات',
    description: 'متابعة رسائل الدعم الفني والبلاغات والرد عليها فقط',
    defaultPermissions: {
      ...EMPTY_PERMISSIONS,
      manageSupportChat: true,
    },
  },
  general_admin: {
    label: 'مشرف عام',
    shortLabel: 'مشرف عام',
    description: 'إدارة المتبرعين والطلبات والرسائل والمرافق دون إدارة المالك أو المشرفين',
    defaultPermissions: {
      manageDonors: true,
      manageUrgentRequests: true,
      manageSupportChat: true,
      manageHospitals: true,
      manageLocations: true,
      manageSettings: true,
      manageUsersRecovery: false,
      manageSupervisors: false,
    },
  },
};

export const ALL_SUPERVISOR_LEVEL_LABELS: Record<AdminRoleLevel, string> = {
  owner: 'المالك',
  donor_admin: 'مشرف المتبرعين',
  urgent_admin: 'مشرف الطلبات العاجلة',
  support_admin: 'مشرف الدعم',
  general_admin: 'مشرف عام',
  legacy_admin: 'مشرف عام',
};

export const PERMISSION_LABELS: Array<{
  key: keyof Omit<SupervisorPermissions, 'manageSupervisors'>;
  label: string;
  description: string;
}> = [
  {
    key: 'manageDonors',
    label: 'إدارة المتبرعين',
    description: 'إضافة وتعديل وحذف واستيراد وتصدير المتبرعين',
  },
  {
    key: 'manageUrgentRequests',
    label: 'إدارة الطلبات العاجلة',
    description: 'إغلاق وإعادة فتح وتعديل وحذف طلبات الدم العاجلة',
  },
  {
    key: 'manageSupportChat',
    label: 'متابعة الدعم والبلاغات',
    description: 'قراءة رسائل المستخدمين والرد عليها وتغيير حالتها',
  },
  {
    key: 'manageHospitals',
    label: 'إدارة المستشفيات والمراكز',
    description: 'إضافة وتعديل وحذف المرافق الطبية في الدليل',
  },
  {
    key: 'manageLocations',
    label: 'إدارة المناطق والعُزل',
    description: 'إضافة وتعديل وحذف أسماء المناطق المعتمدة',
  },
  {
    key: 'manageSettings',
    label: 'إدارة الإعلانات والتنبيهات',
    description: 'تحديث البانر التنبيهي والإعلان العام بالرئيسية',
  },
  {
    key: 'manageUsersRecovery',
    label: 'إدارة المستخدمين والاستعادة',
    description: 'مراجعة الحسابات وإصدار رموز استعادة الحساب (لا يشمل المالك أو المشرفين)',
  },
];

export function sanitizeSupervisorPermissions(
  input: Partial<SupervisorPermissions>
): SupervisorPermissions {
  return {
    manageDonors: Boolean(input.manageDonors),
    manageUrgentRequests: Boolean(input.manageUrgentRequests),
    manageSupportChat: Boolean(input.manageSupportChat),
    manageHospitals: Boolean(input.manageHospitals),
    manageLocations: Boolean(input.manageLocations),
    manageSettings: Boolean(input.manageSettings),
    manageUsersRecovery: Boolean(input.manageUsersRecovery),
    // Owner-exclusive permission can never be delegated to supervisors.
    manageSupervisors: false,
  };
}

export interface ResolvedSupervisorCandidate {
  uid: string;
  displayName: string;
  phone: string;
  email: string;
  existingSupervisor: boolean;
}

function createSafeDocId(prefix: string): string {
  const randomPart =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 14)
      : Math.random().toString(36).slice(2, 12);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

/**
 * Resolves an ALREADY EXISTING user account in Firebase Authentication / Firestore
 * by phone number or email address. Never creates a new Auth user or changes passwords.
 */
export async function resolveExistingUserForSupervisor(
  identifierInput: string
): Promise<ResolvedSupervisorCandidate> {
  const raw = identifierInput.trim();
  if (!raw) {
    throw new Error('يرجى إدخال رقم هاتف المستخدم أو بريده الإلكتروني.');
  }

  let matchedUid = '';
  let matchedName = '';
  let matchedPhone = '';
  let matchedEmail = '';

  const looksLikeEmail = raw.includes('@');

  if (looksLikeEmail) {
    const normalizedEmail = raw.toLowerCase();
    if (isOwnerEmail(normalizedEmail)) {
      throw new Error('هذا الحساب هو حساب المالك الأساسي ويملك كافة الصلاحيات بالفعل.');
    }

    // Check if email matches the app's synthetic phone email pattern
    const syntheticPhoneMatch = normalizedEmail.match(/^user_967(\d+)_v\d+@qataba-blood\.app$/);
    if (syntheticPhoneMatch) {
      matchedPhone = sanitizePhone(syntheticPhoneMatch[1]);
    }

    // 1) Query Firestore users collection by exact normalized email
    try {
      const byEmailSnap = await getDocs(
        query(collection(db, 'users'), where('email', '==', normalizedEmail), limit(5))
      );
      if (!byEmailSnap.empty) {
        const d = byEmailSnap.docs[0];
        const data = d.data();
        matchedUid = d.id;
        matchedName = String(data.displayName || '');
        matchedPhone = String(data.phone || matchedPhone || '');
        matchedEmail = String(data.email || normalizedEmail);
      }
    } catch (e) {
      console.warn('Users lookup by email failed:', e);
    }

    // 2) Fallback: scan users collection for case-insensitive email match (small user base)
    if (!matchedUid) {
      try {
        const allUsersSnap = await getDocs(collection(db, 'users'));
        const found = allUsersSnap.docs.find(
          (d) => String(d.data()?.email || '').trim().toLowerCase() === normalizedEmail
        );
        if (found) {
          const data = found.data();
          matchedUid = found.id;
          matchedName = String(data.displayName || '');
          matchedPhone = String(data.phone || matchedPhone || '');
          matchedEmail = String(data.email || normalizedEmail);
        }
      } catch (e) {
        console.warn('Users collection scan failed:', e);
      }
    }

    // 3) If synthetic email yielded a phone, inspect phone_auth/{phone}
    if (!matchedUid && matchedPhone) {
      try {
        const phoneAuthSnap = await getDoc(doc(db, 'phone_auth', matchedPhone));
        if (phoneAuthSnap.exists()) {
          matchedUid = String(phoneAuthSnap.data()?.userId || '');
        }
      } catch (e) {
        console.warn('phone_auth lookup via synthetic email failed:', e);
      }
    }

    // 4) Optional Cloud Function fallback if deployed (reads Firebase Auth directly)
    if (!matchedUid) {
      try {
        const listFn = httpsCallable<undefined, { users: Array<any> }>(functions, 'listAppUsers');
        const res = await listFn();
        const foundAuthUser = (res.data?.users || []).find(
          (u) => String(u.email || '').trim().toLowerCase() === normalizedEmail
        );
        if (foundAuthUser?.uid) {
          matchedUid = String(foundAuthUser.uid);
          matchedName = String(foundAuthUser.displayName || '');
          matchedPhone = String(foundAuthUser.phone || matchedPhone || '');
          matchedEmail = String(foundAuthUser.email || normalizedEmail);
        }
      } catch {
        // Cloud Functions optional in current environment
      }
    }
  } else {
    const cleanPhone = sanitizePhone(raw);
    if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
      throw new Error('يرجى إدخال رقم هاتف صحيح أو بريد إلكتروني مسجل.');
    }
    if (cleanPhone === OWNER_PHONE) {
      throw new Error('هذا الرقم مرتبط بحساب المالك الأساسي ويملك كافة الصلاحيات بالفعل.');
    }
    matchedPhone = cleanPhone;

    // 1) Check phone_auth/{cleanPhone}
    try {
      const phoneAuthSnap = await getDoc(doc(db, 'phone_auth', cleanPhone));
      if (phoneAuthSnap.exists()) {
        matchedUid = String(phoneAuthSnap.data()?.userId || '');
      }
    } catch (e) {
      console.warn('phone_auth lookup failed:', e);
    }

    // 2) Check users by phone
    if (!matchedUid) {
      try {
        const byPhoneSnap = await getDocs(
          query(collection(db, 'users'), where('phone', '==', cleanPhone), limit(5))
        );
        if (!byPhoneSnap.empty) {
          const d = byPhoneSnap.docs[0];
          const data = d.data();
          matchedUid = d.id;
          matchedName = String(data.displayName || '');
          matchedEmail = String(data.email || '');
        }
      } catch (e) {
        console.warn('users phone lookup failed:', e);
      }
    }

    // 3) Check users by scanning normalized phones if formatting differed
    if (!matchedUid) {
      try {
        const allUsersSnap = await getDocs(collection(db, 'users'));
        const found = allUsersSnap.docs.find((d) => {
          const p = sanitizePhone(String(d.data()?.phone || ''));
          return p === cleanPhone;
        });
        if (found) {
          const data = found.data();
          matchedUid = found.id;
          matchedName = String(data.displayName || '');
          matchedEmail = String(data.email || '');
        }
      } catch (e) {
        console.warn('users scan by phone failed:', e);
      }
    }

    // 4) Optional Cloud Function fallback if deployed
    if (!matchedUid) {
      try {
        const listFn = httpsCallable<undefined, { users: Array<any> }>(functions, 'listAppUsers');
        const res = await listFn();
        const foundAuthUser = (res.data?.users || []).find(
          (u) => sanitizePhone(String(u.phone || '')) === cleanPhone
        );
        if (foundAuthUser?.uid) {
          matchedUid = String(foundAuthUser.uid);
          matchedName = String(foundAuthUser.displayName || '');
          matchedEmail = String(foundAuthUser.email || '');
        }
      } catch {
        // Cloud Functions optional
      }
    }
  }

  if (!matchedUid) {
    throw new Error(
      'لم يتم العثور على حساب مسجل بهذا الرقم أو البريد في التطبيق. يجب أن يسجل المستخدم الدخول بحسابه أولاً ثم إضافته مشرفاً دون إنشاء حساب جديد.'
    );
  }

  // Enrich details from users/{matchedUid} if available
  try {
    const userDocSnap = await getDoc(doc(db, 'users', matchedUid));
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      matchedName = matchedName || String(data.displayName || '');
      matchedPhone = matchedPhone || String(data.phone || '');
      matchedEmail = matchedEmail || String(data.email || '');
    }
  } catch (e) {
    console.warn('Could not hydrate resolved user profile:', e);
  }

  if (isOwnerEmail(matchedEmail) || sanitizePhone(matchedPhone) === OWNER_PHONE) {
    throw new Error('هذا الحساب يعود للمالك الأساسي ولا يمكن تعيينه كمشرف.');
  }

  // Check if supervisor record already exists
  let existingSupervisor = false;
  try {
    const supSnap = await getDoc(doc(db, SUPERVISORS_COLLECTION, matchedUid));
    existingSupervisor = supSnap.exists();
  } catch {
    existingSupervisor = false;
  }

  return {
    uid: matchedUid,
    displayName: (matchedName || `مستخدم ${matchedPhone || matchedUid.slice(0, 6)}`).trim(),
    phone: sanitizePhone(matchedPhone) || '',
    email: matchedEmail.trim().toLowerCase(),
    existingSupervisor,
  };
}

/**
 * Subscribe to the signed-in user's own supervisor assignment document in real time.
 */
export function subscribeToMySupervisorProfile(
  uid: string,
  callback: (record: SupervisorRecord | null) => void,
  onError?: (error: unknown) => void
) {
  const ref = doc(db, SUPERVISORS_COLLECTION, uid);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        callback(null);
        return;
      }
      const data = snap.data();
      callback({
        uid: snap.id,
        displayName: String(data.displayName || 'مشرف'),
        phone: String(data.phone || ''),
        email: String(data.email || ''),
        level: data.level as SupervisorLevel,
        permissions: sanitizeSupervisorPermissions(data.permissions || {}),
        isActive: Boolean(data.isActive),
        assignedBy: String(data.assignedBy || ''),
        assignedByName: String(data.assignedByName || ''),
        notes: String(data.notes || ''),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    },
    (error) => {
      if (onError) onError(error);
    }
  );
}

/**
 * Owner-only: Subscribe to all supervisor assignments.
 */
export function subscribeToAllSupervisors(
  callback: (records: SupervisorRecord[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(collection(db, SUPERVISORS_COLLECTION), orderBy('updatedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const items: SupervisorRecord[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          uid: d.id,
          displayName: String(data.displayName || 'مشرف'),
          phone: String(data.phone || ''),
          email: String(data.email || ''),
          level: data.level as SupervisorLevel,
          permissions: sanitizeSupervisorPermissions(data.permissions || {}),
          isActive: Boolean(data.isActive),
          assignedBy: String(data.assignedBy || ''),
          assignedByName: String(data.assignedByName || ''),
          notes: String(data.notes || ''),
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });
      callback(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, SUPERVISORS_COLLECTION);
    }
  );
}

/**
 * Owner-only: Subscribe to administrative audit log entries.
 */
export function subscribeToAdminAuditLogs(
  callback: (logs: AdminAuditLog[]) => void,
  onError?: (error: unknown) => void
) {
  const q = query(
    collection(db, AUDIT_LOGS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(120)
  );
  return onSnapshot(
    q,
    (snap) => {
      const items: AdminAuditLog[] = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          actorUid: String(data.actorUid || ''),
          actorName: String(data.actorName || 'مسؤول'),
          actorLevel: (data.actorLevel || 'legacy_admin') as AdminRoleLevel,
          actionType: String(data.actionType || ''),
          targetId: data.targetId ? String(data.targetId) : undefined,
          targetLabel: data.targetLabel ? String(data.targetLabel) : undefined,
          details: data.details ? String(data.details) : undefined,
          createdAt: data.createdAt,
        };
      });
      callback(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, AUDIT_LOGS_COLLECTION);
    }
  );
}

/**
 * Append an immutable administrative audit log entry.
 */
export async function logAdminAction(params: {
  actorUid: string;
  actorName: string;
  actorLevel: AdminRoleLevel;
  actionType: string;
  targetId?: string;
  targetLabel?: string;
  details?: string;
}): Promise<void> {
  if (!params.actorUid) return;
  const logId = createSafeDocId('log');
  try {
    await setDoc(doc(db, AUDIT_LOGS_COLLECTION, logId), {
      actorUid: params.actorUid,
      actorName: (params.actorName || 'مسؤول').trim().slice(0, 100),
      actorLevel: params.actorLevel,
      actionType: params.actionType.trim().slice(0, 80),
      ...(params.targetId ? { targetId: params.targetId.slice(0, 128) } : {}),
      ...(params.targetLabel ? { targetLabel: params.targetLabel.trim().slice(0, 160) } : {}),
      ...(params.details ? { details: params.details.trim().slice(0, 600) } : {}),
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    // Audit write should not crash an already completed admin UI flow if offline
    console.warn('Could not write admin audit log:', err);
  }
}

/**
 * Owner-only: Assign a new supervisor linked to an existing user UID,
 * or update an existing supervisor's level and permissions.
 */
export async function saveSupervisorAssignment(params: {
  target: ResolvedSupervisorCandidate;
  level: SupervisorLevel;
  permissions: SupervisorPermissions;
  isActive: boolean;
  notes?: string;
  actorUid: string;
  actorName: string;
}): Promise<void> {
  const { target, level, isActive, notes, actorUid, actorName } = params;
  if (!target.uid || target.uid === actorUid) {
    throw new Error('لا يمكن تعديل حساب المالك كمشرف.');
  }

  const sanitizedPerms = sanitizeSupervisorPermissions(params.permissions);
  const supRef = doc(db, SUPERVISORS_COLLECTION, target.uid);
  const existingSnap = await getDoc(supRef);
  const isUpdate = existingSnap.exists();

  const payload: Record<string, any> = {
    uid: target.uid,
    displayName: target.displayName.slice(0, 100),
    ...(target.phone ? { phone: target.phone.slice(0, 20) } : {}),
    ...(target.email ? { email: target.email.slice(0, 160) } : {}),
    level,
    permissions: sanitizedPerms,
    isActive: Boolean(isActive),
    assignedBy: actorUid,
    assignedByName: (actorName || 'المالك').trim().slice(0, 100),
    ...(notes?.trim() ? { notes: notes.trim().slice(0, 300) } : {}),
    createdAt: isUpdate ? existingSnap.data()?.createdAt || serverTimestamp() : serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    if (isUpdate) {
      await updateDoc(supRef, {
        displayName: target.displayName.slice(0, 100),
        phone: (target.phone || '').slice(0, 20),
        email: (target.email || '').slice(0, 160),
        level,
        permissions: sanitizedPerms,
        isActive: Boolean(isActive),
        assignedBy: actorUid,
        assignedByName: (actorName || 'المالك').trim().slice(0, 100),
        notes: (notes || '').trim().slice(0, 300),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(supRef, payload);
    }

    // Sync users/{uid}.role conservatively if profile document exists
    try {
      const userSnap = await getDoc(doc(db, 'users', target.uid));
      if (userSnap.exists()) {
        await updateDoc(doc(db, 'users', target.uid), {
          role: isActive ? 'admin' : 'user',
          updatedAt: serverTimestamp(),
        });
      }
    } catch (syncErr) {
      console.warn('Optional user role sync warning:', syncErr);
    }

    await logAdminAction({
      actorUid,
      actorName,
      actorLevel: 'owner',
      actionType: isUpdate ? 'تعديل صلاحيات مشرف' : 'إضافة مشرف',
      targetId: target.uid,
      targetLabel: target.displayName,
      details: `المستوى: ${SUPERVISOR_LEVEL_META[level].label} | الحالة: ${isActive ? 'مفعّل' : 'معطّل'}`,
    });
  } catch (error) {
    handleFirestoreError(
      error,
      isUpdate ? OperationType.UPDATE : OperationType.CREATE,
      `${SUPERVISORS_COLLECTION}/${target.uid}`
    );
  }
}

/**
 * Owner-only: Toggle supervisor enabled/disabled state.
 */
export async function toggleSupervisorActive(params: {
  supervisor: SupervisorRecord;
  nextActive: boolean;
  actorUid: string;
  actorName: string;
}): Promise<void> {
  const { supervisor, nextActive, actorUid, actorName } = params;
  const supRef = doc(db, SUPERVISORS_COLLECTION, supervisor.uid);
  try {
    await updateDoc(supRef, {
      isActive: Boolean(nextActive),
      assignedBy: actorUid,
      assignedByName: (actorName || 'المالك').trim().slice(0, 100),
      updatedAt: serverTimestamp(),
    });

    try {
      const userSnap = await getDoc(doc(db, 'users', supervisor.uid));
      if (userSnap.exists()) {
        await updateDoc(doc(db, 'users', supervisor.uid), {
          role: nextActive ? 'admin' : 'user',
          updatedAt: serverTimestamp(),
        });
      }
    } catch {
      // ignore if user profile was deleted
    }

    await logAdminAction({
      actorUid,
      actorName,
      actorLevel: 'owner',
      actionType: nextActive ? 'تفعيل حساب مشرف' : 'تعطيل حساب مشرف',
      targetId: supervisor.uid,
      targetLabel: supervisor.displayName,
      details: `تم ${nextActive ? 'تفعيل' : 'تعطيل'} صلاحيات الإشراف (${SUPERVISOR_LEVEL_META[supervisor.level].label})`,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${SUPERVISORS_COLLECTION}/${supervisor.uid}`);
  }
}

/**
 * Owner-only: Revoke all supervisor privileges and delete supervisor assignment.
 */
export async function revokeAndDeleteSupervisor(params: {
  supervisor: SupervisorRecord;
  actorUid: string;
  actorName: string;
}): Promise<void> {
  const { supervisor, actorUid, actorName } = params;
  const supRef = doc(db, SUPERVISORS_COLLECTION, supervisor.uid);
  try {
    await deleteDoc(supRef);

    // Ensure users/{uid}.role is reset to 'user' so no legacy fallback remains
    try {
      const userSnap = await getDoc(doc(db, 'users', supervisor.uid));
      if (userSnap.exists() && userSnap.data()?.role !== 'user') {
        await updateDoc(doc(db, 'users', supervisor.uid), {
          role: 'user',
          updatedAt: serverTimestamp(),
        });
      }
    } catch (syncErr) {
      console.warn('Could not reset user role after supervisor removal:', syncErr);
    }

    await logAdminAction({
      actorUid,
      actorName,
      actorLevel: 'owner',
      actionType: 'إلغاء وحذف إشراف',
      targetId: supervisor.uid,
      targetLabel: supervisor.displayName,
      details: `تم سحب صلاحيات (${SUPERVISOR_LEVEL_META[supervisor.level].label}) وإعادة الحساب كمستخدم عادي`,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${SUPERVISORS_COLLECTION}/${supervisor.uid}`);
  }
}
