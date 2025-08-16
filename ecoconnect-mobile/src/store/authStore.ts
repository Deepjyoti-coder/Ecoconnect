import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/services/firebase';
import { authService, UserProfileData } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  userProfile: UserProfileData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Actions
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, displayName: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  clearError: () => void;
  loadUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfileData>) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    const result = await authService.signIn(email, password);
    
    if (result.success && result.user) {
      // User profile will be loaded by the auth state listener
      set({ isLoading: false });
      return true;
    } else {
      set({ isLoading: false, error: result.error || 'Sign in failed' });
      return false;
    }
  },

  signUp: async (email: string, password: string, displayName: string) => {
    set({ isLoading: true, error: null });
    
    const result = await authService.signUp(email, password, displayName);
    
    if (result.success && result.user) {
      // User profile will be loaded by the auth state listener
      set({ isLoading: false });
      return true;
    } else {
      set({ isLoading: false, error: result.error || 'Sign up failed' });
      return false;
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    
    await authService.signOut();
    
    set({
      user: null,
      userProfile: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  },

  resetPassword: async (email: string) => {
    set({ error: null });
    
    const result = await authService.resetPassword(email);
    
    if (!result.success) {
      set({ error: result.error || 'Password reset failed' });
      return false;
    }
    
    return true;
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    
    const result = await authService.signInWithGoogle();
    
    if (result.success && result.user) {
      set({ isLoading: false });
      return true;
    } else {
      set({ isLoading: false, error: result.error || 'Google sign in failed' });
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  loadUserProfile: async () => {
    const { user } = get();
    if (!user) return;

    const profile = await authService.getUserProfile(user.uid);
    set({ userProfile: profile });
  },

  updateUserProfile: async (updates: Partial<UserProfileData>) => {
    const { user, userProfile } = get();
    if (!user || !userProfile) return false;

    const success = await authService.updateUserProfile(user.uid, updates);
    
    if (success) {
      set({ userProfile: { ...userProfile, ...updates } });
    }
    
    return success;
  },
}));

// Initialize auth state
const initializeAuth = async () => {
  if (isFirebaseConfigured && auth) {
    // Firebase auth state listener
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await authService.getUserProfile(user.uid);
        useAuthStore.setState({
          user,
          userProfile: profile,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        useAuthStore.setState({
          user: null,
          userProfile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });
  } else {
    // Demo mode - check for stored user
    try {
      const storedUser = await AsyncStorage.getItem('@demo_user');
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        const profile = await authService.getUserProfile(user.uid);
        useAuthStore.setState({
          user,
          userProfile: profile,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        useAuthStore.setState({
          user: null,
          userProfile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking demo user:', error);
      useAuthStore.setState({
        user: null,
        userProfile: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }
};

// Initialize auth when the module loads
initializeAuth();