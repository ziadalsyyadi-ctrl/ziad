export type BloodType = 'O+' | 'A+' | 'B+' | 'AB+' | 'O-' | 'A-' | 'B-' | 'AB-';
export const BLOOD_TYPES: BloodType[] = ['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'];

export interface DonationRecord {
  id: string;
  date: string;
  notes?: string;
}

export interface Donor {
  id: string;
  userId: string;
  fullName: string;
  bloodType: BloodType;
  phone: string;
  phoneVerified?: boolean;
  residence: string;
  notes?: string;
  lastDonationDate?: string;
  donationHistory?: DonationRecord[];
  isAvailable: boolean;
  allowContact: boolean;
  source?: 'firestore' | 'google_sheets' | 'manual_import';
  createdAt?: any;
  updatedAt?: any;
}

export type UrgencyLevel = 'critical' | 'urgent' | 'normal';
export type RequestStatus = 'open' | 'fulfilled';

export interface UrgentRequest {
  id: string;
  userId: string;
  patientName: string;
  bloodType: BloodType;
  unitsNeeded: number;
  hospital: string;
  contactName: string;
  contactPhone: string;
  urgencyLevel: UrgencyLevel;
  status: RequestStatus;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  phone?: string;
  phoneVerified?: boolean;
  email?: string;
  role: 'user' | 'admin';
  createdAt?: any;
}

export type SupervisorLevel = 'donor_admin' | 'urgent_admin' | 'support_admin' | 'general_admin';
export type AdminRoleLevel = 'owner' | SupervisorLevel | 'legacy_admin';

export interface SupervisorPermissions {
  manageDonors: boolean;
  manageUrgentRequests: boolean;
  manageSupportChat: boolean;
  manageHospitals: boolean;
  manageLocations: boolean;
  manageSettings: boolean;
  manageUsersRecovery: boolean;
  manageSupervisors: boolean;
}

export interface SupervisorRecord {
  uid: string;
  displayName: string;
  phone?: string;
  email?: string;
  level: SupervisorLevel;
  permissions: SupervisorPermissions;
  isActive: boolean;
  assignedBy: string;
  assignedByName?: string;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface AdminAuditLog {
  id: string;
  actorUid: string;
  actorName: string;
  actorLevel: AdminRoleLevel;
  actionType: string;
  targetId?: string;
  targetLabel?: string;
  details?: string;
  createdAt?: any;
}

export interface AppSettings {
  announcement: string;
  noticeMessage?: string;
  announcementType?: 'general' | 'urgent' | 'campaign';
  announcementTime?: string;
  announcementActive?: boolean;
  deletedDonors?: string[];
  updatedAt?: any;
  updatedBy?: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  services: string;
  updatedAt?: any;
}

export type ConversationStatus = 'new' | 'read' | 'replied' | 'closed';

export interface Conversation {
  id: string;
  userId: string;
  userDisplayName: string;
  userPhone?: string;
  lastMessage?: string;
  lastMessageAt?: any;
  status: ConversationStatus;
  unreadCountByAdmin: number;
  unreadCountByUser: number;
  updatedAt: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  isAdmin: boolean;
  createdAt: any;
}

export type ActiveTab = 'home' | 'search' | 'urgent' | 'info' | 'register' | 'admin' | 'supervisors' | 'hospitals' | 'chat' | 'profile';
