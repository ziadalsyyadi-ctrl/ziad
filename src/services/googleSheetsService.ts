import { Capacitor, CapacitorHttp } from '@capacitor/core';

/**
 * خدمة الربط بجدول بيانات Google (Google Sheets)
 * معرّف الجدول: 169L0-gWsPmSez8rXivSX5kt5p278Ry6ZJDU66AC42SY
 * اسم ورقة العمل: قائمة الأشخاص
 */

export const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: '169L0-gWsPmSez8rXivSX5kt5p278Ry6ZJDU66AC42SY',
  sheetName: 'قائمة الأشخاص',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbx3HihrveSRxxjWGEl60y4vNcCFcb8IPQH3YlkfvwqaGapESvj11BTvXNwke-O7L56v/exec',
};

export interface RegisterDonorPayload {
  name: string;
  bloodType: string;
  phone: string;
  address: string;
  notes?: string;
  donorId?: string;
}

export interface SheetsSyncResult {
  success: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
  data?: any;
}


/**
 * إرسال مباشر إلى Google Apps Script من تطبيق Android والويب.
 * text/plain يمنع طلب CORS التمهيدي، مع بقاء جسم الطلب JSON.
 */
async function postToGoogleAppsScript(payload: Record<string, any>): Promise<any> {
  const requestData = {
    spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
    sheetName: GOOGLE_SHEETS_CONFIG.sheetName,
    ...payload,
  };

  let data: any;

  if (Capacitor.isNativePlatform()) {
    // Android/iOS: use Capacitor's native HTTP stack first to avoid WebView CORS restrictions,
    // with a standard fetch fallback (text/plain) in case a 302 redirect returns HTML.
    try {
      const response = await CapacitorHttp.post({
        url: GOOGLE_SHEETS_CONFIG.appsScriptUrl,
        headers: { 'Content-Type': 'application/json' },
        data: requestData,
        connectTimeout: 20000,
        readTimeout: 30000,
        responseType: 'json',
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Google Apps Script returned HTTP ${response.status}.`);
      }
      data = response.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch (nativeErr) {
      const fallbackRes = await fetch(GOOGLE_SHEETS_CONFIG.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(requestData),
        redirect: 'follow',
      });
      const fallbackText = await fallbackRes.text();
      if (!fallbackRes.ok || fallbackText.includes('<!DOCTYPE html>')) {
        throw nativeErr instanceof Error ? nativeErr : new Error(`HTTP ${fallbackRes.status}`);
      }
      data = JSON.parse(fallbackText);
    }
  } else {
    // Web/PWA: use the same-origin server proxy to avoid browser CORS/redirect issues.
    const response = await fetch('/api/sheets/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    try {
      data = await response.json();
    } catch {
      throw new Error(`رد غير مفهوم من خادم المزامنة (HTTP ${response.status}).`);
    }
    if (!response.ok) {
      throw new Error(data?.error || `فشل خادم المزامنة (HTTP ${response.status}).`);
    }
  }

  if (!data || data.success !== true) {
    throw new Error(data?.error || data?.message || 'Google Apps Script لم يؤكد حفظ البيانات.');
  }
  return data;
}

const PENDING_SHEETS_DONOR_SYNC_KEY = 'qataba_pending_sheets_donor_sync_v1';

function readPendingSheetsDonorSyncs(): RegisterDonorPayload[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(PENDING_SHEETS_DONOR_SYNC_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function cancelPendingDonorSheetSync(donorId: string): void {
  try {
    const remaining = readPendingSheetsDonorSyncs().filter(item => item.donorId !== donorId);
    localStorage.setItem(PENDING_SHEETS_DONOR_SYNC_KEY, JSON.stringify(remaining));
  } catch {}
}

function queueSheetsDonorSync(payload: RegisterDonorPayload): void {
  try {
    const pending = readPendingSheetsDonorSyncs();
    const next = pending.filter(item => item.donorId !== payload.donorId);
    next.push(payload);
    localStorage.setItem(PENDING_SHEETS_DONOR_SYNC_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn('Could not persist pending Sheets donor sync:', error);
  }
}

/** Flush durable donor create/update operations after network restoration. */
export async function retryPendingDonorSheetSyncs(): Promise<number> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return 0;
  const pending = readPendingSheetsDonorSyncs();
  const remaining: RegisterDonorPayload[] = [];
  let completed = 0;
  for (const payload of pending) {
    try {
      await postToGoogleAppsScript({
        action: 'registerDonor',
        name: payload.name.trim(),
        bloodType: payload.bloodType.trim(),
        phone: payload.phone.trim(),
        address: payload.address.trim(),
        donorId: payload.donorId || '',
        createdAt: new Date().toISOString(),
      });
      completed++;
    } catch (error) {
      console.warn('Pending Sheets donor sync will be retried:', error);
      remaining.push(payload);
    }
  }
  try { localStorage.setItem(PENDING_SHEETS_DONOR_SYNC_KEY, JSON.stringify(remaining)); } catch {}
  return completed;
}

/**
 * إرسال بيانات المتبرع إلى جدول Google Sheets عبر خادم التطبيق وواجهة Apps Script
 * لا تعرض نجاحاً إلا عند تأكيد خادم Google حفظ البيانات فعلياً
 */
export async function syncDonorToGoogleSheets(
  payload: RegisterDonorPayload
): Promise<SheetsSyncResult> {
  try {
    const data = await postToGoogleAppsScript({
      action: 'registerDonor',
      name: payload.name.trim(),
      bloodType: payload.bloodType.trim(),
      phone: payload.phone.trim(),
      address: payload.address.trim(),
      donorId: payload.donorId || '',
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: data.message || 'تم تأكيد حفظ المتبرع في جدول Google Sheets بنجاح.',
      statusCode: 200,
      data,
    };
  } catch (clientErr: any) {
    queueSheetsDonorSync(payload);
    return {
      success: false,
      error: `تعذر الاتصال حالياً؛ تم حفظ طلب المزامنة محلياً وسيعاد إرساله عند عودة الإنترنت: ${clientErr.message}`,
      statusCode: 0,
    };
  }
}

/**
 * حذف سجل المتبرع فعلياً من Google Sheets عبر Apps Script.
 * يتم تمرير معرف السجل الأصلي دون بادئة العرض sheet_.
 */
export async function deleteDonorFromGoogleSheets(
  donorId: string,
  phone?: string
): Promise<SheetsSyncResult> {
  try {
    const rawId = String(donorId || '').replace(/^sheet_/, '').trim();
    // Older imported rows may not have a real donorId; row_N is only a UI
    // fallback and must never be sent as if it were the spreadsheet ID.
    const normalizedId = /^row_\d+$/i.test(rawId) ? '' : rawId;
    const normalizedPhone = String(phone || '').replace(/[^\d]/g, '');
    if (!normalizedId && !normalizedPhone) {
      return { success: false, error: 'معرف المتبرع أو رقم هاتفه مطلوب للحذف.' };
    }

    const data = await postToGoogleAppsScript({
      action: 'deleteDonor',
      donorId: normalizedId,
      phone: normalizedPhone,
    });

    if (data.deleted === false) {
      return {
        success: false,
        error: data.message || 'لم يعثر Google Sheets على سجل المتبرع لحذفه.',
        data,
      };
    }

    return {
      success: true,
      message: data.message || 'تم حذف المتبرع من Google Sheets.',
      statusCode: 200,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `فشل حذف المتبرع من Google Sheets: ${err.message}`,
      statusCode: 0,
    };
  }
}

function normalizeAppsScriptDonor(d: any, idx: number) {
  const rawPhone = d?.phone !== undefined && d?.phone !== null ? String(d.phone).trim() : '';
  return {
    ...d,
    donorId: String(d?.donorId || d?.id || `sheet_${idx + 1}`).trim(),
    fullName: String(d?.fullName || d?.name || '').trim(),
    bloodType: String(d?.bloodType || 'O+').trim().toUpperCase(),
    phone: rawPhone,
    residence: String(d?.residence || d?.address || 'قعطبة').trim(),
    createdAt: d?.createdAt ? String(d.createdAt).trim() : '',
    source: 'google_sheets' as const,
  };
}

/**
 * البحث عن المتبرعين في جدول Google Sheets
 */
export async function searchDonorsFromSheets(
  bloodType: string
): Promise<SheetsSyncResult> {
  try {
    const data = await postToGoogleAppsScript({
      action: 'searchDonors',
      bloodType,
    });

    const rawList = Array.isArray(data.donors) ? data.donors : Array.isArray(data) ? data : [];
    return {
      success: true,
      data: rawList.map((d: any, idx: number) => normalizeAppsScriptDonor(d, idx)),
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      success: false,
      error: `خطأ في الاتصال: ${err.message}`,
      statusCode: 0,
    };
  }
}

/**
 * تفكيك وتحليل نص أسطر CSV القادمة من جدول بيانات غوغل بدقة
 */
export function parseGoogleSheetsCsv(csvText: string): any[] {
  if (!csvText || typeof csvText !== 'string') return [];
  const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 1) return [];

  const headerCols = parseCsvLine(lines[0]).map(h => h.trim());
  let nameIdx = headerCols.findIndex(h => (h.includes('اسم') || h.toLowerCase().includes('name')) && !h.toLowerCase().includes('donor'));
  let bloodIdx = headerCols.findIndex(h => h.includes('فصيلة') || h.includes('دم') || h.toLowerCase().includes('blood'));
  let phoneIdx = headerCols.findIndex(h => h.includes('هاتف') || h.includes('رقم') || h.toLowerCase().includes('phone') || h.includes('جوال'));
  let residenceIdx = headerCols.findIndex(h => h.includes('سكن') || h.includes('عنوان') || h.toLowerCase().includes('address') || h.toLowerCase().includes('residence'));
  let notesIdx = headerCols.findIndex(h => h.includes('ملاحظ') || h.toLowerCase().includes('note'));
  let dateIdx = headerCols.findIndex(h => h.includes('تاريخ') || h.toLowerCase().includes('date') || h.toLowerCase().includes('createdat') || h.toLowerCase().includes('created_at'));
  let idIdx = headerCols.findIndex(h => h.toLowerCase().includes('donorid') || h.toLowerCase().includes('id'));

  if (nameIdx === -1) nameIdx = 1;
  if (bloodIdx === -1) bloodIdx = 2;
  if (phoneIdx === -1) phoneIdx = 3;
  if (residenceIdx === -1) residenceIdx = 4;
  if (idIdx === -1) idIdx = 0;

  const hasHeader = lines[0].includes('اسم') || lines[0].includes('name') || lines[0].includes('donorId');
  const startIndex = hasHeader ? 1 : 0;

  const donors: any[] = [];
  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const sheetId = idIdx >= 0 ? cols[idIdx] : '';
    const name = (cols[nameIdx] || '').trim();
    const rawBlood = (cols[bloodIdx] || 'O+').replace(/[^ABO+-]/gi, '').trim().toUpperCase();
    const blood = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].includes(rawBlood) ? rawBlood : 'O+';
    const phone = (cols[phoneIdx] || '').trim();
    const residence = (cols[residenceIdx] || 'قعطبة').trim();
    const notes = notesIdx >= 0 ? (cols[notesIdx] || '').trim() : '';
    const date = dateIdx >= 0 ? (cols[dateIdx] || '').trim() : '';

    if (name && name.length >= 2) {
      donors.push({
        fullName: name,
        bloodType: blood,
        phone: phone,
        residence: residence || 'قعطبة',
        notes: notes || 'من سجل جدول غوغل',
        createdAt: date,
        source: 'google_sheets',
        donorId: sheetId || `row_${i}`
      });
    }
  }

  return donors;
}

/**
 * جلب قائمة المتبرعين من جدول Google Sheets لمزامنتها في التطبيق
 * يدعم العمل في بيئة الويب وتطبيق Android APK مع مسار CapacitorHttp الأصلي ومسار CSV المباشر
 */
export async function fetchDonorsFromGoogleSheets(): Promise<{
  success: boolean;
  donors?: any[];
  count?: number;
  error?: string;
  source?: string;
}> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      success: false,
      error: 'الجهاز غير متصل بالإنترنت حالياً',
      donors: [],
    };
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(GOOGLE_SHEETS_CONFIG.sheetName)}`;

  // محاولة 1 (في بيئة الويب فقط): عبر واجهة الخادم السريعة
  if (!Capacitor.isNativePlatform()) {
    try {
      const res = await fetch('/api/sheets/donors', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.donors) && data.donors.length > 0) {
          return {
            success: true,
            donors: data.donors,
            count: data.donors.length,
            source: data.source || 'proxy'
          };
        }
      }
    } catch {
      // المتابعة إلى الجلب المباشر
    }
  } else {
    // محاولة 1 (في تطبيق Android/iOS): استخدام CapacitorHttp الأصلي لتجاوز قيود WebView CORS والكاش
    try {
      const nativeRes = await CapacitorHttp.get({
        url: csvUrl,
        connectTimeout: 15000,
        readTimeout: 20000,
        responseType: 'text',
      });
      const text = typeof nativeRes.data === 'string' ? nativeRes.data : String(nativeRes.data || '');
      if (nativeRes.status >= 200 && nativeRes.status < 300 && !text.includes('<!DOCTYPE html>') && text.length > 50) {
        const parsed = parseGoogleSheetsCsv(text);
        if (parsed.length > 0) {
          return {
            success: true,
            donors: parsed,
            count: parsed.length,
            source: 'capacitor_csv_direct',
          };
        }
      }
    } catch (nativeCsvErr: any) {
      console.warn('CapacitorHttp CSV fetch warning:', nativeCsvErr);
    }
  }

  // محاولة 2: الاتصال المباشر برابط تصدير CSV لجدول غوغل
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 15000) : null;
    const res = await fetch(csvUrl, {
      cache: 'no-store',
      ...(controller ? { signal: controller.signal } : {}),
    });
    if (timeoutId) clearTimeout(timeoutId);
    if (res.ok) {
      const text = await res.text();
      if (!text.includes('<!DOCTYPE html>') && text.length > 50) {
        const parsed = parseGoogleSheetsCsv(text);
        if (parsed.length > 0) {
          return {
            success: true,
            donors: parsed,
            count: parsed.length,
            source: 'csv_direct'
          };
        }
      }
    }
  } catch (directErr: any) {
    console.warn('Direct CSV fetch warning:', directErr);
  }

  // محاولة 3: الاتصال المباشر عبر Google Apps Script (POST searchDonors)
  try {
    const data = await postToGoogleAppsScript({
      action: 'searchDonors',
      bloodType: '',
    });
    const list = Array.isArray(data?.donors) ? data.donors : [];
    if (list.length > 0) {
      const normalized = list
        .map((d: any, idx: number) => normalizeAppsScriptDonor(d, idx))
        .filter((d: any) => d.fullName && d.fullName.length >= 2);
      return {
        success: true,
        donors: normalized,
        count: normalized.length,
        source: 'apps_script',
      };
    }
  } catch (scriptErr: any) {
    console.warn('Direct Apps Script fetch warning:', scriptErr);
  }

  return {
    success: false,
    error: 'تعذر جلب بيانات الشيت عبر الخادم أو الرابط المباشر أو Apps Script',
    donors: []
  };
}

