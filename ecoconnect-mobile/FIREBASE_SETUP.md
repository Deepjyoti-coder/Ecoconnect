# 🔥 Firebase Setup Guide for EcoConnect Mobile

## 📋 Prerequisites

1. **Google Account** - You'll need a Google account to access Firebase Console
2. **Node.js & npm** - Already installed for the React Native project

## 🚀 Step-by-Step Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `ecoconnect-mobile` (or your preferred name)
4. Enable Google Analytics (recommended)
5. Choose or create a Google Analytics account
6. Click **"Create project"**

### 2. Add Web App to Firebase Project

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register your app:
   - **App nickname**: `EcoConnect Mobile`
   - **Check** "Also set up Firebase Hosting" (optional)
3. Click **"Register app"**

### 3. Get Firebase Configuration

Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Replace the placeholder values in `.env` with your Firebase config:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 5. Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - ✅ **Email/Password** - Click "Enable" and save
   - ✅ **Google** (optional) - For social login
   - ✅ **Apple** (optional) - For iOS social login

### 6. Set up Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select a location (choose closest to your users)
5. Click **"Done"**

### 7. Set up Firebase Storage

1. Go to **Storage** in Firebase Console
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Select the same location as Firestore
5. Click **"Done"**

### 8. Configure Firestore Security Rules

Replace the default rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Challenges can be read by authenticated users
    match /challenges/{challengeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Adjust based on your needs
    }
    
    // Community posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 9. Configure Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload their own profile pictures and post images
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public images (like challenge images) can be read by anyone
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 Testing the Setup

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Test Authentication**:
   - Try creating a new account
   - Try signing in with existing credentials
   - Test password reset functionality

3. **Check Firebase Console**:
   - Go to **Authentication** > **Users** to see registered users
   - Go to **Firestore Database** to see user profiles
   - Check **Storage** for any uploaded files

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that all environment variables are set correctly
   - Ensure `.env` file is in the project root
   - Restart the development server after changing `.env`

2. **"Firebase: Error (auth/api-key-not-valid)"**
   - Verify the API key in Firebase Console
   - Make sure you're using the Web API key, not iOS/Android keys

3. **"Firebase: Error (auth/unauthorized-domain)"**
   - In Firebase Console, go to Authentication > Settings > Authorized domains
   - Add your development domains (localhost, etc.)

4. **Network errors**
   - Check your internet connection
   - Verify Firebase project is active and not suspended

## 📱 Platform-Specific Setup (Optional)

### For iOS:
1. Add iOS app in Firebase Console
2. Download `GoogleService-Info.plist`
3. Follow Expo Firebase setup guide for iOS

### For Android:
1. Add Android app in Firebase Console
2. Download `google-services.json`
3. Follow Expo Firebase setup guide for Android

## 🎯 Next Steps

Once Firebase is configured:

1. ✅ **Authentication** - Users can sign up, sign in, and reset passwords
2. 🔄 **User Profiles** - Automatic profile creation in Firestore
3. 🔄 **Navigation** - Implement main app navigation (Task 3)
4. 🔄 **Eco Challenges** - Add challenge tracking (Task 6)
5. 🔄 **Community Feed** - Implement social features (Task 7)

## 📚 Useful Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [React Native Firebase](https://rnfirebase.io/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**🎉 Congratulations!** Your Firebase backend is now ready for EcoConnect Mobile!