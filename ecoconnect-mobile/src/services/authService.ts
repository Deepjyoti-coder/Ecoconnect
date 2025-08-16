import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  AuthError,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';
import { MobileUser } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  greenPoints: number;
  carbonOffset: number;
  joinDate: Date;
  level: number;
  badges: any[];
  deviceInfo: {
    platform: 'ios' | 'android';
    version: string;
    pushToken?: string;
  };
  preferences: {
    notifications: {
      achievements: boolean;
      challenges: boolean;
      reminders: boolean;
      marketing: boolean;
    };
    cameraSettings: {
      quality: 'low' | 'medium' | 'high';
      autoAnalyze: boolean;
      saveToGallery: boolean;
    };
    locationSharing: boolean;
  };
  offlineData: {
    lastSyncTimestamp: number;
    pendingActions: any[];
    cachedVendors: any[];
  };
}

class AuthService {
  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, displayName: string): Promise<AuthResult> {
    // Demo mode - simulate successful signup
    if (!isFirebaseConfigured) {
      return this.handleDemoSignUp(email, password, displayName);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName });

      // Create user profile in Firestore
      await this.createUserProfile(user, displayName);

      return { success: true, user };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: this.getErrorMessage(authError.code) };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    // Demo mode - simulate successful signin
    if (!isFirebaseConfigured) {
      return this.handleDemoSignIn(email, password);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: this.getErrorMessage(authError.code) };
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<AuthResult> {
    // Demo mode - clear stored user
    if (!isFirebaseConfigured) {
      await AsyncStorage.removeItem('@demo_user');
      return { success: true };
    }

    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: this.getErrorMessage(authError.code) };
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<AuthResult> {
    // Demo mode - simulate password reset
    if (!isFirebaseConfigured) {
      return { success: true };
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: this.getErrorMessage(authError.code) };
    }
  }

  /**
   * Sign in with Google (placeholder for social login)
   */
  async signInWithGoogle(): Promise<AuthResult> {
    try {
      // This would require additional setup with Google Sign-In
      // For now, return a placeholder response
      return { success: false, error: 'Google Sign-In not implemented yet' };
    } catch (error) {
      return { success: false, error: 'Google Sign-In failed' };
    }
  }

  /**
   * Create user profile in Firestore
   */
  private async createUserProfile(user: User, displayName: string): Promise<void> {
    const userProfile: UserProfileData = {
      uid: user.uid,
      email: user.email || '',
      displayName,
      photoURL: user.photoURL || undefined,
      greenPoints: 0,
      carbonOffset: 0,
      joinDate: new Date(),
      level: 1,
      badges: [],
      deviceInfo: {
        platform: 'android', // Will be detected dynamically
        version: '1.0.0',
      },
      preferences: {
        notifications: {
          achievements: true,
          challenges: true,
          reminders: true,
          marketing: false,
        },
        cameraSettings: {
          quality: 'medium',
          autoAnalyze: true,
          saveToGallery: false,
        },
        locationSharing: true,
      },
      offlineData: {
        lastSyncTimestamp: Date.now(),
        pendingActions: [],
        cachedVendors: [],
      },
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
  }

  /**
   * Get user profile from Firestore or demo storage
   */
  async getUserProfile(uid: string): Promise<UserProfileData | null> {
    // Demo mode - get from AsyncStorage
    if (!isFirebaseConfigured) {
      try {
        const profile = await AsyncStorage.getItem(`@demo_profile_${uid}`);
        if (profile) {
          const parsedProfile = JSON.parse(profile);
          // Ensure joinDate is a proper Date object
          if (parsedProfile.joinDate) {
            parsedProfile.joinDate = new Date(parsedProfile.joinDate);
          }
          return parsedProfile;
        }
        return null;
      } catch (error) {
        console.error('Error fetching demo user profile:', error);
        return null;
      }
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserProfileData;
        // Ensure joinDate is a proper Date object
        if (data.joinDate) {
          data.joinDate = new Date(data.joinDate);
        }
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Update user profile in Firestore or demo storage
   */
  async updateUserProfile(uid: string, updates: Partial<UserProfileData>): Promise<boolean> {
    // Demo mode - update in AsyncStorage
    if (!isFirebaseConfigured) {
      try {
        const existingProfile = await AsyncStorage.getItem(`@demo_profile_${uid}`);
        if (existingProfile) {
          const profile = JSON.parse(existingProfile);
          const updatedProfile = { ...profile, ...updates };
          await AsyncStorage.setItem(`@demo_profile_${uid}`, JSON.stringify(updatedProfile));
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error updating demo user profile:', error);
        return false;
      }
    }

    try {
      await updateDoc(doc(db, 'users', uid), updates);
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  /**
   * Get current authenticated user
   */
  getCurrentUser(): User | null {
    if (!isFirebaseConfigured) {
      return null; // Demo mode handled in auth store
    }
    return auth?.currentUser || null;
  }

  /**
   * Demo mode sign up
   */
  private async handleDemoSignUp(email: string, password: string, displayName: string): Promise<AuthResult> {
    try {
      // Simulate validation
      if (password.length < 6) {
        return { success: false, error: 'Password should be at least 6 characters long.' };
      }

      // Check if user already exists
      const existingUsers = await AsyncStorage.getItem('@demo_users');
      const users = existingUsers ? JSON.parse(existingUsers) : {};
      
      if (users[email]) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      // Create mock user
      const mockUser = {
        uid: `demo-${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        emailVerified: true,
      } as User;

      // Store user
      users[email] = { ...mockUser, password };
      await AsyncStorage.setItem('@demo_users', JSON.stringify(users));
      await AsyncStorage.setItem('@demo_user', JSON.stringify(mockUser));

      // Create user profile
      await this.createDemoUserProfile(mockUser, displayName);

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Sign up failed. Please try again.' };
    }
  }

  /**
   * Demo mode sign in
   */
  private async handleDemoSignIn(email: string, password: string): Promise<AuthResult> {
    try {
      // Get stored users
      const existingUsers = await AsyncStorage.getItem('@demo_users');
      const users = existingUsers ? JSON.parse(existingUsers) : {};
      
      const user = users[email];
      if (!user) {
        return { success: false, error: 'No account found with this email address.' };
      }

      if (user.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      // Store current user
      const { password: _, ...userWithoutPassword } = user;
      await AsyncStorage.setItem('@demo_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword as User };
    } catch (error) {
      return { success: false, error: 'Sign in failed. Please try again.' };
    }
  }

  /**
   * Create demo user profile
   */
  private async createDemoUserProfile(user: User, displayName: string): Promise<void> {
    const userProfile: UserProfileData = {
      uid: user.uid,
      email: user.email || '',
      displayName,
      photoURL: user.photoURL || undefined,
      greenPoints: 0,
      carbonOffset: 0,
      joinDate: new Date(),
      level: 1,
      badges: [],
      deviceInfo: {
        platform: 'android',
        version: '1.0.0',
      },
      preferences: {
        notifications: {
          achievements: true,
          challenges: true,
          reminders: true,
          marketing: false,
        },
        cameraSettings: {
          quality: 'medium',
          autoAnalyze: true,
          saveToGallery: false,
        },
        locationSharing: true,
      },
      offlineData: {
        lastSyncTimestamp: Date.now(),
        pendingActions: [],
        cachedVendors: [],
      },
    };

    await AsyncStorage.setItem(`@demo_profile_${user.uid}`, JSON.stringify(userProfile));
  }

  /**
   * Convert Firebase auth error codes to user-friendly messages
   */
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}

export const authService = new AuthService();