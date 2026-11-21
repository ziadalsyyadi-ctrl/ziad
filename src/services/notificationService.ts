import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

export type UrgentAlertKind = 'urgent_request' | 'admin_urgent' | 'admin_notice' | 'admin_reply';

export interface UrgentAlertPayload {
  id: string;
  kind: UrgentAlertKind;
  title: string;
  body: string;
  targetTab: 'urgent' | 'notifications' | 'chat';
  bloodType?: string;
  hospital?: string;
  contactPhone?: string;
  contactName?: string;
  unitsNeeded?: number;
  createdAt?: string;
}

const SOUND_PREF_KEY = 'qataba_alert_sound_enabled_v1';
const SEEN_ALERTS_KEY = 'qataba_seen_alerts_v1';
const ANDROID_URGENT_CHANNEL_ID = 'urgent_blood_alerts';

let sharedAudioCtx: AudioContext | null = null;
let audioUnlockInstalled = false;
let nativeListenerAttached = false;
let nativeChannelReady = false;
let tapHandler: ((targetTab: 'urgent' | 'notifications' | 'chat') => void) | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  return sharedAudioCtx;
}

export function installAudioUnlockListeners(): void {
  if (audioUnlockInstalled || typeof window === 'undefined') return;
  audioUnlockInstalled = true;

  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };

  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('touchstart', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });
}

export function isAlertSoundEnabled(): boolean {
  try {
    const raw = localStorage.getItem(SOUND_PREF_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
}

export function setAlertSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SOUND_PREF_KEY, enabled ? 'true' : 'false');
  } catch {}
}

export function hasSeenAlertId(alertId: string): boolean {
  if (!alertId) return false;
  try {
    const list: string[] = JSON.parse(localStorage.getItem(SEEN_ALERTS_KEY) || '[]');
    return Array.isArray(list) && list.includes(alertId);
  } catch {
    return false;
  }
}

export function markAlertIdSeen(alertId: string): void {
  if (!alertId) return;
  try {
    const list: string[] = JSON.parse(localStorage.getItem(SEEN_ALERTS_KEY) || '[]');
    const clean = Array.isArray(list) ? list : [];
    if (clean.includes(alertId)) return;
    clean.push(alertId);
    const trimmed = clean.slice(-200);
    localStorage.setItem(SEEN_ALERTS_KEY, JSON.stringify(trimmed));
  } catch {}
}

export function playUrgentAlertSound(kind: UrgentAlertKind = 'urgent_request'): void {
  if (!isAlertSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const notes =
      kind === 'admin_reply'
        ? [
            { freq: 784, start: 0, dur: 0.14 },
            { freq: 1046.5, start: 0.16, dur: 0.22 },
          ]
        : [
            { freq: 880, start: 0, dur: 0.14 },
            { freq: 1174.66, start: 0.16, dur: 0.14 },
            { freq: 1318.51, start: 0.32, dur: 0.2 },
            { freq: 880, start: 0.62, dur: 0.14 },
            { freq: 1174.66, start: 0.78, dur: 0.14 },
            { freq: 1318.51, start: 0.94, dur: 0.24 },
          ];

    for (const note of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now + note.start);

      gain.gain.setValueAtTime(0.0001, now + note.start);
      gain.gain.exponentialRampToValueAtTime(0.28, now + note.start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.start);
      osc.stop(now + note.start + note.dur + 0.02);
    }
  } catch (err) {
    console.warn('Alert sound playback skipped:', err);
  }
}

export function triggerAlertVibration(kind: UrgentAlertKind = 'urgent_request'): void {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      const pattern = kind === 'admin_reply' ? [180, 90, 220] : [250, 100, 250, 100, 420];
      navigator.vibrate(pattern);
    }
  } catch {}
}

function stableNumericId(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  const positive = Math.abs(hash) % 2000000000;
  return positive > 0 ? positive : 1;
}

async function ensureNativeChannel(): Promise<void> {
  if (nativeChannelReady) return;
  if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable('LocalNotifications')) return;
  try {
    await LocalNotifications.createChannel({
      id: ANDROID_URGENT_CHANNEL_ID,
      name: 'تنبيهات الدم والرسائل العاجلة',
      description: 'إشعارات عالية الأهمية لطلبات التبرع الطارئة وتنبيهات المسؤول',
      importance: 5,
      visibility: 1,
      sound: 'default',
      vibration: true,
      lights: true,
      lightColor: '#DC2626',
    });
    nativeChannelReady = true;
  } catch (err) {
    console.warn('Could not create Android notification channel:', err);
  }
}

