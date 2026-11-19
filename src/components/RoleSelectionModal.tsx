import React from 'react';
import { Shield, ShieldCheck, User, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ALL_SUPERVISOR_LEVEL_LABELS } from '../services/supervisorService';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'user' | 'admin';
  onRoleChange: (role: 'user' | 'admin') => void;
  onOpenAdminAuth?: () => void;
  onOpenSupervisors?: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  onOpenSupervisors,
}) => {
  const { isOwner, isAuthorizedAdmin, adminLevel } = useAuth();
  if (!isOpen) return null;

  const selectRole = (role: 'user' | 'admin') => {
    if (role === 'admin' && !isAuthorizedAdmin) return;
    onRoleChange(role);
    onClose();
  };

  const levelLabel = adminLevel ? ALL_SUPERVISOR_LEVEL_LABELS[adminLevel] : 'غير معيّن';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 text-right font-['Cairo',sans-serif]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-600" />
          <h2 className="text-lg font-black">أدوار وصلاحيات التطبيق</h2>
        </div>

        <button
          onClick={() => selectRole('user')}
          className={`w-full text-right p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            currentRole === 'user' ? 'border-red-600 bg-red-50' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 font-black">
            <User className="w-5 h-5" /> دور المستخدم
          </div>
          <p className="text-xs text-slate-500 mt-1">البحث وتسجيل المتبرعين وطلبات الدم</p>
        </button>

        <button
          onClick={() => selectRole('admin')}
          disabled={!isAuthorizedAdmin}
          className={`w-full text-right p-4 rounded-2xl border-2 transition-all cursor-pointer disabled:opacity-50 ${
            currentRole === 'admin' && isAuthorizedAdmin
              ? 'border-amber-500 bg-amber-50'
              : 'border-amber-200 bg-amber-50/50'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-black text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              <span>لوحة المسؤول</span>
            </div>
            {isAuthorizedAdmin && (
              <span className="px-2 py-0.5 rounded-lg bg-amber-200/80 text-amber-950 text-[10px] font-black">
                {levelLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-amber-800 mt-1">
            {isAuthorizedAdmin
              ? 'تم التحقق من صلاحية حسابك وفق قاعدة البيانات'
              : 'الدخول لحساب المالك أو المشرف المعتمد فقط'}
          </p>
        </button>

        {isOwner && onOpenSupervisors && (
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSupervisors();
            }}
            className="w-full text-right p-3.5 rounded-2xl border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2 font-black text-xs">
              <Users className="w-4 h-4 text-amber-400" />
              <span>إدارة المشرفين</span>
            </div>
            <span className="text-[10px] font-black text-amber-300">المالك فقط</span>
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
        >
          إغلاق
        </button>
        <p className="text-[10px] text-slate-500 text-center">
          صلاحيات الإشراف تُتحقق في قواعد أمان Firebase ولا تُمنح عبر الواجهة وحدها.
        </p>
      </div>
    </div>
  );
};
