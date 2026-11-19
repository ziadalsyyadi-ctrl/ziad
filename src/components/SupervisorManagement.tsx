import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Edit3,
  History,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Power,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  AdminAuditLog,
  SupervisorLevel,
  SupervisorPermissions,
  SupervisorRecord,
} from '../types';
import {
  ALL_SUPERVISOR_LEVEL_LABELS,
  PERMISSION_LABELS,
  ResolvedSupervisorCandidate,
  SUPERVISOR_LEVEL_META,
  resolveExistingUserForSupervisor,
  revokeAndDeleteSupervisor,
  sanitizeSupervisorPermissions,
  saveSupervisorAssignment,
  subscribeToAdminAuditLogs,
  subscribeToAllSupervisors,
  toggleSupervisorActive,
} from '../services/supervisorService';
import { useRegisterBackHandler } from '../utils/backNavigation';

interface SupervisorManagementProps {
  onBackToAdmin?: () => void;
}

const LEVELS_ORDER: SupervisorLevel[] = [
  'donor_admin',
  'urgent_admin',
  'support_admin',
  'general_admin',
];

function formatAuditDate(ts: any): string {
  try {
    const date =
      typeof ts?.toDate === 'function'
        ? ts.toDate()
        : ts instanceof Date
        ? ts
        : null;
    if (!date) return 'الآن';
    return new Intl.DateTimeFormat('ar-YE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return '—';
  }
}

function getLevelBadgeStyle(level: SupervisorLevel): string {
  switch (level) {
    case 'donor_admin':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'urgent_admin':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'support_admin':
      return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'general_admin':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  }
}

export const SupervisorManagement: React.FC<SupervisorManagementProps> = ({
  onBackToAdmin,
}) => {
  const { currentUser, userProfile, isOwner } = useAuth();

  const [subTab, setSubTab] = useState<'list' | 'audit'>('list');
  const [supervisors, setSupervisors] = useState<SupervisorRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingAudit, setLoadingAudit] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<SupervisorLevel | 'ALL'>('ALL');
  const [auditSearch, setAuditSearch] = useState('');

  // Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [identifierInput, setIdentifierInput] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [resolvedCandidate, setResolvedCandidate] =
    useState<ResolvedSupervisorCandidate | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<SupervisorLevel>('donor_admin');
  const [selectedPerms, setSelectedPerms] = useState<SupervisorPermissions>(
    SUPERVISOR_LEVEL_META.donor_admin.defaultPermissions
  );
  const [formActive, setFormActive] = useState(true);
  const [formNotes, setFormNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal State
  const [editingSupervisor, setEditingSupervisor] =
    useState<SupervisorRecord | null>(null);

  // Delete Confirm Modal State
  const [deleteTarget, setDeleteTarget] = useState<SupervisorRecord | null>(null);
  const [busyUid, setBusyUid] = useState<string | null>(null);

  useRegisterBackHandler(showAddModal, () => {
    if (!submitting) {
      setShowAddModal(false);
    }
  });
  useRegisterBackHandler(Boolean(editingSupervisor), () => {
    if (!submitting) {
      setEditingSupervisor(null);
    }
  });
  useRegisterBackHandler(Boolean(deleteTarget), () => {
    if (!busyUid) {
      setDeleteTarget(null);
    }
  });

  useEffect(() => {
    if (!isOwner) return;

    setLoadingList(true);
    const unsubSups = subscribeToAllSupervisors(
      (items) => {
        setSupervisors(items);
        setLoadingList(false);
      },
      (err: any) => {
        console.warn('Could not subscribe to supervisors:', err);
        setLoadingList(false);
        setErrorMsg('تعذر تحميل قائمة المشرفين. تحقق من الاتصال وصلاحيات المالك.');
      }
    );

    setLoadingAudit(true);
    const unsubAudit = subscribeToAdminAuditLogs(
      (logs) => {
        setAuditLogs(logs);
        setLoadingAudit(false);
      },
      (err: any) => {
        console.warn('Could not subscribe to audit logs:', err);
        setLoadingAudit(false);
      }
    );

    return () => {
      unsubSups();
      unsubAudit();
    };
  }, [isOwner]);

  const showToast = (msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 4500);
  };

  const filteredSupervisors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return supervisors.filter((s) => {
      if (levelFilter !== 'ALL' && s.level !== levelFilter) return false;
      if (!q) return true;
      return (
        s.displayName.toLowerCase().includes(q) ||
        (s.phone || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q) ||
        SUPERVISOR_LEVEL_META[s.level].label.toLowerCase().includes(q)
      );
    });
  }, [supervisors, searchQuery, levelFilter]);

  const filteredAuditLogs = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    if (!q) return auditLogs;
    return auditLogs.filter(
      (log) =>
        log.actorName.toLowerCase().includes(q) ||
        log.actionType.toLowerCase().includes(q) ||
        (log.targetLabel || '').toLowerCase().includes(q) ||
        (log.details || '').toLowerCase().includes(q)
    );
  }, [auditLogs, auditSearch]);

  if (!isOwner || !currentUser) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center space-y-4 max-w-lg mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-black text-slate-900">صلاحية مقصورة على المالك فقط</h2>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          صفحة «إدارة المشرفين» ومراجعة سجل العمليات الإدارية متاحة فقط لحساب المالك الأساسي للتطبيق، ولا يمكن لأي مشرف الوصول إليها أو تعديلها.
        </p>
      </div>
    );
  }

  const actorName = userProfile?.displayName || currentUser.displayName || 'المالك';

  const openAddModal = () => {
    setIdentifierInput('');
    setLookupError(null);
    setResolvedCandidate(null);
    setSelectedLevel('donor_admin');
    setSelectedPerms({ ...SUPERVISOR_LEVEL_META.donor_admin.defaultPermissions });
    setFormActive(true);
    setFormNotes('');
    setShowAddModal(true);
  };

  const openEditModal = (sup: SupervisorRecord) => {
    setEditingSupervisor(sup);
    setSelectedLevel(sup.level);
    setSelectedPerms(sanitizeSupervisorPermissions(sup.permissions));
    setFormActive(sup.isActive);
    setFormNotes(sup.notes || '');
  };

  const handleLevelChange = (level: SupervisorLevel) => {
    setSelectedLevel(level);
    setSelectedPerms({ ...SUPERVISOR_LEVEL_META[level].defaultPermissions });
  };

  const togglePermissionKey = (
    key: keyof Omit<SupervisorPermissions, 'manageSupervisors'>
  ) => {
    setSelectedPerms((prev) => ({
      ...prev,
      [key]: !prev[key],
      manageSupervisors: false,
    }));
  };

  const handleLookupExistingUser = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupError(null);
    setResolvedCandidate(null);
    setLookupLoading(true);
    try {
      const candidate = await resolveExistingUserForSupervisor(identifierInput);
      setResolvedCandidate(candidate);
    } catch (err: any) {
      setLookupError(err.message || 'تعذر العثور على الحساب.');
    } finally {
      setLookupLoading(false);
    }
  };

  const handleConfirmAddSupervisor = async () => {
    if (!resolvedCandidate) {
      setLookupError('ابحث أولاً عن حساب موجود برقم الهاتف أو البريد الإلكتروني.');
      return;
    }

    const hasAnyPermission = PERMISSION_LABELS.some((p) => selectedPerms[p.key]);
    if (!hasAnyPermission) {
      setLookupError('حدد صلاحية واحدة على الأقل للمشرف.');
      return;
    }

    setSubmitting(true);
    setLookupError(null);
    try {
      await saveSupervisorAssignment({
        target: resolvedCandidate,
        level: selectedLevel,
        permissions: selectedPerms,
        isActive: formActive,
        notes: formNotes,
        actorUid: currentUser.uid,
        actorName,
      });
      setShowAddModal(false);
      showToast(`تم تعيين «${resolvedCandidate.displayName}» كـ ${SUPERVISOR_LEVEL_META[selectedLevel].label} بنجاح.`);
    } catch (err: any) {
      setLookupError(err.message || 'حدث خطأ أثناء حفظ صلاحيات المشرف.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmEditSupervisor = async () => {
    if (!editingSupervisor) return;
    const hasAnyPermission = PERMISSION_LABELS.some((p) => selectedPerms[p.key]);
    if (!hasAnyPermission) {
      setErrorMsg('حدد صلاحية واحدة على الأقل للمشرف.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      await saveSupervisorAssignment({
        target: {
          uid: editingSupervisor.uid,
          displayName: editingSupervisor.displayName,
          phone: editingSupervisor.phone || '',
          email: editingSupervisor.email || '',
          existingSupervisor: true,
        },
        level: selectedLevel,
        permissions: selectedPerms,
        isActive: formActive,
        notes: formNotes,
        actorUid: currentUser.uid,
        actorName,
      });
      const updatedName = editingSupervisor.displayName;
      setEditingSupervisor(null);
      showToast(`تم تحديث صلاحيات «${updatedName}» بنجاح.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'فشل تحديث صلاحيات المشرف.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (sup: SupervisorRecord) => {
    setBusyUid(sup.uid);
    setErrorMsg(null);
    try {
      await toggleSupervisorActive({
        supervisor: sup,
        nextActive: !sup.isActive,
        actorUid: currentUser.uid,
        actorName,
      });
      showToast(
        !sup.isActive
          ? `تم تفعيل حساب المشرف «${sup.displayName}».`
          : `تم تعطيل حساب المشرف «${sup.displayName}» فوراً.`
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'تعذر تغيير حالة المشرف.');
    } finally {
      setBusyUid(null);
    }
  };

  const handleConfirmDeleteSupervisor = async () => {
    if (!deleteTarget) return;
    setBusyUid(deleteTarget.uid);
    setErrorMsg(null);
    try {
      await revokeAndDeleteSupervisor({
        supervisor: deleteTarget,
        actorUid: currentUser.uid,
        actorName,
      });
      const deletedName = deleteTarget.displayName;
      setDeleteTarget(null);
      showToast(`تم إلغاء الإشراف وحذف تعيين «${deletedName}».`);
    } catch (err: any) {
      setErrorMsg(err.message || 'تعذر حذف تعيين المشرف.');
    } finally {
      setBusyUid(null);
    }
  };

  const activeCount = supervisors.filter((s) => s.isActive).length;
  const disabledCount = supervisors.length - activeCount;

  return (
    <div className="space-y-4 text-right font-['Cairo',sans-serif]">
      {/* Top Banner */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 text-white shadow-lg border border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-black">إدارة المشرفين والصلاحيات</h2>
                <span className="px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-200 border border-amber-400/30 text-[10px] font-black">
                  المالك فقط
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                ربط الإشراف بالحسابات المسجلة مسبقاً، ضبط مستويات الصلاحيات، ومراقبة سجل العمليات الإدارية محمياً بقواعد Firestore.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {onBackToAdmin && (
              <button
                type="button"
                onClick={onBackToAdmin}
                className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black transition-colors cursor-pointer"
              >
                لوحة التحكم
              </button>
            )}
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>إضافة مشرف</span>
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[10px] text-slate-300 font-bold block">إجمالي المشرفين</span>
            <span className="text-lg font-black">{supervisors.length}</span>
          </div>
          <div className="bg-emerald-500/15 rounded-2xl p-3 border border-emerald-400/20">
            <span className="text-[10px] text-emerald-200 font-bold block">حسابات مفعّلة</span>
            <span className="text-lg font-black text-emerald-300">{activeCount}</span>
          </div>
          <div className="bg-rose-500/15 rounded-2xl p-3 border border-rose-400/20">
            <span className="text-[10px] text-rose-200 font-bold block">حسابات معطّلة</span>
            <span className="text-lg font-black text-rose-300">{disabledCount}</span>
          </div>
        </div>
      </div>

      {statusToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{statusToast}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sub Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setSubTab('list')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            subTab === 'list'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>المشرفون الحاليون ({supervisors.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setSubTab('audit')}
          className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            subTab === 'audit'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <History className="w-4 h-4" />
          <span>سجل العمليات الإدارية ({auditLogs.length})</span>
        </button>
      </div>

      {subTab === 'list' ? (
        <div className="space-y-3">
          {/* Search & Level Filter */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مشرف بالاسم، رقم الهاتف، أو البريد الإلكتروني..."
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-slate-900/15"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setLevelFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-colors cursor-pointer ${
                  levelFilter === 'ALL'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                الكل
              </button>
              {LEVELS_ORDER.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black border transition-colors cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {SUPERVISOR_LEVEL_META[lvl].label}
                </button>
              ))}
            </div>
          </div>

          {/* Supervisors List */}
          {loadingList ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">جارٍ تحميل قائمة المشرفين...</p>
            </div>
          ) : filteredSupervisors.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-800">
                  {supervisors.length === 0
                    ? 'لا يوجد مشرفون مضافون حالياً'
                    : 'لا توجد نتائج مطابقة للبحث'}
                </p>
                <p className="text-xs text-slate-500">
                  اضغط على «إضافة مشرف» لتربط الإشراف بحساب مستخدم مسجل مسبقاً في التطبيق.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSupervisors.map((sup) => {
                const grantedPerms = PERMISSION_LABELS.filter((p) => sup.permissions[p.key]);
                const isBusy = busyUid === sup.uid;

                return (
                  <div
                    key={sup.uid}
                    className={`bg-white rounded-3xl p-4 sm:p-5 border transition-all shadow-2xs space-y-3.5 ${
                      sup.isActive ? 'border-slate-200' : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            {sup.displayName}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black border ${getLevelBadgeStyle(
                              sup.level
                            )}`}
                          >
                            {SUPERVISOR_LEVEL_META[sup.level].label}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${
                              sup.isActive
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-100 text-rose-700 border-rose-200'
                            }`}
                          >
                            {sup.isActive ? 'مفعّل' : 'معطّل'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500">
                          {sup.phone && (
                            <span className="flex items-center gap-1 font-mono" dir="ltr">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {sup.phone}
                            </span>
                          )}
                          {sup.email && (
                            <span className="flex items-center gap-1 font-mono" dir="ltr">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              {sup.email}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(sup)}
                          disabled={isBusy}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-black flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل الصلاحيات</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleActive(sup)}
                          disabled={isBusy}
                          className={`px-3 py-2 rounded-xl text-[11px] font-black flex items-center gap-1.5 border transition-colors cursor-pointer disabled:opacity-50 ${
                            sup.isActive
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{sup.isActive ? 'تعطيل' : 'تفعيل'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(sup)}
                          disabled={isBusy}
                          className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-black flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إلغاء وحذف</span>
                        </button>
                      </div>
                    </div>

                    {/* Granted Permissions Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {grantedPerms.map((p) => (
                        <span
                          key={p.key}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          {p.label}
                        </span>
                      ))}
                    </div>

                    {sup.notes && (
                      <p className="text-[11px] text-slate-500 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                        ملاحظة: {sup.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Admin Audit Logs Tab */
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="تصفية سجل العمليات باسم المنفذ أو نوع العملية أو الهدف..."
                className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-slate-900/15"
              />
            </div>
          </div>

          {loadingAudit ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
              <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">جارٍ تحميل السجل الإداري...</p>
            </div>
          ) : filteredAuditLogs.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-300 text-center space-y-2">
              <History className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-500">لا توجد عمليات مسجلة بعد.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Activity className="w-4 h-4 text-slate-700 shrink-0" />
                      <span className="text-xs font-black text-slate-900">
                        {log.actionType}
                      </span>
                      {log.targetLabel && (
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                          ← {log.targetLabel}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatAuditDate(log.createdAt)}
                    </span>
                  </div>

                  {log.details && (
                    <p className="text-[11px] text-slate-600 leading-relaxed">{log.details}</p>
                  )}

                  <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-slate-500">
                    <span>المنفذ: <strong className="text-slate-800">{log.actorName}</strong></span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ALL_SUPERVISOR_LEVEL_LABELS[log.actorLevel] || log.actorLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Supervisor Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right overflow-y-auto"
          onClick={() => !submitting && setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">إضافة مشرف جديد</h3>
                  <p className="text-[11px] text-slate-500 font-bold">
                    ربط الإشراف بحساب موجود في Firebase دون إنشاء حساب أو تغيير كلمة المرور
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !submitting && setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Lookup Existing Account */}
            <form onSubmit={handleLookupExistingUser} className="space-y-2">
              <label className="block text-xs font-black text-slate-800">
                رقم هاتف المستخدم أو بريده الإلكتروني:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={identifierInput}
                  onChange={(e) => {
                    setIdentifierInput(e.target.value);
                    setResolvedCandidate(null);
                    setLookupError(null);
                  }}
                  placeholder="مثال: 771234567 أو name@gmail.com"
                  className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden focus:ring-2 focus:ring-amber-500"
                  dir="ltr"
                  required
                />
                <button
                  type="submit"
                  disabled={lookupLoading || !identifierInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  {lookupLoading ? 'جارٍ البحث...' : 'بحث عن الحساب'}
                </button>
              </div>
            </form>

            {lookupError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{lookupError}</span>
              </div>
            )}

            {resolvedCandidate && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-black text-xs">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>تم العثور على الحساب: {resolvedCandidate.displayName}</span>
                  </div>
                  {resolvedCandidate.existingSupervisor && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      معيّن سابقاً (سيتم التحديث)
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 text-[11px] font-bold text-emerald-800">
                  {resolvedCandidate.phone && (
                    <span dir="ltr">📞 {resolvedCandidate.phone}</span>
                  )}
                  {resolvedCandidate.email && (
                    <span dir="ltr">✉ {resolvedCandidate.email}</span>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Supervision Level */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">
                مستوى الإشراف:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LEVELS_ORDER.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleLevelChange(lvl)}
                    className={`p-3 rounded-2xl border-2 text-right transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'border-amber-500 bg-amber-50/70'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-black text-slate-900">
                      {SUPERVISOR_LEVEL_META[lvl].label}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      {SUPERVISOR_LEVEL_META[lvl].description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Granular Permissions */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">
                الصلاحيات المسموحة:
              </label>
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {PERMISSION_LABELS.map((perm) => (
                  <label
                    key={perm.key}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-100 cursor-pointer hover:border-amber-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPerms[perm.key]}
                      onChange={() => togglePermissionKey(perm.key)}
                      className="mt-0.5 w-4 h-4 accent-amber-600 rounded shrink-0"
                    />
                    <div>
                      <span className="text-xs font-black text-slate-800 block">
                        {perm.label}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {perm.description}
                      </span>
                    </div>
                  </label>
                ))}

                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500">
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-bold">
                    صلاحية «إدارة المالك والمشرفين» محجوزة للمالك الأساسي فقط بقواعد الأمان.
                  </span>
                </div>
              </div>
            </div>

            {/* Notes + Active toggle */}
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-black text-slate-800">تفعيل صلاحيات المشرف فور الحفظ</span>
                <input
                  type="checkbox"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600"
                />
              </label>

              <input
                type="text"
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                maxLength={300}
                placeholder="ملاحظة إدارية اختيارية (مثال: مسؤول المناوبة المسائية)..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmAddSupervisor}
                disabled={submitting || !resolvedCandidate}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Shield className="w-4 h-4" />
                <span>{submitting ? 'جارٍ الحفظ...' : 'تأكيد إضافة المشرف'}</span>
              </button>
              <button
                type="button"
                onClick={() => !submitting && setShowAddModal(false)}
                disabled={submitting}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Supervisor Permissions Modal */}
      {editingSupervisor && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right overflow-y-auto"
          onClick={() => !submitting && setEditingSupervisor(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  تعديل صلاحيات: {editingSupervisor.displayName}
                </h3>
                <p className="text-[11px] text-slate-500 font-bold" dir="ltr">
                  {editingSupervisor.phone || editingSupervisor.email || editingSupervisor.uid}
                </p>
              </div>
              <button
                type="button"
                onClick={() => !submitting && setEditingSupervisor(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">مستوى الإشراف:</label>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS_ORDER.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleLevelChange(lvl)}
                    className={`p-2.5 rounded-xl border-2 text-right transition-all cursor-pointer ${
                      selectedLevel === lvl
                        ? 'border-amber-500 bg-amber-50/70'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 block">
                      {SUPERVISOR_LEVEL_META[lvl].label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              {PERMISSION_LABELS.map((perm) => (
                <label
                  key={perm.key}
                  className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-slate-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPerms[perm.key]}
                    onChange={() => togglePermissionKey(perm.key)}
                    className="mt-0.5 w-4 h-4 accent-amber-600 rounded shrink-0"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-800 block">{perm.label}</span>
                    <span className="text-[10px] text-slate-500 block">{perm.description}</span>
                  </div>
                </label>
              ))}
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <span className="text-xs font-black text-slate-800">الحساب مفعّل</span>
              <input
                type="checkbox"
                checked={formActive}
                onChange={(e) => setFormActive(e.target.checked)}
                className="w-4 h-4 accent-emerald-600"
              />
            </label>

            <input
              type="text"
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              maxLength={300}
              placeholder="ملاحظة إدارية اختيارية..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold outline-hidden"
            />

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmEditSupervisor}
                disabled={submitting}
                className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
              </button>
              <button
                type="button"
                onClick={() => !submitting && setEditingSupervisor(null)}
                disabled={submitting}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke / Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 font-['Cairo',sans-serif] text-right"
          onClick={() => !busyUid && setDeleteTarget(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h3 className="text-base font-black text-slate-900">تأكيد إلغاء الإشراف وحذفه</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                سيتم سحب جميع صلاحيات الإشراف عن «{deleteTarget.displayName}» وحذف تعيينه فوراً مع بقاء حسابه العادي دون مساس.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmDeleteSupervisor}
                disabled={busyUid === deleteTarget.uid}
                className="py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black disabled:opacity-50 cursor-pointer"
              >
                {busyUid === deleteTarget.uid ? 'جارٍ الإلغاء...' : 'نعم، إلغاء وحذف'}
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={busyUid === deleteTarget.uid}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black cursor-pointer"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
