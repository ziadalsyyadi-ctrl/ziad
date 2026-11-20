import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  signOut, 
  updateProfile,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  deleteDoc,
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  runTransaction 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import {
  AdminRoleLevel,
  SupervisorPermissions,
  SupervisorRecord,
  UserProfile,
} from '../types';
import { sanitizePhone } from '../services/phoneVerificationService';
import {
  EMPTY_PERMISSIONS,
  OWNER_PERMISSIONS,
  SUPERVISOR_LEVEL_META,
  isOwnerEmail,
  sanitizeSupervisorPermissions,
  subscribeToMySupervisorProfile,
} from '../services/supervisorService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  supervisorProfile: SupervisorRecord | null;
  isOwner: boolean;
  isAuthorizedAdmin: boolean;
  adminLevel: AdminRoleLevel | null;
  adminPermissions: SupervisorPermissions;
  isGuest: boolean;
  isLoading: boolean;
  loginWithPhone: (phone: string, pass: string) => Promise<void>;
  loginWithEmailPassword: (email: string, pass: string) => Promise<void>;
  registerWithPhone: (phone: string, pass: string, fullName: string) => Promise<void>;
  resetPasswordDirect: (phone: string, newPass: string) => Promise<void>;
  loginWithGoogle: () => Promise<User>;
  continueAsGuest: () => void;
  logout: () => Promise<void>;
  deleteAccount: (password?: string) => Promise<void>;
  updateUserName: (newName: string) => Promise<void>;
  updateUserProfileAndAccount: (fullName: string, phone: string, newPassword?: string) => Promise<void>;
  activeRole: 'user' | 'admin';
  switchActiveRole: (role: 'user' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to format email for phone-based Firebase Auth accounts
export function getPhoneAuthEmail(cleanPhone: string, version: number = 1): string {
  return `user_967${cleanPhone}_v${version}@qataba-blood.app`;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [supervisorProfile, setSupervisorProfile] = useState<SupervisorRecord | null>(null);
  const [supervisorLoaded, setSupervisorLoaded] = useState<boolean>(false);
  // Do not show the guest UI until Firebase has restored its persisted session.
  // A stale guest flag must never win the race against onAuthStateChanged.
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Never restore admin privileges from browser storage.
  const [activeRole, setActiveRole] = useState<'user' | 'admin'>('user');

  const isOwner = useMemo(() => {
    if (!currentUser?.email || !isOwnerEmail(currentUser.email)) return false;
    if (currentUser.email.toLowerCase() === 'user_967773633918_v1@qataba-blood.app') return true;
    return currentUser.emailVerified === true;
  }, [currentUser]);

  const { isAuthorizedAdmin, adminLevel, adminPermissions } = useMemo(() => {
    if (isOwner) {
      return {
        isAuthorizedAdmin: true,
        adminLevel: 'owner' as AdminRoleLevel,
        adminPermissions: OWNER_PERMISSIONS,
      };
    }

    if (supervisorProfile) {
      if (supervisorProfile.isActive) {
        return {
          isAuthorizedAdmin: true,
          adminLevel: supervisorProfile.level as AdminRoleLevel,
          adminPermissions: sanitizeSupervisorPermissions(supervisorProfile.permissions),
        };
      }
      // Explicitly disabled supervisor loses all administrative capabilities immediately
      return {
        isAuthorizedAdmin: false,
        adminLevel: null,
        adminPermissions: EMPTY_PERMISSIONS,
      };
    }

    if (supervisorLoaded && userProfile?.role === 'admin') {
      return {
        isAuthorizedAdmin: true,
        adminLevel: 'legacy_admin' as AdminRoleLevel,
        adminPermissions: { ...SUPERVISOR_LEVEL_META.general_admin.defaultPermissions },
      };
    }

    return {
      isAuthorizedAdmin: false,
      adminLevel: null,
      adminPermissions: EMPTY_PERMISSIONS,
    };
  }, [isOwner, supervisorProfile, supervisorLoaded, userProfile]);

  // Subscribe in real time to the authenticated user's supervisor assignment
  useEffect(() => {
    if (!currentUser?.uid) {
      setSupervisorProfile(null);
      setSupervisorLoaded(false);
      return;
    }

    setSupervisorLoaded(false);
    const unsub = subscribeToMySupervisorProfile(
      currentUser.uid,
      (record) => {
        setSupervisorProfile(record);
        setSupervisorLoaded(true);
      },
      (err) => {
        console.warn('Supervisor assignment listener warning:', err);
        setSupervisorProfile(null);
        setSupervisorLoaded(true);
      }
    );

    return () => unsub();
  }, [currentUser?.uid]);

  // Real-time security guard: exit admin mode immediately if supervisor is disabled or removed
  useEffect(() => {
    if (!isAuthorizedAdmin && activeRole === 'admin') {
      setActiveRole('user');
      localStorage.setItem('blood_app_active_role', 'user');
    }
  }, [isAuthorizedAdmin, activeRole]);

  // The selected UI mode is never an authorization source. Only a trusted
  // supervisor assignment or the designated owner account may enter admin mode.
  const switchActiveRole = (role: 'user' | 'admin') => {
    const nextRole = role === 'admin' && isAuthorizedAdmin ? 'admin' : 'user';
    setActiveRole(nextRole);
    localStorage.setItem('blood_app_active_role', nextRole);
  };

  // Sync user profile from Firestore. Callers use a bounded wait so a slow
  // Firestore request cannot keep the Android startup/login screen spinning.
  const fetchUserProfile = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const snap = await getDoc(userDocRef);
      const isAdminEmail = isOwnerEmail(user.email) && (
        user.email?.toLowerCase() === 'user_967773633918_v1@qataba-blood.app' ||
        user.emailVerified === true
      );

      if (snap.exists()) {
        const data = snap.data();
        const updates: Record<string, any> = {};

        // Force admin role in Firestore if it's the master owner email
        if (isAdminEmail && data.role !== 'admin') {
          updates.role = 'admin';
        }
        // Keep normalized Auth email synced on users/{uid} for supervisor lookup
        if (user.email && data.email !== user.email) {
          updates.email = user.email;
        }
        if (Object.keys(updates).length > 0) {
          updates.updatedAt = serverTimestamp();
          await updateDoc(userDocRef, updates).catch((e) =>
            console.warn('Could not sync user metadata updates:', e)
          );
        }

        setUserProfile({
          uid: user.uid,
          displayName: data.displayName || user.displayName || 'مستخدم',
          phone: data.phone || '',
          phoneVerified: data.phoneVerified ?? Boolean(user.phoneNumber),
          email: data.email || user.email || '',
          role: isAdminEmail ? 'admin' : (data.role || 'user'),
          createdAt: data.createdAt,
        });
      } else {
        if (typeof window !== 'undefined' && (window as any).__QATABA_RECOVERY_IN_PROGRESS__) {
          return;
        }
        // Extract phone number from email pattern
        const phoneMatch = user.email?.match(/user_967(\d+)_/);
        const legacyMatch = user.email?.match(/user_(\d+)@/);
        const extractedPhone = phoneMatch ? phoneMatch[1] : (legacyMatch ? legacyMatch[1] : '');

        const newProfile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || (extractedPhone ? `مستخدم ${extractedPhone}` : 'فاعل خير'),
          phone: extractedPhone,
          phoneVerified: Boolean(user.phoneNumber),
          email: user.email || '',
          role: isAdminEmail ? 'admin' : 'user',
        };
        await setDoc(userDocRef, {
          displayName: newProfile.displayName,
          phone: extractedPhone,
          phoneVerified: Boolean(user.phoneNumber),
          ...(user.email ? { email: user.email } : {}),
          role: isAdminEmail ? 'admin' : 'user',
          createdAt: serverTimestamp(),
        }, { merge: true });
        setUserProfile(newProfile);
      }
      
      // Respect user's selected activeRole: only set if none stored yet
      // Restore only the ordinary user view. Admin mode is granted only
      // after the authenticated profile has been verified from Firestore.
      setActiveRole('user');
      localStorage.setItem('blood_app_active_role', 'user');
    } catch (err) {
      console.warn('Could not fetch user profile:', err);
    }
  };

  const loadUserProfileSafely = async (user: User) => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        fetchUserProfile(user),
        new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => {
            console.warn('Profile loading timed out; continuing with the authenticated session.');
            resolve();
          }, 3500);
        }),
      ]);
    } finally {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    let active = true;
    let authEventVersion = 0;

    // Hard guarantee: Never keep startup loading screen beyond 5 seconds!
    const hardTimeout = setTimeout(() => {
      if (active) {
        console.warn('Max startup initialization timeout (5s) reached. Releasing UI.');
        setIsLoading(false);
      }
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const eventVersion = ++authEventVersion;
      setCurrentUser(user);
      try {
        if (user) {
          setIsGuest(false);
          localStorage.removeItem('blood_app_guest');
          // Restore the authenticated session immediately. Profile hydration is
          // intentionally non-blocking so startup never waits for Firestore.
          void loadUserProfileSafely(user).catch((error) => {
            console.warn('Background user profile hydration failed:', error);
          });
        } else {
          setUserProfile(null);
          // Firebase has now confirmed that no signed-in user exists.
          // Only at this point may an explicit previous guest choice be restored.
          setIsGuest(localStorage.getItem('blood_app_guest') === 'true');
          setActiveRole('user');
        }
      } finally {
        // Do not hold the startup screen open while the profile loads.
        if (active && eventVersion === authEventVersion) {
          clearTimeout(hardTimeout);
          setIsLoading(false);
        }
      }
    });

    const handleRecoveryComplete = () => {
      if (auth.currentUser) {
        void loadUserProfileSafely(auth.currentUser).catch((error) => {
          console.warn('Post-recovery profile hydration failed:', error);
        });
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('qataba-recovery-complete', handleRecoveryComplete);
    }

    return () => {
      active = false;
      clearTimeout(hardTimeout);
      unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('qataba-recovery-complete', handleRecoveryComplete);
      }
    };
  }, []);

  // Helper to fetch credential version for a phone number
  const getPhoneAuthVersion = async (cleanPhone: string): Promise<number> => {
    try {
      const authDoc = await getDoc(doc(db, 'phone_auth', cleanPhone));
      if (authDoc.exists()) {
        const data = authDoc.data();
        return Number(data.version) || 1;
      }
    } catch (err) {
      console.warn('Error reading phone_auth record:', err);
    }
    return 1;
  };

  /**
   * Direct Email/Password Login
   */
  const loginWithEmailPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, pass);
      setCurrentUser(credential.user);
      setIsGuest(false);
      localStorage.removeItem('blood_app_guest');
      localStorage.removeItem('has_logged_out');
      await loadUserProfileSafely(credential.user);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        throw new Error('تسجيل الدخول بكلمة المرور غير مفعّل. يرجى تفعيل مزود Email/Password في Firebase.');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Direct Login: Phone number + Password (no SMS code required)
   */
  const loginWithPhone = async (phone: string, pass: string) => {
    setIsLoading(true);
    try {
      const cleanPhone = sanitizePhone(phone);
      if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 12) {
        throw new Error('يرجى إدخال رقم الهاتف بشكل صحيح');
      }
      if (!pass) {
        throw new Error('يرجى إدخال كلمة المرور');
      }

      // phone_auth is intentionally not readable before authentication.
      // Therefore do not query its version before signing in. Try the known
      // versioned account identifiers, then the legacy identifier.
      // Prefer the last successfully used credential version on this device.
      // This avoids dozens of sequential Firebase requests on slower phones.
      const versionCacheKey = `blood_app_phone_auth_version_${cleanPhone}`;
      const cachedVersion = Number(localStorage.getItem(versionCacheKey) || 0);
      const versions = [
        ...(cachedVersion >= 1 && cachedVersion <= 50 ? [cachedVersion] : []),
        1,
        ...Array.from({ length: 15 }, (_, index) => index + 1),
      ].filter((version, index, all) => all.indexOf(version) === index);
      const candidateEmails = versions.map(version => getPhoneAuthEmail(cleanPhone, version));
      candidateEmails.push(`user_${cleanPhone}@qataba-blood.app`);

      let lastCredentialError: any = null;
      for (const email of candidateEmails) {
        try {
          const credential = await signInWithEmailAndPassword(auth, email, pass);
          const matchedVersionMatch = email.match(/_v(\d+)@qataba-blood\.app$/);
          const matchedVersion = matchedVersionMatch ? Number(matchedVersionMatch[1]) : 0;

          // Ensure a superseded password (including legacy v1) from before an admin-assisted reset cannot still sign in.
          const activeVersion = await getPhoneAuthVersion(cleanPhone);
          const isSuperseded =
            (matchedVersion > 0 && activeVersion > matchedVersion) ||
            (matchedVersion === 0 && activeVersion > 1);
          if (isSuperseded) {
            await signOut(auth);
            localStorage.setItem(versionCacheKey, String(activeVersion));
            lastCredentialError = new Error('تم استبدال كلمة المرور القديمة. استخدم كلمة المرور الجديدة.');
            continue;
          }

          setCurrentUser(credential.user);
          setIsGuest(false);
          localStorage.removeItem('blood_app_guest');
          localStorage.removeItem('has_logged_out');
          if (matchedVersion > 0) {
            localStorage.setItem(versionCacheKey, String(matchedVersion));
          }
          await loadUserProfileSafely(credential.user);
          return;
        } catch (loginErr: any) {
          if (loginErr.code === 'auth/operation-not-allowed') {
            const e = new Error('تسجيل الدخول بكلمة المرور غير مفعّل في Firebase. فعّل مزود Email/Password من إعدادات Authentication.');
            (e as any).code = loginErr.code;
            throw e;
          }
          if (loginErr.code === 'auth/too-many-requests') {
            throw new Error('تم إجراء محاولات دخول كثيرة مؤقتاً. انتظر قليلاً ثم أعد المحاولة، أو استخدم «نسيت كلمة المرور؟».');
          }
          if (
            loginErr.code === 'auth/invalid-credential' ||
            loginErr.code === 'auth/user-not-found' ||
            loginErr.code === 'auth/wrong-password'
          ) {
            lastCredentialError = loginErr;
            continue;
          }
          // Network, throttling, configuration, and other errors should not
          // be hidden by trying more account identifiers.
          throw loginErr;
        }
      }

      throw lastCredentialError || new Error('رقم الهاتف أو كلمة المرور غير صحيحة.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Direct Register: Phone number + Password only (no verification code, instant 1-step sign-up)
   */
  const registerWithPhone = async (phone: string, pass: string, fullName: string) => {
    setIsLoading(true);
    try {
      const cleanPhone = sanitizePhone(phone);
      if (cleanPhone.length < 7 || cleanPhone.length > 12) {
        throw new Error('يرجى إدخال رقم هاتف يمني صحيح (مثال: 773633918)');
      }

      if (!pass || pass.length < 6) {
        throw new Error('كلمة المرور يجب أن لا تقل عن 6 خانات');
      }

      if (!fullName || fullName.trim().length < 2) {
        throw new Error('يرجى إدخال الاسم الكامل (3 أحرف على الأقل)');
      }

      // Firebase Auth enforces uniqueness for the v1 synthetic email.
      // Reserve the phone mapping and create the profile atomically so two
      // simultaneous registrations cannot claim the same phone number.
      const email = getPhoneAuthEmail(cleanPhone, 1);
      let cred;
      try {
        cred = await createUserWithEmailAndPassword(auth, email, pass);
      } catch (authErr: any) {
        if (authErr.code === 'auth/operation-not-allowed') {
          throw new Error('خدمة تسجيل الدخول بكلمة المرور غير مفعلة في Firebase.');
        }
        if (authErr.code === 'auth/email-already-in-use') {
          throw new Error('هذا الرقم لديه حساب بالفعل. سجّل الدخول أو استخدم استعادة الحساب بعد التحقق من ملكيتك.');
        }
        if (authErr.code === 'auth/weak-password') {
          throw new Error('كلمة المرور ضعيفة. اختر كلمة مرور لا تقل عن 6 خانات.');
        }
        throw authErr;
      }

      const displayName = fullName.trim();
      try {
        await updateProfile(cred.user, { displayName });
        const mappingRef = doc(db, 'phone_auth', cleanPhone);
        const profileRef = doc(db, 'users', cred.user.uid);
        await runTransaction(db, async (transaction) => {
          const mappingSnap = await transaction.get(mappingRef);
          if (mappingSnap.exists()) {
            throw new Error('هذا الرقم مرتبط بحساب سابق. لا يمكن إنشاء حساب مكرر.');
          }
          // The auth-state listener may create this same new UID's profile
          // while registration is running. Reuse/merge that profile instead
          // of treating it as a duplicate account and deleting the Auth user.
          transaction.set(mappingRef, {
            phone: cleanPhone,
            version: 1,
            userId: cred.user.uid,
            updatedAt: serverTimestamp(),
          });
          transaction.set(profileRef, {
            displayName,
            phone: cleanPhone,
            phoneVerified: false,
            email,
            role: 'user',
            createdAt: serverTimestamp(),
          });
        });
      } catch (writeError: any) {
        // A phone already mapped to another UID is a true duplicate: remove
        // only the just-created Auth account. For network/rules failures,
        // preserve the new Auth account so the user can sign in and retry
        // profile creation instead of losing the credentials permanently.
        if (writeError?.message?.includes('مرتبط بحساب سابق')) {
          try {
            if (auth.currentUser?.uid === cred.user.uid) await deleteUser(cred.user);
          } catch (rollbackError) {
            console.error('Could not roll back duplicate Auth account:', rollbackError);
          }
          throw writeError;
        }
        console.error('Registration profile transaction failed; Auth account preserved:', writeError);
        const registrationError = new Error('تم إنشاء بيانات الدخول، لكن تعذر حفظ ملف المستخدم في Firestore. لم نحذف حساب الدخول؛ تحقق من صلاحيات Firestore ثم سجّل الدخول بالرقم وكلمة المرور لإكمال الملف.');
        (registrationError as any).code = writeError?.code;
        throw registrationError;
      }

      setCurrentUser(cred.user);
      setIsGuest(false);
      localStorage.removeItem('blood_app_guest');
      localStorage.removeItem('has_logged_out');
      localStorage.setItem(`blood_app_phone_auth_version_${cleanPhone}`, '1');
      await fetchUserProfile(cred.user);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Password Reset with Scrambled Captcha:
   * Increments credential version and registers new password securely in Firebase Auth
   */
  /**
   * Password reset is intentionally blocked until real phone ownership
   * verification is implemented. The previous flow created a new Firebase
   * Auth UID and could overwrite the existing phone mapping, causing duplicates.
   */
  const resetPasswordDirect = async (_phone: string, _newPass: string) => {
    throw new Error('لحماية حسابك وبيانات متبرعيك، أوقفنا الاستعادة التي تنشئ حساباً جديداً. استخدم تسجيل الدخول بالبريد المرتبط بالحساب أو تواصل مع المسؤول لإثبات ملكية رقم الهاتف.');
  };

  const loginWithGoogle = async (): Promise<User> => {
    setIsLoading(true);
    try {
      let signedInUser: User;

      if (Capacitor.getPlatform() === 'android') {
        // Use Android Credential Manager instead of opening an external browser.
        // Native auth is skipped so the existing Firebase JavaScript SDK session
        // continues to power Firestore and the rest of the app.
        const nativeResult = await FirebaseAuthentication.signInWithGoogle({
          // Keep Firebase JS SDK as the app's auth session owner; use Android
          // Credential Manager only to select the Google account and obtain its ID token.
          skipNativeAuth: true,
          useCredentialManager: true,
        });
        const idToken = nativeResult.credential?.idToken;
        if (!idToken) {
          throw new Error('لم يُرجع Google رمز الهوية. تحقق من إعداد OAuth وملف google-services.json.');
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        const credentialResult = await signInWithCredential(auth, googleCredential);
        signedInUser = credentialResult.user;
      } else {
        // Keep the normal browser flow for the web/PWA version.
        const provider = new GoogleAuthProvider();
        const credentialResult = await signInWithPopup(auth, provider);
        signedInUser = credentialResult.user;
      }

      setCurrentUser(signedInUser);
      setIsGuest(false);
      localStorage.removeItem('blood_app_guest');
      localStorage.removeItem('has_logged_out');
      await loadUserProfileSafely(signedInUser);
      return signedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    localStorage.setItem('blood_app_guest', 'true');
  };

  const logout = async () => {
    await signOut(auth);
    setIsGuest(false);
    localStorage.removeItem('blood_app_guest');
    localStorage.removeItem('blood_app_active_role');
    setActiveRole('user');
  };

  const deleteAccount = async (password?: string) => {
    if (!currentUser) throw new Error('يرجى تسجيل الدخول أولاً');
    setIsLoading(true);
    try {
      const uid = currentUser.uid;

      // 1. Delete user profile doc in Firestore
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch (e) {
        console.warn('Could not delete users doc:', e);
      }

      // 2. Delete donor record if exists
      try {
        await deleteDoc(doc(db, 'donors', `donor_${uid}`));
      } catch (e) {
        console.warn('Could not delete donor doc:', e);
      }

      // 3. Delete user from Firebase Auth
      try {
        await deleteUser(currentUser);
      } catch (authErr: any) {
        if (authErr.code === 'auth/requires-recent-login') {
          if (!password) {
            const e = new Error('requires-recent-login');
            (e as any).code = 'auth/requires-recent-login';
            throw e;
          }
          if (currentUser.email) {
            const credential = EmailAuthProvider.credential(currentUser.email, password);
            await reauthenticateWithCredential(currentUser, credential);
            await deleteUser(currentUser);
          } else {
            throw authErr;
          }
        } else {
          throw authErr;
        }
      }

      setCurrentUser(null);
      setUserProfile(null);
      setIsGuest(false);
      localStorage.removeItem('blood_app_guest');
      localStorage.removeItem('blood_app_active_role');
      localStorage.setItem('has_logged_out', 'true');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserName = async (newName: string) => {
    if (!currentUser) throw new Error('يرجى تسجيل الدخول أولاً');
    const trimmed = newName.trim();
    if (trimmed.length < 2) throw new Error('الاسم يجب أن يتكون من حرفين على الأقل');

    await updateProfile(currentUser, { displayName: trimmed });
    await setDoc(doc(db, 'users', currentUser.uid), {
      displayName: trimmed,
      updatedAt: serverTimestamp()
    }, { merge: true });

    setUserProfile(prev => prev ? { ...prev, displayName: trimmed } : null);
  };

  const updateUserProfileAndAccount = async (fullName: string, phone: string, newPassword?: string) => {
    if (!currentUser) throw new Error('يرجى تسجيل الدخول أولاً');
    
    const cleanName = fullName.trim();
    if (cleanName.length < 2) {
      throw new Error('الاسم الكامل يجب أن يتكون من حرفين على الأقل');
    }

    const cleanPhone = sanitizePhone(phone);

    // 1. Update Auth displayName
    await updateProfile(currentUser, { displayName: cleanName });

    // 2. Update Firestore users doc
    const userDocRef = doc(db, 'users', currentUser.uid);
    await setDoc(userDocRef, {
      displayName: cleanName,
      phone: cleanPhone || userProfile?.phone || '',
      updatedAt: serverTimestamp()
    }, { merge: true });

    // 3. Update donor record if user is registered as a donor
    try {
      const donorDocRef = doc(db, 'donors', `donor_${currentUser.uid}`);
      const donorSnap = await getDoc(donorDocRef);
      if (donorSnap.exists()) {
        await updateDoc(donorDocRef, {
          fullName: cleanName,
          phone: cleanPhone || donorSnap.data().phone,
          updatedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.warn('Could not update donor profile during account update:', e);
    }

    // 4. Update Password if provided
    if (newPassword && newPassword.trim().length >= 6) {
      try {
        await updatePassword(currentUser, newPassword.trim());
      } catch (passErr: any) {
        if (passErr.code === 'auth/requires-recent-login') {
          throw new Error('لتغيير كلمة المرور، يرجى الخروج وتسجيل الدخول مجدداً ثم المحاولة.');
        }
        throw new Error(passErr.message || 'فشل تحديث كلمة المرور');
      }
    }

    // 5. Update local state
    setUserProfile(prev => prev ? {
      ...prev,
      displayName: cleanName,
      phone: cleanPhone || prev.phone
    } : {
      uid: currentUser.uid,
      displayName: cleanName,
      phone: cleanPhone,
      phoneVerified: true,
      role: 'user'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        supervisorProfile,
        isOwner,
        isAuthorizedAdmin,
        adminLevel,
        adminPermissions,
        isGuest,
        isLoading,
        loginWithPhone,
        loginWithEmailPassword,
        registerWithPhone,
        resetPasswordDirect,
        loginWithGoogle,
        continueAsGuest,
        logout,
        deleteAccount,
        updateUserName,
        updateUserProfileAndAccount,
        activeRole,
        switchActiveRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
