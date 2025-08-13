import { create } from 'zustand';
import { EcoChallenge, UserChallengeProgress } from '@/types';
import { challengesService } from '@/services/challengesService';

interface ChallengesState {
  challenges: EcoChallenge[];
  userProgress: UserChallengeProgress[];
  isLoading: boolean;
  error: string | null;
  selectedChallenge: EcoChallenge | null;
  
  // Actions
  loadChallenges: () => Promise<void>;
  loadUserProgress: (userId: string) => Promise<void>;
  startChallenge: (userId: string, challengeId: string) => Promise<boolean>;
  updateProgress: (userId: string, challengeId: string, requirementId: string, value: number) => Promise<boolean>;
  setSelectedChallenge: (challenge: EcoChallenge | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useChallengesStore = create<ChallengesState>((set, get) => ({
  challenges: [],
  userProgress: [],
  isLoading: false,
  error: null,
  selectedChallenge: null,

  loadChallenges: async () => {
    set({ isLoading: true, error: null });
    try {
      const challenges = await challengesService.getActiveChallenges();
      set({ challenges, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load challenges', 
        isLoading: false 
      });
    }
  },

  loadUserProgress: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const userProgress = await challengesService.getUserChallengeProgress(userId);
      set({ userProgress, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load user progress', 
        isLoading: false 
      });
    }
  },

  startChallenge: async (userId: string, challengeId: string) => {
    set({ error: null });
    try {
      const success = await challengesService.startChallenge(userId, challengeId);
      if (success) {
        // Reload user progress to reflect the new challenge
        const userProgress = await challengesService.getUserChallengeProgress(userId);
        set({ userProgress });
      }
      return success;
    } catch (error) {
      set({ error: 'Failed to start challenge' });
      return false;
    }
  },

  updateProgress: async (userId: string, challengeId: string, requirementId: string, value: number) => {
    set({ error: null });
    try {
      const success = await challengesService.updateChallengeProgress(
        userId, 
        challengeId, 
        requirementId, 
        value
      );
      if (success) {
        // Reload user progress to reflect the update
        const userProgress = await challengesService.getUserChallengeProgress(userId);
        set({ userProgress });
      }
      return success;
    } catch (error) {
      set({ error: 'Failed to update progress' });
      return false;
    }
  },

  setSelectedChallenge: (challenge) => set({ selectedChallenge: challenge }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
}));