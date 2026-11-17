# Bank AlDam Firebase Cloud Functions

These functions implement administrator-approved account recovery and complete user-account deletion.

## Before deployment

1. Confirm the Firebase project is `a-drop-of-blood-saves-a-life`.
2. Confirm the Firestore database ID is `ai-studio-remixremixremix-797cdaa7-fcd3-4ecd-a13f-0cffe9a43f72`.
3. Enable Cloud Functions and configure the project billing plan required by Firebase (2nd generation functions generally require the Blaze plan).
4. Install Firebase CLI and authenticate as a project owner.
5. From the repository root run:

```sh
npm install --prefix functions
npm run build --prefix functions
firebase deploy --only functions --project a-drop-of-blood-saves-a-life
```

Do not deploy these functions until the project owner has reviewed the source and confirmed billing, region, IAM and account-recovery procedures.

## Recovery security model

- The claimant submits the existing Firebase UID and the phone number stored on that UID's profile.
- The UID alone is not authentication. The request is stored server-side and must be manually reviewed by an administrator.
- An administrator must independently verify the claimant's identity before approving.
- The six-digit code is returned only to the authenticated administrator, stored only as a salted SHA-256 digest, expires after ten minutes, and is limited to five verification attempts.
- The claimant must provide the UID, opaque request ID, code, and a new password. The Admin SDK updates the password on the existing UID; no replacement account or phone mapping is created.
- A code is consumed before password mutation and cannot be reused. If the update fails, the request is marked failed and the administrator must issue a new request/code.
- The administrator can reissue a code if the original plaintext was lost. Reissuing invalidates the prior code.

## User deletion

The administrator-only callable checks the caller's role on the server, refuses deletion of the current administrator and master administrator accounts, deletes the Firebase Authentication account, and removes associated user profile, donor and phone mapping documents.

## Firestore rules

Recovery request documents are intentionally not readable or writable by app clients. The Admin SDK in these functions accesses them server-side and bypasses client Firestore rules. Do not add public Firestore rules for recovery tokens or hashes.

## Important limitations before deployment

Callable functions are not available until deployed. The app UI may be committed and ready, but recovery and complete Auth-user deletion cannot work until the functions are deployed successfully to the matching Firebase project.
