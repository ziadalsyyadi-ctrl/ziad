import React from 'react';
import { LogOut, X } from 'lucide-react';

interface AppExitConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const AppExitConfirmModal: React.FC<AppExitConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-exit-confirm-title"
      className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif]"
      dir="rtl"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-3xl max-w-xs w-full p-6 shadow-2xl border border-slate-100 space-y-5 text-center relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="إلغاء"
          className="absolute top-3.5 left-3.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner border border-red-100">
          <LogOut className="w-8 h-8 rotate-180" />
        </div>

        <div className="space-y-1.5">
          <h2
            id="app-exit-confirm-title"
            className="text-lg font-black text-slate-900 leading-snug"
          >
            هل تريد الخروج من التطبيق؟
          </h2>
          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            سيتم إغلاق تطبيق بنك الدم – قعطبة عند التأكيد.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            data-testid="app-exit-confirm-yes"
            onClick={onConfirm}
            className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 rotate-180" />
            <span>نعم، خروج</span>
          </button>

          <button
            type="button"
            data-testid="app-exit-confirm-cancel"
            onClick={onCancel}
            className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-all active:scale-95 cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};