/**
 * إرسال نص صفوف منسوخة من جدول البيانات أو ملف CSV للمزامنة المباشرة
 */
export async function importRawDonors(textData: string): Promise<{
  success: boolean;
  donors?: any[];
  count?: number;
  error?: string;
}> {
  try {
    const res = await fetch('/api/sheets/import-raw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textData }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: `فشل استيراد البيانات: ${err.message}`,
    };
  }
}
/**
 * إرسال قائمة كاملة من المتبرعين إلى جدول Google Sheets للمزامنة الشاملة
 * يستخدم هذا الخيار لمزامنة كافة بيانات التطبيق مع الجدول دفعة واحدة
 */
export async function pushAllDonorsToSheets(
  donors: any[]
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const data = await postToGoogleAppsScript({
      action: 'batchRegister',
      donors: donors.map(d => ({
        name: d.fullName || d.name,
        bloodType: d.bloodType,
        phone: d.phone,
        address: d.residence || d.address || 'قعطبة',
        donorId: d.id || d.donorId || '',
        createdAt: d.createdAt || new Date().toISOString(),
      })),
    });
    const count = Number(data.count);
    const processedCount = Number(data.added || 0) + Number(data.updated || 0);
    return {
      success: true,
      count: Number.isFinite(count) && count > 0 ? count : processedCount,
    };
  } catch (err: any) {
    return {
      success: false,
      count: 0,
      error: `فشل المزامنة الشاملة: ${err.message}`
    };
  }
}
