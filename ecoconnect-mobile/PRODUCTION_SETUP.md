# 🚀 Production Setup Guide for EcoConnect Mobile

## 🔥 Firebase Configuration Setup

### Step 1: Create Firebase Project

1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Click "Create a project"**
3. **Enter project name**: `ecoconnect-mobile-prod` (or your preferred name)
4. **Enable Google Analytics** (recommended)
5. **Choose or create a Google Analytics account**
6. **Click "Create project"**

### Step 2: Add Web App to Firebase Project

1. **In your Firebase project dashboard, click the Web icon** (`</>`)
2. **Register your app**:
   - **App nickname**: `EcoConnect Mobile`
   - **Check** "Also set up Firebase Hosting" (optional)
3. **Click "Register app"**

### Step 3: Get Your Firebase Configuration

**Copy the Firebase configuration object** that looks like this:

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

### Step 4: Update Environment Variables

**Replace the placeholder values in `.env` with your actual Firebase config**:

```env
# Firebase Configuration - YOUR ACTUAL VALUES
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC_YOUR_ACTUAL_API_KEY_HERE
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

### Step 5: Enable Authentication Methods

1. **In Firebase Console, go to Authentication > Sign-in method**
2. **Enable the following providers**:
   - ✅ **Email/Password** - Click "Enable" and save
   - ✅ **Google** (optional) - For social login

### Step 6: Set up Firestore Database

1. **Go to Firestore Database in Firebase Console**
2. **Click "Create database"**
3. **Choose "Start in production mode"** (secure by default)
4. **Select a location** (choose closest to your users)
5. **Click "Done"**

### Step 7: Configure Firestore Security Rules

**Replace the default rules with these production-ready rules**:

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
      allow write: if request.auth != null && 
        request.auth.token.admin == true; // Only admins can create/update challenges
    }
    
    // Community posts
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Leaderboard data (read-only for users)
    match /leaderboard/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Only server-side functions can update
    }
  }
}
```

### Step 8: Set up Firebase Storage

1. **Go to Storage in Firebase Console**
2. **Click "Get started"**
3. **Choose "Start in production mode"**
4. **Select the same location as Firestore**
5. **Click "Done"**

### Step 9: Configure Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can upload their own profile pictures and post images
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId
        && resource.size < 5 * 1024 * 1024; // 5MB limit
    }
    
    // Public images (like challenge images) can be read by anyone
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## 🎯 Features Now Available

### ✅ **Real User Authentication**
- Email/password signup and login
- Password reset functionality
- Secure user profile creation
- No more demo mode

### ✅ **Theme Switching**
- Light/Dark mode toggle in Profile screen
- Persistent theme preference
- Eco-friendly color schemes for both themes
- Smooth theme transitions

### ✅ **Production-Ready Security**
- Secure Firestore rules
- Protected user data
- Proper authentication flow
- Storage security rules

### ✅ **Enhanced Profile Screen**
- Theme toggle with switch
- Real user data display
- Environmental impact tracking
- Achievement system
- Activity history

## 🧪 Testing Your Setup

### 1. **Test Authentication**
```bash
npm start
```

1. **Create a new account** with your email
2. **Sign in** with the created account
3. **Test password reset** functionality
4. **Check Firebase Console** to see the user created

### 2. **Test Theme Switching**
1. **Go to Profile screen**
2. **Toggle the Dark Mode switch**
3. **Verify theme persists** after app restart
4. **Check all screens** adapt to the new theme

### 3. **Verify Firebase Integration**
1. **Check Authentication > Users** in Firebase Console
2. **Check Firestore Database** for user profiles
3. **Test data persistence** across app sessions

## 🚨 Important Security Notes

### **Environment Variables**
- ✅ **Never commit real Firebase keys to version control**
- ✅ **Use different Firebase projects for development/production**
- ✅ **Regularly rotate API keys**

### **Firestore Rules**
- ✅ **Always test security rules before deployment**
- ✅ **Use Firebase Emulator for rule testing**
- ✅ **Monitor Firebase Console for security alerts**

### **User Data**
- ✅ **Implement proper data validation**
- ✅ **Encrypt sensitive user information**
- ✅ **Follow GDPR/privacy regulations**

## 🎉 **Your App is Now Production-Ready!**

### **Key Improvements Made:**
1. **Removed all demo/mock functionality**
2. **Implemented real Firebase authentication**
3. **Added professional theme switching**
4. **Enhanced user experience with dark mode**
5. **Secured with production-ready Firebase rules**
6. **Created comprehensive user profiles**

### **Next Steps:**
1. **Test thoroughly with real users**
2. **Add more eco-friendly features**
3. **Implement push notifications**
4. **Add camera functionality for waste scanning**
5. **Deploy to app stores**

---

**🌱 Congratulations! EcoConnect Mobile is now a full-fledged, production-ready sustainability app!**