# Firebase Setup

This app is wired to Firebase Authentication and Firestore.

## 1. Authentication providers

Enable these providers in Firebase Console:

- Email/Password
- Google
- GitHub

For GitHub, add the Firebase callback URL shown in the provider setup page to your GitHub OAuth app.

## 2. Firestore

Create a Firestore database in production mode.

Suggested starter rules:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /jobs/{jobId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.clientId;
    }
  }
}
```

## 3. Environment variables

You can override Firebase config with a local `.env` file based on `.env.example`.

## 4. Deploy/build check

```powershell
npm run build
firebase deploy
```