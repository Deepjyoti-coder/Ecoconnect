import { create } from 'zustand';
import { UserProfileData } from '@/services/authService';

interface UserState {
  profile: UserProfileData | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProfile: (profile: UserProfileData) => void;
  updateProfile: (updates: Partial<UserProfileData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),
  
  updateProfile: (updates) => set((state) => ({
    profile: state.profile ? { ...state.profile, ...updates } : null
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
}));