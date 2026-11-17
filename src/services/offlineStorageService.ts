import { Donor, UrgentRequest } from '../types';

/**
 * نظام التخزين المحلي الدائم (Offline-First) لبنك الدم - قعطبة
 * يعتمد على IndexedDB مع مرآة متزامنة فورية (Synchronous LocalStorage Cache)
 * لضمان تحميل فوري بنسبة 100% دون أي تأخير عند فتح التطبيق بدون اتصال بالإنترنت.
 */

const DB_NAME = 'QatabaBloodBankDB';
const DB_VERSION = 1;
const STORE_DONORS = 'donors';
const STORE_URGENT = 'urgent_requests';
const STORE_METADATA = 'sync_metadata';

const LOCAL_STORAGE_DONORS_KEY = 'qataba_offline_donors_v1';
const LOCAL_STORAGE_URGENT_KEY = 'qataba_offline_urgent_v1';
const LOCAL_STORAGE_META_KEY = 'qataba_offline_meta_v1';

export interface SyncMetadata {
  key?: string;
  lastSyncTime: string;
  lastSyncTimestamp: number;
  donorCount: number;
  sheetsCount?: number;
  firestoreCount?: number;
  isOfflineSnapshot: boolean;
  version: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * فتح قاعدة بيانات IndexedDB وضمان إنشاء الجداول (Object Stores) والفهارس
 */
export function openOfflineDB(): Promise<IDBDatabase> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.reject(new Error('IndexedDB غير مدعوم في هذه البيئة'));
  }

  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 1. جدول المتبرعين (Donors Store)
        if (!db.objectStoreNames.contains(STORE_DONORS)) {
          const donorStore = db.createObjectStore(STORE_DONORS, { keyPath: 'id' });
          donorStore.createIndex('bloodType', 'bloodType', { unique: false });
          donorStore.createIndex('residence', 'residence', { unique: false });
          donorStore.createIndex('phone', 'phone', { unique: false });
          donorStore.createIndex('source', 'source', { unique: false });
        }

        // 2. جدول طلبات الدم العاجلة (Urgent Requests Store)
        if (!db.objectStoreNames.contains(STORE_URGENT)) {
          const urgentStore = db.createObjectStore(STORE_URGENT, { keyPath: 'id' });
          urgentStore.createIndex('bloodType', 'bloodType', { unique: false });
          urgentStore.createIndex('status', 'status', { unique: false });
          urgentStore.createIndex('urgencyLevel', 'urgencyLevel', { unique: false });
        }

        // 3. جدول البيانات الوصفية للمزامنة (Sync Metadata Store)
        if (!db.objectStoreNames.contains(STORE_METADATA)) {
          db.createObjectStore(STORE_METADATA, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.warn('⚠️ فشل فتح IndexedDB:', request.error);
        reject(request.error);
      };
    } catch (err) {
      console.warn('⚠️ خطأ استثنائي أثناء محاولة فتح IndexedDB:', err);
      reject(err);
    }
  });

  return dbPromise;
}

/**
 * 0-Millisecond Synchronous Hydration:
 * جلب فوري من الذاكرة المحلية المخزنة مسبقاً قبل انتظار أي وعود (Promises) غير متزامنة.
 * هذا يمنح التطبيق ظهوراً فورياً بنسبة 0ms لقائمة المتبرعين عند فتحه بدون إنترنت.
 */
export function getInstantLocalDonorsSync(): Donor[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_DONORS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('تعذر قراءة الكاش المتزامن للمتبرعين:', err);
  }

  // Never invent fallback donor rows: seed data can inflate counts and
  // resurrect records that have already been deleted from the live database.
  return [];
}

/**
 * جلب الكاش المتزامن لطلبات الدم العاجلة
 */
export function getInstantLocalUrgentSync(): UrgentRequest[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_URGENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('تعذر قراءة الكاش المتزامن لطلبات الدم:', err);
  }
  return [];
}

/**
 * جلب البيانات الوصفية للمزامنة بشكل متزامن
 */
export function getInstantSyncMetaSync(): SyncMetadata | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_META_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // تجاهل الأخطاء
  }
  return null;
}

/**
 * حفظ قائمة المتبرعين في قاعدة البيانات المحلية الدائمة (IndexedDB)
 * وتحديث المرآة السريعة (LocalStorage) والبيانات الوصفية
 */