export function setNotificationTapHandler(
  handler: ((targetTab: 'urgent' | 'notifications' | 'chat') => void) | null
): void {
  tapHandler = handler;
}

export async function getAlertPermissionStatus(): Promise<'granted' | 'denied' | 'prompt' | 'unsupported'> {
  if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('LocalNotifications')) {
    try {
      const status = await LocalNotifications.checkPermissions();
      if (status.display === 'granted') return 'granted';
      if (status.display === 'denied') return 'denied';
      return 'prompt';
    } catch {
      return 'unsupported';
    }
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied') return 'denied';
    return 'prompt';
  }

  return 'unsupported';
}

export async function requestAlertPermission(): Promise<'granted' | 'denied' | 'prompt' | 'unsupported'> {
  if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('LocalNotifications')) {
    try {
      await ensureNativeChannel();
      const current = await LocalNotifications.checkPermissions();
      if (current.display === 'granted') return 'granted';
      const req = await LocalNotifications.requestPermissions();
      return req.display === 'granted' ? 'granted' : req.display === 'denied' ? 'denied' : 'prompt';
    } catch {
      return 'unsupported';
    }
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const perm = await Notification.requestPermission();
      return perm === 'granted' ? 'granted' : perm === 'denied' ? 'denied' : 'prompt';
    } catch {
      return 'denied';
    }
  }

  return 'unsupported';
}

export const initializePushNotifications = async (_userId?: string): Promise<void> => {
  installAudioUnlockListeners();

  if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('LocalNotifications')) {
    try {
      await ensureNativeChannel();
      if (!nativeListenerAttached) {
        nativeListenerAttached = true;
        await LocalNotifications.addListener('localNotificationActionPerformed', (event) => {
          const targetTab = event?.notification?.extra?.targetTab;
          if (
            tapHandler &&
            (targetTab === 'urgent' || targetTab === 'notifications' || targetTab === 'chat')
          ) {
            tapHandler(targetTab);
          }
        });
      }
      await LocalNotifications.requestPermissions();
    } catch (error) {
      console.warn('Native notification initialization note:', error);
    }
    return;
  }

  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    } catch (error) {
      console.warn('Browser notification permission note:', error);
    }
  }
};

export async function sendSystemAlertNotification(payload: UrgentAlertPayload): Promise<void> {
  if (Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('LocalNotifications')) {
    try {
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== 'granted') return;
      await ensureNativeChannel();
      await LocalNotifications.schedule({
        notifications: [
          {
            id: stableNumericId(payload.id),
            title: payload.title,
            body: payload.body,
            channelId: ANDROID_URGENT_CHANNEL_ID,
            smallIcon: 'ic_launcher',
            extra: {
              targetTab: payload.targetTab,
              alertId: payload.id,
            },
          },
        ],
      });
      return;
    } catch (err) {
      console.warn('Native local notification schedule warning:', err);
    }
  }

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    const options: NotificationOptions & { renotify?: boolean; vibrate?: number[] } = {
      body: payload.body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: payload.id,
      renotify: true,
      requireInteraction: payload.kind === 'urgent_request' || payload.kind === 'admin_urgent',
      vibrate: [240, 100, 240],
      data: { targetTab: payload.targetTab },
    };

    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && typeof reg.showNotification === 'function') {
          await reg.showNotification(payload.title, options);
          return;
        }
      }
    } catch {}

    try {
      const notif = new Notification(payload.title, options);
      notif.onclick = () => {
        try {
          window.focus();
          if (tapHandler) tapHandler(payload.targetTab);
          notif.close();
        } catch {}
      };
    } catch (err) {
      console.warn('Web Notification fallback warning:', err);
    }
  }
}

export async function dispatchUrgentAlert(payload: UrgentAlertPayload): Promise<void> {
  playUrgentAlertSound(payload.kind);
  triggerAlertVibration(payload.kind);
  await sendSystemAlertNotification(payload);
}
