import { Capacitor } from '@capacitor/core';
import {
  doc,
  getDocFromServer,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export const DEFAULT_WEBSITE_URL = 'https://sites.google.com/view/bank-al-dam-qataba';
export const WEBSITE_CONFIG_PATH = 'appConfig/websiteUrl';
const WEBSITE_COLLECTION = 'appConfig';
const WEBSITE_DOC_ID = 'websiteUrl';

const LOCAL_WEBSITE_URL_KEY = 'qataba_remote_website_url_v1';
const LOCAL_WEBSITE_META_KEY = 'qataba_remote_website_meta_v1';

export type WebsiteUrlSource = 'firebase' | 'cache' | 'default';

export interface WebsiteConfigState {
  url: string;
  source: WebsiteUrlSource;
  updatedAt?: string;
}

/**
 * Validates and normalizes a remote website URL.
 * Accepts only well-formed http/https URLs up to 500 characters without whitespace.
 */
export function validateWebsiteUrl(rawUrl: unknown): string | null {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (trimmed.length < 10 || trimmed.length > 500 || /\s/.test(trimmed)) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function extractUrlFromDocData(data: Record<string, unknown> | undefined): string | null {
  if (!data) return null;
  const candidates = [data.websiteUrl, data.url, data.value];
  for (const candidate of candidates) {
    const valid = validateWebsiteUrl(candidate);
    if (valid) return valid;
  }
  return null;
}

export function getCachedWebsiteUrl(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_WEBSITE_URL_KEY);
    return validateWebsiteUrl(raw);
  } catch {
    return null;
  }
}

export function getInitialWebsiteConfig(): WebsiteConfigState {
  const cached = getCachedWebsiteUrl();
  if (cached) {
    let updatedAt: string | undefined;
    try {
      const rawMeta = localStorage.getItem(LOCAL_WEBSITE_META_KEY);
      if (rawMeta) {
        const parsed = JSON.parse(rawMeta) as { updatedAt?: string };
        updatedAt = parsed.updatedAt;
      }
    } catch {}
    return { url: cached, source: 'cache', updatedAt };
  }
  return { url: DEFAULT_WEBSITE_URL, source: 'default' };
}

function saveCachedWebsiteUrl(validUrl: string, source: WebsiteUrlSource): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_WEBSITE_URL_KEY, validUrl);
    localStorage.setItem(
      LOCAL_WEBSITE_META_KEY,
      JSON.stringify({
        url: validUrl,
        source,
        updatedAt: new Date().toISOString(),
      })
    );
  } catch {
    // Ignore storage quota or private browsing errors cleanly
  }
}

/**
 * Forces a fresh read from Firebase Firestore server (compatible with manual/OTA refresh).
 * Never throws: safely falls back to local cache or default URL on network/Firebase failure.
 */
export async function refreshWebsiteConfigFromServer(): Promise<WebsiteConfigState> {
  const docRef = doc(db, WEBSITE_COLLECTION, WEBSITE_DOC_ID);
  try {
    const snap = await getDocFromServer(docRef);
    if (snap.exists()) {
      const remoteUrl = extractUrlFromDocData(snap.data() as Record<string, unknown>);
      if (remoteUrl) {
        saveCachedWebsiteUrl(remoteUrl, 'firebase');
        return {
          url: remoteUrl,
          source: 'firebase',
          updatedAt: new Date().toISOString(),
        };
      }
      console.warn('[WebsiteConfig] Remote document appConfig/websiteUrl has an invalid URL; using fallback.');
    }
  } catch (err) {
    console.warn('[WebsiteConfig] Could not fetch latest website URL from Firebase server; using fallback:', err);
  }

  return getInitialWebsiteConfig();
}

/**
 * Subscribes to live changes at Firestore appConfig/websiteUrl.
 * Guaranteed not to crash startup, login, or donor search if Firebase is unreachable.
 */
