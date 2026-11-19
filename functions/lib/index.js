"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppUser = exports.listAppUsers = exports.completeAccountRecovery = exports.revokeAccountRecovery = exports.approveAccountRecovery = exports.listAccountRecoveryRequests = exports.requestAccountRecovery = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const https_1 = require("firebase-functions/v2/https");
const node_crypto_1 = require("node:crypto");
const PROJECT_ID = 'a-drop-of-blood-saves-a-life';
const FIRESTORE_DATABASE_ID = 'ai-studio-remixremixremix-797cdaa7-fcd3-4ecd-a13f-0cffe9a43f72';
const REGION = 'us-central1';
const MASTER_EMAILS = new Set([
    'ziadalsyyadi@gmail.com',
    'user_967773633918_v1@qataba-blood.app',
]);
const app = (0, app_1.initializeApp)({ projectId: PROJECT_ID });
const auth = (0, auth_1.getAuth)(app);
const db = (0, firestore_1.getFirestore)(app, FIRESTORE_DATABASE_ID);
function normalizePhone(value) {
    let digits = String(value ?? '').replace(/\D/g, '');
    if (digits.startsWith('00967'))
        digits = digits.slice(5);
    else if (digits.startsWith('967'))
        digits = digits.slice(3);
    if (digits.startsWith('0'))
        digits = digits.slice(1);
    return digits.slice(-9);
}
async function requireAdmin(request, requiredPerm = 'manageUsersRecovery') {
    const uid = request.auth?.uid;
    if (!uid)
        throw new https_1.HttpsError('unauthenticated', 'يجب تسجيل الدخول بحساب المسؤول.');
    const email = String(request.auth?.token.email || '').toLowerCase();
    const isVerifiedGmailOwner = email === 'ziadalsyyadi@gmail.com' && request.auth?.token.email_verified === true;
    if (isVerifiedGmailOwner || email === 'user_967773633918_v1@qataba-blood.app')
        return uid;
    const supSnap = await db.collection('supervisors').doc(uid).get();
    if (supSnap.exists) {
        const supData = supSnap.data();
        const hasPerm = Boolean(supData?.isActive && supData?.permissions?.[requiredPerm] === true);
        if (!hasPerm) {
            throw new https_1.HttpsError('permission-denied', 'ليست لديك صلاحية لإدارة المستخدمين أو الاستعادة.');
        }
        return uid;
    }
    const profile = await db.collection('users').doc(uid).get();
    if (!profile.exists || profile.data()?.role !== 'admin') {
        throw new https_1.HttpsError('permission-denied', 'هذه العملية متاحة للمسؤول فقط.');
    }
    return uid;
}
function requireString(value, label, max = 160) {
    if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
        throw new https_1.HttpsError('invalid-argument', `قيمة غير صالحة: ${label}`);
    }
    return value.trim();
}
function hashCode(code, salt) {
    return (0, node_crypto_1.createHash)('sha256').update(`${salt}:${code}`).digest();
}
function safeHashEqual(storedHex, candidate) {
    try {
        const stored = Buffer.from(storedHex, 'hex');
        return stored.length === candidate.length && (0, node_crypto_1.timingSafeEqual)(stored, candidate);
    }
    catch {
        return false;
    }
}
/**
 * The request is persisted server-side even when every administrator is offline.
 * The UID is a lookup key, not proof of ownership; an administrator must verify
 * the claimant against the account's saved phone before issuing a code.
 */
