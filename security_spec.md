# Security Specification & Test Matrix

## 1. Data Invariants
1. **Donor Identity & Ownership**: A donor record can only be created with `userId == request.auth.uid` (or by an active admin with `manageDonors`). A donor record can only be updated or deleted by its owning user or an active `manageDonors` admin.
2. **Donor Phone & Data Validation**: `phone` must be a valid phone string (between 7 and 20 chars). `fullName` and `residence` cannot exceed length constraints. `bloodType` must belong strictly to `['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']`.
3. **Urgent Request Invariants**: A request can only be authored with `userId == request.auth.uid`. Only the author or an active `manageUrgentRequests` admin can update or delete it.
4. **User Profile Isolation & Owner Protection**: Users can only create and modify their own `/users/{userId}` record where `{userId} == request.auth.uid`. Role privilege escalation to `'admin'` is prevented unless `isOwner()`. No supervisor (including `general_admin`) can edit, disable, or delete Owner records.
5. **Supervisor RBAC Invariants**:
   - **Owner-Exclusive Supervisor Management**: Only the verified Owner (`isOwner()`) may list, create, update, enable/disable, or delete `/supervisors/{supervisorId}` assignments.
   - **No Self-Escalation**: Non-owner supervisors can read only their own `/supervisors/{uid}` assignment (`get`) and cannot mutate their own `level`, `isActive`, or `permissions`. `permissions.manageSupervisors` must always remain `false` for non-owners.
   - **Scoped Capability Enforcement**:
     - `donor_admin`: Donors CRUD + `settings/global` `['deletedDonors', 'updatedAt']` tombstone updates only. Denied on urgent requests, support chat, hospitals, locations, settings/announcements, `appConfig`, `supervisors`, and `admin_audit_logs` list.
     - `urgent_admin`: Urgent requests CRUD/status only. Denied on other users' donors, support chat, hospitals, settings, `appConfig`, `supervisors`, and `admin_audit_logs` list.
     - `support_admin`: Support conversations/messages CRUD + reading target user profile (`get`) for push token lookup. Denied on other users' donors, urgent requests, hospitals, settings, `appConfig`, `supervisors`, and `admin_audit_logs` list.
     - `general_admin`: Operational permissions (donors, urgent requests, support chat, hospitals, locations, settings/announcements), strictly WITHOUT supervisor management, Owner modification, `appConfig`, or audit log tampering.
     - Disabled supervisor (`isActive: false`): Loses all supervisor capabilities immediately, even if `users/{uid}.role` was previously `'admin'`.
6. **Immutable Audit Trail**: `/admin_audit_logs/{logId}` is append-only (`create` allowed only by Owner or active supervisor with `actorUid == request.auth.uid` and `createdAt == request.time`; `update` and `delete` denied for everyone; `read`/`list` allowed only for Owner).
7. **Catch-All Default Deny**: All unmapped collections or pathways are blocked by default.

## 2. The Dirty Dozen+ RBAC Payloads (Designed to Fail with `permission-denied`)
1. **Spoofed Donor Creator**: Regular user sending `{ "userId": "attacker_123", ... }` on `/donors`.
2. **Invalid Blood Type in Donor**: Sending `{ "bloodType": "X-POSITIVE", ... }`.
3. **Donor Update Gap (Ghost Field injection)**: Attempting to update donor with `{ "isAdmin": true, "verified": true }`.
4. **Admin Escalation on User Profile**: Regular user writing `{ "role": "admin" }` to `/users/{uid}`.
5. **Self-Promotion to Supervisor**: Regular user or `donor_admin` attempting to create/update `/supervisors/{request.auth.uid}` with `general_admin` or `manageSupervisors: true`.
6. **General Admin Listing/Deleting Supervisors or Owner**: `general_admin` trying to `list` or `delete` `/supervisors` or delete Owner's `/users/{ownerUid}`.
7. **Donor Admin Moderating Urgent Requests**: `donor_admin` attempting to fulfill or delete another user's `/urgent_requests/{id}`.
8. **Donor Admin Writing Announcements**: `donor_admin` attempting to update `announcement` on `/settings/global` (only `['deletedDonors', 'updatedAt']` is permitted for `donor_admin`).
9. **Urgent Admin Deleting Other User's Donor**: `urgent_admin` attempting to edit/delete `/donors/{otherId}`.
10. **Support Admin Writing Donors/Urgent/Settings**: `support_admin` attempting to modify `/donors`, `/urgent_requests`, or `/settings/global`.
11. **Disabled Supervisor Bypass**: Supervisor with `isActive: false` trying to edit a donor or urgent request (must fail even if `users/{uid}.role == 'admin'`).
12. **Audit Log Spoofing / Tampering / Reading by Non-Owner**: Non-owner supervisor attempting to `list`, `update`, or `delete` `/admin_audit_logs`, or creating a log with `actorUid != request.auth.uid` or `actorLevel: 'owner'`.
13. **Website Config Hijack**: Non-owner supervisor attempting to overwrite `/appConfig/websiteUrl`.
14. **Cross-User Profile / Unmapped Collection Write**: Regular user writing `/users/{otherUid}` or `/config/app`.
