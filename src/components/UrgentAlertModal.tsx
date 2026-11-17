import React from 'react';
import {
  AlertTriangle,
  BellRing,
  Droplet,
  Hospital,
  Megaphone,
  MessageSquare,
  Phone,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { UrgentAlertPayload } from '../services/notificationService';

interface UrgentAlertModalProps {
  alerts: UrgentAlertPayload[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onDismissCurrent: () => void;
  onDismissAll: () => void;
  onNavigateTarget: (targetTab: 'urgent' | 'notifications' | 'chat') => void;
}

export const UrgentAlertModal: React.FC<UrgentAlertModalProps> = ({
  alerts,
  soundEnabled,
  onToggleSound,
  onDismissCurrent,
  onDismissAll,
  onNavigateTarget,
}) => {
  if (!alerts || alerts.length === 0) return null;

  const current = alerts[0];
  const isReply = current.kind === 'admin_reply';
  const isAdminUrgent = current.kind === 'admin_urgent' || current.kind === 'admin_notice';

  const headerGradient = isReply
    ? 'from-emerald-600 via-teal-600 to-emerald-700'
    : isAdminUrgent
    ? 'from-amber-600 via-rose-600 to-red-700'
    : 'from-red-600 via-rose-600 to-red-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 font-['Cairo',sans-serif]">
      <div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border-2 border-red-300 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsing Alert Header */}
        <div className={`bg-linear-to-r ${headerGradient} px-5 py-4 text-white flex items-center justify-between gap-2`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shadow-inner animate-pulse shrink-0">
              {isReply ? (
                <MessageSquare className="w-6 h-6 text-white" />
              ) : isAdminUrgent ? (
                <Megaphone className="w-6 h-6 text-white" />
              ) : (
                <BellRing className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-white text-red-700 px-2 py-0.5 rounded-full">
                  {isReply ? 'رسالة من الإدارة' : isAdminUrgent ? 'إشعار رسمي عاجل' : 'نداء دم عاجل'}
                </span>
                {alerts.length > 1 && (
                  <span className="text-[10px] font-black bg-black/25 text-white px-2 py-0.5 rounded-full">
                    1 من {alerts.length}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-black text-white mt-1 leading-snug">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? 'كتم صوت التنبيهات' : 'تفعيل صوت التنبيهات'}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onDismissCurrent}
              title="إغلاق التنبيه"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {current.kind === 'urgent_request' ? (
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                    <Droplet className="w-3.5 h-3.5 fill-white" />
                    <span dir="ltr">{current.bloodType || 'O+'}</span>
                  </span>
                  {current.unitsNeeded && (
                    <span className="text-xs font-black text-red-800 bg-red-100 px-2.5 py-1 rounded-xl">
                      {current.unitsNeeded} أكياس دم
                    </span>
                  )}
                </div>
                <AlertTriangle className="w-5 h-5 text-red-600 animate-bounce shrink-0" />
              </div>

              <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed">
                {current.body}
              </p>

              {current.hospital && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white p-2 rounded-xl border border-rose-100">
                  <Hospital className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{current.hospital}</span>
                </div>
              )}

              {current.contactPhone && (
                <a
                  href={`tel:${current.contactPhone}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    اتصال فوري بـ {current.contactName || 'المرافق'} ({current.contactPhone})
                  </span>
                </a>
              )}
            </div>
          ) : (
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 space-y-2">
              <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed whitespace-pre-line">
                {current.body}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                const target = current.targetTab;
                onDismissCurrent();
                onNavigateTarget(target);
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md shadow-red-200 transition-all active:scale-98 cursor-pointer"
            >
              {isReply
                ? 'فتح المحادثة مع المسؤول'
                : isAdminUrgent
                ? 'عرض تفاصيل التعميم'
                : 'عرض كل الطلبات العاجلة'}
            </button>

            <button
              type="button"
              onClick={alerts.length > 1 ? onDismissAll : onDismissCurrent}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {alerts.length > 1 ? `تجاهل الكل (${alerts.length})` : 'حسناً، تم الاطلاع'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
