import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Check if Firebase is properly configured
const isFirebaseConfigured = 
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY && 
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY !== 'AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' &&
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID !== 'ecoconnect-mobile';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
};

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let functions: any = null;

// Only initialize Firebase if properly configured
if (isFirebaseConfigured) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);

    // Initialize Firebase Auth
    auth = getAuth(app);

    // Initialize Firestore
    db = getFirestore(app);

    // Initialize Storage
    storage = getStorage(app);

    // Initialize Functions
    functions = getFunctions(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase not configured - using demo mode');
}

// Connect to emulators in development
if (__DEV__) {
  // Uncomment these lines if you want to use Firebase emulators in development
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
  // connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { auth, db, storage, functions, isFirebaseConfigured };
export default app;