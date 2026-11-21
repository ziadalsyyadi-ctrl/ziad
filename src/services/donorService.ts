import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  where,
  serverTimestamp,
  limit,
  arrayUnion
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Donor, UrgentRequest, RequestStatus } from '../types';
import { INITIAL_SEED_DONORS, INITIAL_SEED_REQUESTS } from '../data/initialData';
import { deleteDonorFromGoogleSheets, cancelPendingDonorSheetSync } from './googleSheetsService';

const DONORS_COLLECTION = 'donors';
const REQUESTS_COLLECTION = 'urgent_requests';

// Listen to all public donors with error handling
export function subscribeToDonors(
  callback: (donors: Donor[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(
    collection(db, DONORS_COLLECTION)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const items: Donor[] = [];
      snapshot.forEach((d) => {
        const data = d.data();
        items.push({
          id: d.id,
          userId: data.userId || '',
          fullName: data.fullName || '',
          bloodType: data.bloodType || 'O+',
          phone: data.phone || '',
          phoneVerified: data.phoneVerified ?? true,
          residence: data.residence || '',
          notes: data.notes || '',
          lastDonationDate: data.lastDonationDate || '',
          isAvailable: data.isAvailable ?? true,
          allowContact: data.allowContact ?? true,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      callback(items);
    },
    (error) => {
      console.warn('Subscription snapshot warning in subscribeToDonors (e.g. offline):', error);
      if (onError) onError(error);
      const msg = error.message?.toLowerCase() || '';
      const isExpectedWarning =
        msg.includes('offline') ||
        msg.includes('unavailable') ||
        msg.includes('network') ||
        msg.includes('permission') ||
        msg.includes('insufficient');
      if (!isExpectedWarning) {
        try {
          handleFirestoreError(error, OperationType.LIST, DONORS_COLLECTION);
        } catch {
          // Logged via handleFirestoreError; prevent uncaught async callback crash
        }
      }
    }
  );
}

// Check if a phone number already exists for another donor record
export async function checkPhoneExists(phone: string, currentDonorId: string, currentUserId: string): Promise<boolean> {
  const cleanPhone = phone.trim().replace(/\D/g, '');
  try {
    const q = query(collection(db, DONORS_COLLECTION), where('phone', '==', cleanPhone));
    const snap = await getDocs(q);
    let existsForOther = false;
    snap.forEach((docSnap) => {
      if (docSnap.id !== currentDonorId) {
        existsForOther = true;
      }
    });
    return existsForOther;
  } catch (error) {
    console.warn('Error checking phone uniqueness:', error);
    return false;
  }
}

// Save or Update a donor profile (supports admin editing any donor)
export async function saveDonorProfile(
  donorData: Omit<Donor, 'id'>,
  existingDonorId?: string
): Promise<string> {
  const isSheetDonor = Boolean(existingDonorId && existingDonorId.startsWith('sheet_'));
  // If editing an existing Firestore donor, reuse its ID; otherwise create a new donor ID
  const donorId = (existingDonorId && !isSheetDonor)
    ? existingDonorId 
    : `donor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const donorDocRef = doc(db, DONORS_COLLECTION, donorId);

  const cleanPhone = donorData.phone.trim().replace(/\D/g, '');

  const payload: any = {
    userId: donorData.userId,
    fullName: donorData.fullName.trim(),
    bloodType: donorData.bloodType,
    phone: cleanPhone,
    phoneVerified: Boolean(donorData.phoneVerified ?? true),
    residence: donorData.residence.trim(),
    notes: (donorData.notes || '').trim(),
    lastDonationDate: (donorData.lastDonationDate || '').trim(),
    isAvailable: Boolean(donorData.isAvailable),
    allowContact: Boolean(donorData.allowContact),
    updatedAt: serverTimestamp(),
  };

  try {
    if (existingDonorId && !isSheetDonor) {
      await updateDoc(donorDocRef, payload);
      return donorId;
    } else {
      await setDoc(donorDocRef, {
        ...payload,
        createdAt: serverTimestamp(),
      });

      // If we upgraded a sheet donor to a permanent Firestore donor, hide old sheet entry
      if (isSheetDonor && existingDonorId) {
        try {
          const settingsRef = doc(db, 'settings', 'global');
          const snap = await getDoc(settingsRef);
          const currentDeleted = snap.exists() ? (snap.data().deletedDonors || []) : [];
          if (!currentDeleted.includes(existingDonorId)) {
            await setDoc(settingsRef, {
              deletedDonors: [...currentDeleted, existingDonorId],
              updatedAt: serverTimestamp(),
            }, { merge: true });
          }
        } catch (e) {
          console.warn('Note: sheet upgrade sync caught:', e);
        }
      }

      return donorId;
    }
  } catch (error) {
    handleFirestoreError(
      error,
      (existingDonorId && !isSheetDonor) ? OperationType.UPDATE : OperationType.CREATE,
      `${DONORS_COLLECTION}/${donorId}`
    );
  }
}

// Generic update for any donor field (used by admin and profile edits)
export async function updateDonorProfile(donorId: string, updates: Partial<Donor>): Promise<void> {
  const donorDocRef = doc(db, DONORS_COLLECTION, donorId);
  try {
    const payload: any = { ...updates, updatedAt: serverTimestamp() };
    if (payload.id) delete payload.id;
    await updateDoc(donorDocRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${DONORS_COLLECTION}/${donorId}`);
  }
}

// Durable client-side queue for deletions made while offline or while Sheets is unavailable.
const PENDING_DONOR_DELETIONS_KEY = 'qataba_pending_donor_deletions_v1';

function readPendingDonorDeletions(): Array<{ donorId: string; phone: string }> {
  try {
    const parsed = JSON.parse(localStorage.getItem(PENDING_DONOR_DELETIONS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function savePendingDonorDeletions(items: Array<{ donorId: string; phone: string }>) {
  try { localStorage.setItem(PENDING_DONOR_DELETIONS_KEY, JSON.stringify(items)); } catch {}
}

function isAlreadyMissingFromSheets(result: { error?: string; message?: string }): boolean {
  return /not found|لم يعثر|غير موجود|لا يوجد سجل|لم يتم العثور/i.test(String(result.error || result.message || ''));
}

async function applyDonorDeletionToCloud(donorId: string, phone: string): Promise<void> {
  const sheetsDonorId = donorId.startsWith('sheet_') ? donorId.slice('sheet_'.length) : donorId;
  if (!donorId.startsWith('sheet_')) {
    await deleteDoc(doc(db, DONORS_COLLECTION, donorId));
  }
  const cleanP = phone.replace(/[^\d]/g, '');
  const tombstones = Array.from(new Set([donorId, sheetsDonorId, ...(cleanP ? [cleanP] : [])]));
  await setDoc(doc(db, 'settings', 'global'), {
    deletedDonors: arrayUnion(...tombstones),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/** Retry queued Firestore + Sheets deletions after connectivity returns. */
export async function retryPendingDonorDeletions(): Promise<number> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return 0;
  const pending = readPendingDonorDeletions();
  const remaining: Array<{ donorId: string; phone: string }> = [];
  let completed = 0;
  for (const item of pending) {
    try {
      const sheetsDonorId = item.donorId.startsWith('sheet_') ? item.donorId.slice('sheet_'.length) : item.donorId;
      await applyDonorDeletionToCloud(item.donorId, item.phone);
      const result = await deleteDonorFromGoogleSheets(sheetsDonorId, item.phone);
      if (!result.success && !isAlreadyMissingFromSheets(result)) throw new Error(result.error || 'Google Sheets delete failed');
      completed++;
    } catch (error) {
      console.warn('Pending donor deletion will be retried:', error);
      remaining.push(item);
    }
  }
  savePendingDonorDeletions(remaining);
  return completed;
}

// Delete locally immediately; retain a durable retry record until both cloud stores confirm.
export async function deleteDonorProfile(donorId: string, donorPhone?: string): Promise<void> {
  const phone = String(donorPhone || '');
  cancelPendingDonorSheetSync(donorId);
  const pending = readPendingDonorDeletions();
  if (!pending.some(item => item.donorId === donorId)) {
    pending.push({ donorId, phone });
    savePendingDonorDeletions(pending);
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    // The local UI hides the donor immediately; the persistent queue is flushed on reconnect.
    return;
  }

  try {
    const sheetsDonorId = donorId.startsWith('sheet_') ? donorId.slice('sheet_'.length) : donorId;
    await applyDonorDeletionToCloud(donorId, phone);
    const sheetsResult = await deleteDonorFromGoogleSheets(sheetsDonorId, phone);
    if (!sheetsResult.success && !isAlreadyMissingFromSheets(sheetsResult)) throw new Error(sheetsResult.error || 'تعذر حذف المتبرع من جدول Google Sheets.');
    savePendingDonorDeletions(readPendingDonorDeletions().filter(item => item.donorId !== donorId));
  } catch (error) {
    // Keep the queued operation for an automatic retry; do not resurrect the donor in the UI.
    console.warn('Donor deletion queued for retry:', error);
  }
}

// Listen to urgent blood requests
export function subscribeToUrgentRequests(
  callback: (requests: UrgentRequest[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(
    collection(db, REQUESTS_COLLECTION), 
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const items: UrgentRequest[] = [];
      snapshot.forEach((d) => {
        const data = d.data();
        items.push({
          id: d.id,
          userId: data.userId || '',
          patientName: data.patientName || '',
          bloodType: data.bloodType || 'O+',
          unitsNeeded: Number(data.unitsNeeded) || 1,
          hospital: data.hospital || '',
          contactName: data.contactName || '',
          contactPhone: data.contactPhone || '',
          urgencyLevel: data.urgencyLevel || 'urgent',
          status: data.status || 'open',
          notes: data.notes || '',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      callback(items);
    },
    (error) => {
      console.warn('Subscription snapshot warning in subscribeToUrgentRequests (e.g. offline):', error);
      if (onError) onError(error);
      const isOfflineError = error.message?.toLowerCase().includes('offline') || 
                             error.message?.toLowerCase().includes('unavailable') || 
                             error.message?.toLowerCase().includes('network');
      if (!isOfflineError) {
        handleFirestoreError(error, OperationType.LIST, REQUESTS_COLLECTION);
      }
    }
  );
}

// Create an urgent blood request
export async function createUrgentRequest(
  requestData: Omit<UrgentRequest, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const reqId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const reqDocRef = doc(db, REQUESTS_COLLECTION, reqId);

  const cleanPhone = requestData.contactPhone.trim().replace(/\D/g, '');

  const payload = {
    userId: requestData.userId,
    patientName: requestData.patientName.trim(),
    bloodType: requestData.bloodType,
    unitsNeeded: Math.max(1, Math.min(20, Number(requestData.unitsNeeded) || 1)),
    hospital: requestData.hospital.trim(),
    contactName: requestData.contactName.trim(),
    contactPhone: cleanPhone,
    urgencyLevel: requestData.urgencyLevel,
    status: 'open',
    notes: (requestData.notes || '').trim(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(reqDocRef, payload);
    return reqId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${REQUESTS_COLLECTION}/${reqId}`);
  }
}

// Update request status (e.g. mark fulfilled)
export async function updateRequestStatus(
  requestId: string,
  newStatus: RequestStatus
): Promise<void> {
  const reqDocRef = doc(db, REQUESTS_COLLECTION, requestId);
  try {
    await updateDoc(reqDocRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${REQUESTS_COLLECTION}/${requestId}`);
  }
}

// Delete urgent request
export async function deleteUrgentRequest(requestId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, REQUESTS_COLLECTION, requestId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${REQUESTS_COLLECTION}/${requestId}`);
  }
}

// Seed community initial donors if collection is empty
export async function seedInitialCommunityData(currentUserId: string): Promise<void> {
  try {
    const snap = await getDocs(collection(db, DONORS_COLLECTION));
    if (snap.empty) {
      console.log('Seeding initial community donors for Qa\'tabah...');
      for (let i = 0; i < INITIAL_SEED_DONORS.length; i++) {
        const item = INITIAL_SEED_DONORS[i];
        const seedId = `donor_seed_${i + 1}`;
        await setDoc(doc(db, DONORS_COLLECTION, seedId), {
          ...item,
          userId: currentUserId,
          allowContact: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      // Also seed sample requests
      for (let j = 0; j < INITIAL_SEED_REQUESTS.length; j++) {
        const req = INITIAL_SEED_REQUESTS[j];
        const reqId = `req_seed_${j + 1}`;
        await setDoc(doc(db, REQUESTS_COLLECTION, reqId), {
          ...req,
          userId: currentUserId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    console.warn('Seeding check completed (or rules restricted non-auth):', err);
  }
}
