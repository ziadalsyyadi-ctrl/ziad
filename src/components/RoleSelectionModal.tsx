import React from 'react';
import { Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'user' | 'admin';
  onRoleChange: (role: 'user' | 'admin') => void;
  onOpenAdminAuth?: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen, onClose, currentRole, onRoleChange,
}) => {
  const { userProfile, currentUser } = useAuth();
  if (!isOpen) return null;

  const isAuthorizedAdmin =
    userProfile?.role === 'admin' ||
    currentUser?.email === 'ziadalsyyadi@gmail.com' ||
    currentUser?.email === 'user_967773633918_v1@qataba-blood.app';

  const selectRole = (role: 'user' | 'admin') => {
    if (role === 'admin' && !isAuthorizedAdmin) return;
    onRoleChange(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65"
      onClick={onClose}>
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 text-right"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-600" />
          <h2 className="text-lg font-black">أدوار وصلاحيات التطبيق</h2>
        </div>
        <button onClick={() => selectRole('user')}
          className={`w-full text-right p-4 rounded-2xl border-2 ${currentRole === 'user' ? 'border-red-600 bg-red-50' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 font-black"><User className="w-5 h-5" /> دور المستخدم</div>
          <p className="text-xs text-slate-500 mt-1">البحث وتسجيل المتبرعين وطلبات الدم</p>
        </button>
        <button onClick={() => selectRole('admin')} disabled={!isAuthorizedAdmin}
          className="w-full text-right p-4 rounded-2xl border-2 border-amber-300 bg-amber-50 disabled:opacity-50">
          <div className="font-black text-amber-900">لوحة المسؤول</div>
          <p className="text-xs text-amber-800 mt-1">
            {isAuthorizedAdmin ? 'تم التحقق من صلاحية حسابك' : 'الدخول لحساب المسؤول المعتمد فقط بعد تسجيل الدخول'}
          </p>
        </button>
        <button onClick={onClose} className="w-full py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">إغلاق</button>
        <p className="text-[10px] text-slate-500 text-center">صلاحيات المسؤول تُحدد من الحساب وقاعدة البيانات، وليس برمز داخل التطبيق.</p>
      </div>
    </div>
  );
};