exports.requestAccountRecovery = (0, https_1.onCall)({ region: REGION }, async (request) => {
    const uid = requireString(request.data?.uid, 'UID', 128);
    const phone = normalizePhone(request.data?.phone);
    if (!/^[A-Za-z0-9_-]{10,128}$/.test(uid) || phone.length !== 9) {
        throw new https_1.HttpsError('invalid-argument', 'يرجى مراجعة معرف الحساب ورقم الهاتف.');
    }
    const profileSnap = await db.collection('users').doc(uid).get();
    let savedPhone = normalizePhone(profileSnap.data()?.phone);
    // Legacy accounts may have their phone only in the existing phone_auth mapping.
    if (!savedPhone) {
        const legacyMapping = await db.collection('phone_auth').where('userId', '==', uid).limit(1).get();
        savedPhone = normalizePhone(legacyMapping.docs[0]?.data()?.phone);
    }
    // Do not disclose whether a UID exists or whether its phone matches.
    let accountName = profileSnap.data()?.displayName || 'مستخدم';
    try {
        const authUser = await auth.getUser(uid);
        accountName = accountName === 'مستخدم' ? (authUser.displayName || accountName) : accountName;
    }
    catch {
        throw new https_1.HttpsError('failed-precondition', 'تعذر مطابقة البيانات. راجع معرف الحساب ورقم الهاتف مع المسؤول.');
    }
    if (!savedPhone || savedPhone !== phone) {
        throw new https_1.HttpsError('failed-precondition', 'تعذر مطابقة البيانات. راجع معرف الحساب ورقم الهاتف مع المسؤول.');
    }
    const existing = await db.collection('account_recovery_requests')
        .where('uid', '==', uid).get();
    const reusable = existing.docs
        .filter((item) => {
        const state = item.data();
        if (state.status === 'pending')
            return true;
        return state.status === 'approved' &&
            typeof state.codeHash === 'string' &&
            typeof state.codeSalt === 'string';
    })
        .sort((a, b) => (b.data().createdAt?.toMillis?.() || 0) - (a.data().createdAt?.toMillis?.() || 0))[0];
    if (reusable) {
        const approved = reusable.data().status === 'approved';
        return {
            success: true,
            requestId: reusable.id,
            message: approved ? 'طلبك معتمد. أدخل الرمز الذي أرسله لك المسؤول.' : 'طلبك السابق محفوظ وينتظر مراجعة المسؤول.'
        };
    }
    const latestCreatedAt = existing.docs.reduce((latest, item) => Math.max(latest, item.data().createdAt?.toMillis?.() || 0), 0);
    if (latestCreatedAt && Date.now() - latestCreatedAt < 60 * 1000) {
        throw new https_1.HttpsError('resource-exhausted', 'انتظر دقيقة قبل إرسال طلب استعادة جديد.');
    }
    const created = await db.collection('account_recovery_requests').add({
        uid,
        phoneLast4: phone.slice(-4),
        displayName: accountName,
        status: 'pending',
        attempts: 0,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    });
    return { success: true, requestId: created.id, message: 'تم حفظ طلبك وسيظهر للمسؤول عند اتصاله.' };
});
exports.listAccountRecoveryRequests = (0, https_1.onCall)({ region: REGION }, async (request) => {
    await requireAdmin(request);
    const snap = await db.collection('account_recovery_requests').get();
    const items = snap.docs
        .map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            uid: data.uid,
            phoneLast4: data.phoneLast4 || '',
            displayName: data.displayName || 'مستخدم',
            status: data.status,
            createdAtMillis: data.createdAt?.toMillis?.() || null,
            expiresAtMillis: data.expiresAt?.toMillis?.() || null,
        };
    })
        .filter((item) => ['pending', 'approved', 'locked'].includes(String(item.status)))
        .sort((a, b) => (b.createdAtMillis || 0) - (a.createdAtMillis || 0))
        .slice(0, 100);
    return { requests: items };
});
/** Generates a one-time six-digit code; plaintext is returned only to the admin. */
exports.approveAccountRecovery = (0, https_1.onCall)({ region: REGION }, async (request) => {
    await requireAdmin(request);
    const requestId = requireString(request.data?.requestId, 'requestId', 128);
    const ref = db.collection('account_recovery_requests').doc(requestId);
    const snap = await ref.get();
    if (!snap.exists || snap.data()?.status !== 'pending') {
        throw new https_1.HttpsError('failed-precondition', 'الطلب غير موجود أو صدر له رمز بالفعل.');
    }
    const uid = String(snap.data()?.uid || '');
    try {
        await auth.getUser(uid);
    }
    catch {
        throw new https_1.HttpsError('not-found', 'حساب Firebase Auth المرتبط بهذا الطلب غير موجود.');
    }
    const code = String((0, node_crypto_1.randomInt)(100000, 1000000));
    const salt = (0, node_crypto_1.randomBytes)(16).toString('hex');
    await db.runTransaction(async (tx) => {
        const latest = await tx.get(ref);
        const latestData = latest.data();
        if (!latest.exists || latestData?.status !== 'pending' || latestData?.uid !== uid) {
            throw new https_1.HttpsError('failed-precondition', 'صدر رمز لهذا الطلب بالفعل أو لم يعد الطلب معلقاً.');
        }
        tx.update(ref, {
            status: 'approved',
            codeSalt: salt,
            codeHash: hashCode(code, salt).toString('hex'),
            expiresAt: firestore_1.FieldValue.delete(),
            attempts: 0,
            approvedAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
    });
    return { success: true, code, expiresAt: null };
});
/** Allows an administrator to invalidate an unused or locked recovery code. */
exports.revokeAccountRecovery = (0, https_1.onCall)({ region: REGION }, async (request) => {
    await requireAdmin(request);
    const requestId = requireString(request.data?.requestId, 'requestId', 128);
    const ref = db.collection('account_recovery_requests').doc(requestId);
    await db.runTransaction(async (tx) => {
        const latest = await tx.get(ref);
        const data = latest.data();
        if (!latest.exists || !['approved', 'locked'].includes(String(data?.status))) {
            throw new https_1.HttpsError('failed-precondition', 'لا يمكن إلغاء هذا الطلب؛ قد يكون استُخدم أو أُلغي بالفعل.');
        }
        tx.update(ref, {
            status: 'revoked',
            codeHash: firestore_1.FieldValue.delete(),
            codeSalt: firestore_1.FieldValue.delete(),
            revokedAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
    });
    return { success: true };
});
/** Validates the one-time code and updates the EXISTING Firebase Auth UID. */
exports.completeAccountRecovery = (0, https_1.onCall)({ region: REGION }, async (request) => {
    const uid = requireString(request.data?.uid, 'UID', 128);
    const requestId = requireString(request.data?.requestId, 'requestId', 128);
    const code = requireString(request.data?.code, 'رمز التحقق', 6);
    const newPassword = requireString(request.data?.newPassword, 'كلمة المرور', 128);
    if (!/^\d{6}$/.test(code) || newPassword.length < 6) {
        throw new https_1.HttpsError('invalid-argument', 'رمز التحقق أو كلمة المرور غير صالح.');
    }
    const ref = db.collection('account_recovery_requests').doc(requestId);
    const snap = await ref.get();
    const data = snap.data();
    if (!snap.exists || data?.uid !== uid || data?.status !== 'approved') {
        throw new https_1.HttpsError('failed-precondition', 'لا يوجد رمز معتمد لهذا الحساب. اطلب رمزاً جديداً من المسؤول.');
    }
    const candidate = hashCode(code, String(data.codeSalt || ''));
    if (!safeHashEqual(String(data.codeHash || ''), candidate)) {
        const attemptResult = await db.runTransaction(async (tx) => {
            const latest = await tx.get(ref);
            const latestData = latest.data();
            if (!latest.exists || latestData?.status !== 'approved' ||
                latestData?.uid !== uid ||
                latestData?.codeHash !== data.codeHash ||
                latestData?.codeSalt !== data.codeSalt) {
                throw new https_1.HttpsError('failed-precondition', 'رمز الاستعادة لم يعد صالحاً أو سبق استخدامه.');
            }
            const attempts = Number(latestData.attempts || 0) + 1;
            if (attempts >= 5) {
                tx.update(ref, {
                    status: 'locked',
                    codeHash: firestore_1.FieldValue.delete(),
                    codeSalt: firestore_1.FieldValue.delete(),
                    attempts,
                    updatedAt: firestore_1.FieldValue.serverTimestamp(),
                });
                return { locked: true };
            }
            tx.update(ref, {
                attempts,
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
            });
            return { locked: false };
        });
        if (attemptResult.locked) {
            throw new https_1.HttpsError('resource-exhausted', 'تم تجاوز محاولات الرمز. اطلب رمزاً جديداً من المسؤول.');
        }
        throw new https_1.HttpsError('permission-denied', 'رمز التحقق غير صحيح.');
    }
    // Atomically consume the code before changing the password to prevent reuse.
    await db.runTransaction(async (tx) => {
        const latest = await tx.get(ref);
        const latestData = latest.data();
        if (!latest.exists || latestData?.status !== 'approved' ||
            latestData?.uid !== uid ||
            latestData?.codeHash !== data.codeHash ||
            latestData?.codeSalt !== data.codeSalt) {
            throw new https_1.HttpsError('failed-precondition', 'رمز الاستعادة لم يعد صالحاً أو سبق استخدامه.');
        }
        tx.update(ref, {
            status: 'processing',
            codeHash: firestore_1.FieldValue.delete(),
            codeSalt: firestore_1.FieldValue.delete(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
    });
    try {
        await auth.updateUser(uid, { password: newPassword });
        await ref.update({ status: 'used', usedAt: firestore_1.FieldValue.serverTimestamp(), updatedAt: firestore_1.FieldValue.serverTimestamp() });
        return { success: true, message: 'تم تحديث كلمة المرور للحساب الأصلي بنجاح.' };
    }
    catch (error) {
        await ref.update({ status: 'failed', updatedAt: firestore_1.FieldValue.serverTimestamp() }).catch(() => undefined);
        console.error('Account recovery password update failed:', error);
        throw new https_1.HttpsError('internal', 'تعذر تحديث كلمة المرور. تواصل مع المسؤول لإصدار طلب جديد.');
    }
});
exports.listAppUsers = (0, https_1.onCall)({ region: REGION }, async (request) => {
    await requireAdmin(request);
    const result = [];
    let pageToken;
    do {
        const page = await auth.listUsers(1000, pageToken);
        const profiles = await Promise.all(page.users.map((user) => db.collection('users').doc(user.uid).get()));
        page.users.forEach((user, index) => {
            const profile = profiles[index].data() || {};
            result.push({
                uid: user.uid,
                displayName: profile.displayName || user.displayName || 'مستخدم',
                phone: profile.phone || '',
                email: user.email || '',
                role: profile.role || 'user',
                disabled: user.disabled,
                createdAt: user.metadata.creationTime || null,
            });
        });
        pageToken = page.pageToken;
    } while (pageToken && result.length < 5000);
    return { users: result };
});
exports.deleteAppUser = (0, https_1.onCall)({ region: REGION }, async (request) => {
    const adminUid = await requireAdmin(request);
    const targetUid = requireString(request.data?.uid, 'UID', 128);
    if (targetUid === adminUid)
        throw new https_1.HttpsError('failed-precondition', 'لا يمكن حذف حساب المسؤول الحالي.');
    let target = null;
    try {
        target = await auth.getUser(targetUid);
    }
    catch (error) {
        if (error?.code !== 'auth/user-not-found')
            throw error;
    }
    if (target && MASTER_EMAILS.has(String(target.email || '').toLowerCase())) {
        throw new https_1.HttpsError('permission-denied', 'لا يمكن حذف حساب المسؤول الأساسي.');
    }
    const [targetProfile, targetSupervisor] = await Promise.all([
        db.collection('users').doc(targetUid).get(),
        db.collection('supervisors').doc(targetUid).get(),
    ]);
    if (targetProfile.data()?.role === 'admin' || targetSupervisor.exists) {
        throw new https_1.HttpsError('permission-denied', 'لا يمكن حذف حساب مسؤول أو مشرف من هذه الواجهة.');
    }
    // Clean up related records first. If Auth deletion fails, retrying remains safe.
    const [donors, mappings, urgentRequests, messages] = await Promise.all([
        db.collection('donors').where('userId', '==', targetUid).get(),
        db.collection('phone_auth').where('userId', '==', targetUid).get(),
        db.collection('urgent_requests').where('userId', '==', targetUid).get(),
        db.collection('conversations').doc(targetUid).collection('messages').get(),
    ]);
    const refs = [
        ...donors.docs.map((doc) => doc.ref),
        ...mappings.docs.map((doc) => doc.ref),
        ...urgentRequests.docs.map((doc) => doc.ref),
        ...messages.docs.map((doc) => doc.ref),
        db.collection('conversations').doc(targetUid),
        db.collection('donors').doc(`donor_${targetUid}`),
        db.collection('users').doc(targetUid),
    ];
    for (let offset = 0; offset < refs.length; offset += 400) {
        const batch = db.batch();
        refs.slice(offset, offset + 400).forEach((ref) => batch.delete(ref));
        await batch.commit();
    }
    if (target)
        await auth.deleteUser(targetUid);
    return { success: true, uid: targetUid };
});
//# sourceMappingURL=index.js.map