export function subscribeToWebsiteConfig(
  onUpdate: (state: WebsiteConfigState) => void
): () => void {
  try {
    onUpdate(getInitialWebsiteConfig());
  } catch {
    onUpdate({ url: DEFAULT_WEBSITE_URL, source: 'default' });
  }

  let unsub: (() => void) | null = null;
  try {
    const docRef = doc(db, WEBSITE_COLLECTION, WEBSITE_DOC_ID);
    unsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const remoteUrl = extractUrlFromDocData(snap.data() as Record<string, unknown>);
          if (remoteUrl) {
            saveCachedWebsiteUrl(remoteUrl, 'firebase');
            onUpdate({
              url: remoteUrl,
              source: 'firebase',
              updatedAt: new Date().toISOString(),
            });
            return;
          }
          console.warn('[WebsiteConfig] Ignored invalid website URL from Firebase snapshot.');
        }
        onUpdate(getInitialWebsiteConfig());
      },
      (error) => {
        console.warn('[WebsiteConfig] Live subscription fallback active:', error?.message || error);
        onUpdate(getInitialWebsiteConfig());
      }
    );
  } catch (err) {
    console.warn('[WebsiteConfig] Failed to attach Firebase listener; continuing with fallback:', err);
    onUpdate(getInitialWebsiteConfig());
  }

  return () => {
    try {
      if (unsub) unsub();
    } catch {}
  };
}

/**
 * Admin-only: saves/updates appConfig/websiteUrl in Firebase Firestore.
 */
export async function saveRemoteWebsiteUrl(newUrl: string): Promise<string> {
  const validUrl = validateWebsiteUrl(newUrl);
  if (!validUrl) {
    throw new Error('الرابط غير صالح. يجب أن يبدأ بـ https:// أو http:// ويكون عنوان موقع صحيحاً.');
  }

  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('يجب تسجيل الدخول بحساب المسؤول لتحديث رابط الموقع.');
  }

  const docRef = doc(db, WEBSITE_COLLECTION, WEBSITE_DOC_ID);
  try {
    await setDoc(
      docRef,
      {
        websiteUrl: validUrl,
        updatedAt: serverTimestamp(),
        updatedBy: uid,
      },
      { merge: true }
    );
    saveCachedWebsiteUrl(validUrl, 'firebase');
    return validUrl;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, WEBSITE_CONFIG_PATH);
  }
}

/**
 * Admin-only: seeds appConfig/websiteUrl once if the document does not exist yet in Firebase.
 */
export async function ensureWebsiteConfigSeededForAdmin(): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const docRef = doc(db, WEBSITE_COLLECTION, WEBSITE_DOC_ID);
  try {
    const snap = await getDocFromServer(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, {
        websiteUrl: DEFAULT_WEBSITE_URL,
        updatedAt: serverTimestamp(),
        updatedBy: uid,
      });
      saveCachedWebsiteUrl(DEFAULT_WEBSITE_URL, 'firebase');
    }
  } catch (err) {
    console.warn('[WebsiteConfig] Admin auto-seed skipped:', err);
  }
}

/**
 * Validates and opens the official website in the external phone browser (Android)
 * or a new browser tab (Web).
 */
export function openWebsiteInExternalBrowser(candidateUrl?: string): {
  opened: boolean;
  url: string;
  usedFallback: boolean;
  errorMessage?: string;
} {
  let usedFallback = false;
  let targetUrl = validateWebsiteUrl(candidateUrl);

  if (!targetUrl) {
    usedFallback = true;
    targetUrl = getCachedWebsiteUrl() || validateWebsiteUrl(DEFAULT_WEBSITE_URL);
  }

  if (!targetUrl) {
    return {
      opened: false,
      url: '',
      usedFallback: true,
      errorMessage: 'رابط الموقع غير صالح حالياً. يرجى مراجعة إدارة التطبيق.',
    };
  }

  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return { opened: false, url: targetUrl, usedFallback, errorMessage: 'بيئة المتصفح غير متاحة.' };
    }

    if (Capacitor.isNativePlatform()) {
      // Capacitor Android BridgeWebViewClient intercepts external HTTPS URLs via Intent.ACTION_VIEW
      // and launches the device's default external browser without leaving the app state.
      window.location.assign(targetUrl);
    } else {
      const link = document.createElement('a');
      link.href = targetUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    return { opened: true, url: targetUrl, usedFallback };
  } catch (err) {
    console.error('[WebsiteConfig] Failed to launch external browser:', err);
    return {
      opened: false,
      url: targetUrl,
      usedFallback,
      errorMessage: 'تعذر فتح المتصفح الخارجي على هذا الجهاز.',
    };
  }
}