export async function saveDonorsToOfflineStorage(
  donors: Donor[],
  extraMeta?: { sheetsCount?: number; firestoreCount?: number }
): Promise<boolean> {
  if (!Array.isArray(donors) || donors.length === 0) return false;

  // Do not allow an early/partial remote response to overwrite a complete
  // offline snapshot. Explicit deletions use deleteDonorFromOfflineStorage.
  const cachedDonors = getInstantLocalDonorsSync();
  if (cachedDonors.length > donors.length && donors.length < 10) {
    console.warn('رفض حفظ قائمة متبرعين جزئية حتى لا تُستبدل النسخة المحلية الكاملة.');
    return false;
  }

  const timestamp = Date.now();
  const timeFormatted = new Date().toLocaleTimeString('ar-YE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const metadata: SyncMetadata = {
    key: 'latest',
    lastSyncTime: timeFormatted,
    lastSyncTimestamp: timestamp,
    donorCount: donors.length,
    sheetsCount: extraMeta?.sheetsCount,
    firestoreCount: extraMeta?.firestoreCount,
    isOfflineSnapshot: !navigator.onLine,
    version: 1,
  };

  // 1. تحديث المرآة السريعة فوراً في LocalStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_DONORS_KEY, JSON.stringify(donors));
    localStorage.setItem(LOCAL_STORAGE_META_KEY, JSON.stringify(metadata));
  } catch (e) {
    console.warn('تنبيه: حجم LocalStorage ممتلئ، الاعتماد الأساسي على IndexedDB.');
  }

  // 2. الحفظ الكامل في IndexedDB
  try {
    const db = await openOfflineDB();
    return new Promise((resolve) => {
      const tx = db.transaction([STORE_DONORS, STORE_METADATA], 'readwrite');
      const donorStore = tx.objectStore(STORE_DONORS);
      const metaStore = tx.objectStore(STORE_METADATA);

      // مسح القديم وكتابة الجديد لضمان عدم وجود أيتام محذوفة
      donorStore.clear();

      for (const donor of donors) {
        donorStore.put(donor);
      }

      metaStore.put(metadata);

      tx.oncomplete = () => {
        resolve(true);
      };

      tx.onerror = () => {
        console.warn('⚠️ خطأ أثناء حفظ المتبرعين في IndexedDB:', tx.error);
        resolve(false);
      };
    });
  } catch (err) {
    console.warn('⚠️ تعذر إتمام عملية الحفظ في IndexedDB:', err);
    return false;
  }
}

/**
 * استرجاع جميع المتبرعين من قاعدة البيانات المحلية IndexedDB
 */
export async function getDonorsFromOfflineStorage(): Promise<Donor[]> {
  try {
    const db = await openOfflineDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_DONORS, 'readonly');
      const store = tx.objectStore(STORE_DONORS);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result;
        if (Array.isArray(results) && results.length > 0) {
          resolve(results);
        } else {
          // اللجوء للمرآة السريعة
          resolve(getInstantLocalDonorsSync());
        }
      };

      request.onerror = () => {
        resolve(getInstantLocalDonorsSync());
      };
    });
  } catch (err) {
    return getInstantLocalDonorsSync();
  }
}

/**
 * حفظ طلبات الدم العاجلة محلياً
 */
export async function saveUrgentRequestsToOfflineStorage(requests: UrgentRequest[]): Promise<boolean> {
  if (!Array.isArray(requests)) return false;

  try {
    localStorage.setItem(LOCAL_STORAGE_URGENT_KEY, JSON.stringify(requests));
  } catch {}

  try {
    const db = await openOfflineDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_URGENT, 'readwrite');
      const store = tx.objectStore(STORE_URGENT);
      store.clear();

      for (const req of requests) {
        store.put(req);
      }

      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * استرجاع طلبات الدم العاجلة من التخزين المحلي
 */
export async function getUrgentRequestsFromOfflineStorage(): Promise<UrgentRequest[]> {
  try {
    const db = await openOfflineDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_URGENT, 'readonly');
      const store = tx.objectStore(STORE_URGENT);
      const req = store.getAll();

      req.onsuccess = () => {
        if (Array.isArray(req.result) && req.result.length > 0) {
          resolve(req.result);
        } else {
          resolve(getInstantLocalUrgentSync());
        }
      };

      req.onerror = () => resolve(getInstantLocalUrgentSync());
    });
  } catch {
    return getInstantLocalUrgentSync();
  }
}

/**
 * حذف متبرع من التخزين المحلي فوراً عند قيام المسؤول بحذفه
 */
export async function deleteDonorFromOfflineStorage(donorId: string, phone?: string): Promise<boolean> {
  try {
    const cleanP = phone ? phone.replace(/\\D/g, '') : '';
    const matchesDeleted = (d: Donor) => {
      if (String(d.id) === String(donorId)) return true;
      if (cleanP && d.phone && String(d.phone).replace(/\\D/g, '') === cleanP) return true;
      return false;
    };

    // 1. Remove from the synchronous LocalStorage mirror (including an empty result).
    const current = getInstantLocalDonorsSync();
    const updated = current.filter(d => !matchesDeleted(d));
    localStorage.setItem(LOCAL_STORAGE_DONORS_KEY, JSON.stringify(updated));

    // 2. Rebuild IndexedDB donor store by ID OR normalized phone.
    const db = await openOfflineDB();
    return await new Promise<boolean>((resolve) => {
      const tx = db.transaction([STORE_DONORS, STORE_METADATA], 'readwrite');
      const store = tx.objectStore(STORE_DONORS);
      const metaStore = tx.objectStore(STORE_METADATA);
      const request = store.getAll();

      request.onsuccess = () => {
        const remaining = (request.result as Donor[]).filter(d => !matchesDeleted(d));
        store.clear();
        for (const donor of remaining) store.put(donor);

        const rawMeta = localStorage.getItem(LOCAL_STORAGE_META_KEY);
        let previousMeta: SyncMetadata | null = null;
        try { previousMeta = rawMeta ? JSON.parse(rawMeta) : null; } catch {}
        const metadata: SyncMetadata = {
          key: 'latest',
          lastSyncTime: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' }),
          lastSyncTimestamp: Date.now(),
          donorCount: remaining.length,
          sheetsCount: previousMeta?.sheetsCount,
          firestoreCount: previousMeta?.firestoreCount,
          isOfflineSnapshot: !navigator.onLine,
          version: 1,
        };
        try { localStorage.setItem(LOCAL_STORAGE_META_KEY, JSON.stringify(metadata)); } catch {}
        metaStore.put(metadata);
      };

      request.onerror = () => {
        tx.abort();
      };
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    });
  } catch (error) {
    console.warn('تعذر حذف المتبرع من التخزين المحلي:', error);
    return false;
  }
}
