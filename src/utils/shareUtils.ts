import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

/**
 * The permanent official distribution link for Bank AlDam Qataba.
 * This is used as the primary link for sharing.
 */
export const PERMANENT_APP_LINK = 'https://play.google.com/store/apps/details?id=com.qatrahayat.app';

/**
 * Gets the official distribution link for the app.
 */
export const getAppLink = (): string => {
  // Use the permanent link defined above as the primary choice
  if (PERMANENT_APP_LINK) {
    return PERMANENT_APP_LINK;
  }

  // Fallback to environment variable (useful for web previews)
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL;
  }

  // Final fallback to current origin if not localhost
  const origin = window.location.origin;
  if (origin && !origin.includes('localhost') && !origin.includes('capacitor://')) {
    return origin;
  }

  return 'https://play.google.com/store/apps/details?id=com.qatrahayat.app';
};

interface ShareOptions {
  title: string;
  text: string;
  url?: string;
}

/**
 * Unified sharing function that uses Capacitor native share if available,
 * otherwise falls back to Web Share API or Clipboard.
 */
export const shareData = async (options: ShareOptions): Promise<void> => {
  const shareUrl = options.url || getAppLink();
  
  // Clean up text to remove localhost if it accidentally sneaked in
  const cleanText = options.text.replace(/http:\/\/localhost:\d+/g, shareUrl);

  try {
    if (Capacitor.isNativePlatform()) {
      await Share.share({
        title: options.title,
        text: cleanText,
        url: shareUrl,
        dialogTitle: 'مشاركة عبر...',
      });
    } else if (navigator.share) {
      await navigator.share({
        title: options.title,
        text: cleanText,
        url: shareUrl,
      });
    } else {
      // Fallback for browsers that don't support sharing
      const fullContent = `${options.title}\n\n${cleanText}\n\n${shareUrl}`;
      await navigator.clipboard.writeText(fullContent);
      alert('تم نسخ تفاصيل المشاركة مع رابط التطبيق بنجاح!');
    }
  } catch (error) {
    console.error('Sharing failed:', error);
  }
};
