import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { EcoChallenge, UserChallengeProgress, ChallengeProgress } from '@/types';

class ChallengesService {
  /**
   * Get all active challenges
   */
  async getActiveChallenges(): Promise<EcoChallenge[]> {
    try {
      const challengesRef = collection(db, 'challenges');
      const q = query(
        challengesRef,
        where('isActive', '==', true),
        orderBy('startDate', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
      })) as EcoChallenge[];
    } catch (error) {
      console.error('Error fetching challenges:', error);
      return this.getMockChallenges();
    }
  }

  /**
   * Get challenges by type
   */
  async getChallengesByType(type: 'daily' | 'weekly' | 'monthly' | 'special'): Promise<EcoChallenge[]> {
    try {
      const challengesRef = collection(db, 'challenges');
      const q = query(
        challengesRef,
        where('type', '==', type),
        where('isActive', '==', true),
        orderBy('startDate', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate.toDate(),
        endDate: doc.data().endDate.toDate(),
      })) as EcoChallenge[];
    } catch (error) {
      console.error('Error fetching challenges by type:', error);
      return this.getMockChallenges().filter(c => c.type === type);
    }
  }

  /**
   * Get user's challenge progress
   */
  async getUserChallengeProgress(userId: string): Promise<UserChallengeProgress[]> {
    try {
      const progressRef = collection(db, 'userChallengeProgress');
      const q = query(
        progressRef,
        where('userId', '==', userId),
        orderBy('startedAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startedAt: doc.data().startedAt.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
      })) as UserChallengeProgress[];
    } catch (error) {
      console.error('Error fetching user challenge progress:', error);
      return [];
    }
  }

  /**
   * Start a challenge for a user
   */
  async startChallenge(userId: string, challengeId: string): Promise<boolean> {
    try {
      const challenge = await this.getChallengeById(challengeId);
      if (!challenge) return false;

      const progressId = `${userId}_${challengeId}`;
      const initialProgress: ChallengeProgress[] = challenge.requirements.map(req => ({
        requirementId: req.id,
        currentValue: 0,
        targetValue: req.target,
        isCompleted: false,
        lastUpdated: new Date(),
      }));

      const userProgress: UserChallengeProgress = {
        id: progressId,
        userId,
        challengeId,
        status: 'in_progress',
        progress: initialProgress,
        startedAt: new Date(),
        pointsEarned: 0,
      };

      await setDoc(doc(db, 'userChallengeProgress', progressId), {
        ...userProgress,
        startedAt: Timestamp.fromDate(userProgress.startedAt),
      });

      return true;
    } catch (error) {
      console.error('Error starting challenge:', error);
      return false;
    }
  }

  /**
   * Update challenge progress
   */
  async updateChallengeProgress(
    userId: string, 
    challengeId: string, 
    requirementId: string, 
    value: number
  ): Promise<boolean> {
    try {
      const progressId = `${userId}_${challengeId}`;
      const progressDoc = await getDoc(doc(db, 'userChallengeProgress', progressId));
      
      if (!progressDoc.exists()) return false;

      const progressData = progressDoc.data() as UserChallengeProgress;
      const updatedProgress = progressData.progress.map(p => {
        if (p.requirementId === requirementId) {
          return {
            ...p,
            currentValue: Math.min(value, p.targetValue),
            isCompleted: value >= p.targetValue,
            lastUpdated: new Date(),
          };
        }
        return p;
      });

      const allCompleted = updatedProgress.every(p => p.isCompleted);
      const status = allCompleted ? 'completed' : 'in_progress';
      
      let pointsEarned = progressData.pointsEarned;
      let completedAt = progressData.completedAt;

      if (allCompleted && progressData.status !== 'completed') {
        const challenge = await this.getChallengeById(challengeId);
        pointsEarned = challenge?.pointsReward || 0;
        completedAt = new Date();
      }

      await updateDoc(doc(db, 'userChallengeProgress', progressId), {
        progress: updatedProgress,
        status,
        pointsEarned,
        ...(completedAt && { completedAt: Timestamp.fromDate(completedAt) }),
      });

      return true;
    } catch (error) {
      console.error('Error updating challenge progress:', error);
      return false;
    }
  }

  /**
   * Get challenge by ID
   */
  async getChallengeById(challengeId: string): Promise<EcoChallenge | null> {
    try {
      const challengeDoc = await getDoc(doc(db, 'challenges', challengeId));
      if (!challengeDoc.exists()) return null;

      const data = challengeDoc.data();
      return {
        id: challengeDoc.id,
        ...data,
        startDate: data.startDate.toDate(),
        endDate: data.endDate.toDate(),
      } as EcoChallenge;
    } catch (error) {
      console.error('Error fetching challenge by ID:', error);
      return null;
    }
  }

  /**
   * Get mock challenges for development/offline use
   */
  private getMockChallenges(): EcoChallenge[] {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return [
      {
        id: 'daily_plastic_free',
        title: 'Plastic-Free Day',
        description: 'Avoid single-use plastics for the entire day',
        type: 'daily',
        category: 'waste',
        difficulty: 'medium',
        pointsReward: 50,
        startDate: now,
        endDate: tomorrow,
        requirements: [
          {
            id: 'no_plastic_bottles',
            description: 'Use reusable water bottle',
            type: 'action',
            target: 1,
            isCompleted: false,
          },
          {
            id: 'no_plastic_bags',
            description: 'Use cloth/paper bags for shopping',
            type: 'action',
            target: 1,
            isCompleted: false,
          },
        ],
        icon: '🌱',
        isActive: true,
        participantCount: 1247,
        completionRate: 0.68,
      },
      {
        id: 'weekly_recycle',
        title: 'Recycling Champion',
        description: 'Recycle at least 10 items this week',
        type: 'weekly',
        category: 'waste',
        difficulty: 'easy',
        pointsReward: 100,
        startDate: now,
        endDate: nextWeek,
        requirements: [
          {
            id: 'recycle_items',
            description: 'Recycle items',
            type: 'quantity',
            target: 10,
            unit: 'items',
            isCompleted: false,
          },
        ],
        icon: '♻️',
        isActive: true,
        participantCount: 892,
        completionRate: 0.45,
      },
      {
        id: 'daily_energy_saver',
        title: 'Energy Saver',
        description: 'Reduce energy consumption by turning off unused devices',
        type: 'daily',
        category: 'energy',
        difficulty: 'easy',
        pointsReward: 30,
        startDate: now,
        endDate: tomorrow,
        requirements: [
          {
            id: 'turn_off_lights',
            description: 'Turn off lights when leaving rooms',
            type: 'action',
            target: 5,
            unit: 'times',
            isCompleted: false,
          },
          {
            id: 'unplug_devices',
            description: 'Unplug unused electronic devices',
            type: 'action',
            target: 3,
            unit: 'devices',
            isCompleted: false,
          },
        ],
        icon: '⚡',
        isActive: true,
        participantCount: 1456,
        completionRate: 0.72,
      },
      {
        id: 'weekly_water_conservation',
        title: 'Water Guardian',
        description: 'Conserve water through mindful usage',
        type: 'weekly',
        category: 'water',
        difficulty: 'medium',
        pointsReward: 75,
        startDate: now,
        endDate: nextWeek,
        requirements: [
          {
            id: 'shorter_showers',
            description: 'Take showers under 5 minutes',
            type: 'duration',
            target: 5,
            unit: 'days',
            isCompleted: false,
          },
          {
            id: 'fix_leaks',
            description: 'Fix any water leaks found',
            type: 'action',
            target: 1,
            isCompleted: false,
          },
        ],
        icon: '💧',
        isActive: true,
        participantCount: 634,
        completionRate: 0.58,
      },
    ];
  }
}

export const challengesService = new ChallengesService();