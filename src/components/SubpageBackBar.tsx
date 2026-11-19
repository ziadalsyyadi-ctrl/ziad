import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SubpageBackBarProps {
  title: string;
  onBack: () => void;
}

export const SubpageBackBar: React.FC<SubpageBackBarProps> = ({ title, onBack }) => {
  return (
    <div
      className="flex items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl px-3 py-2 shadow-2xs"
      dir="rtl"
    >
      <button
        type="button"
        data-testid="inapp-back-button"
        onClick={onBack}
        className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-700 font-black text-xs sm:text-sm flex items-center gap-2 transition-colors active:scale-95 cursor-pointer shrink-0"
      >
        <ArrowRight className="w-4 h-4 shrink-0" />
        <span className="whitespace-nowrap">العودة للرئيسية</span>
      </button>

      <span className="text-xs sm:text-sm font-extrabold text-slate-600 truncate">
        {title}
      </span>
    </div>
  );
};
