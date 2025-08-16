// Type definitions based on the web app types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  greenPoints: number;
  carbonOffset: number;
  joinDate: Date;
  level: number;
  badges: Badge[];
}

export interface MobileUser extends User {
  deviceInfo: {
    platform: 'ios' | 'android';
    version: string;
    pushToken?: string;
  };
  preferences: {
    notifications: NotificationPreferences;
    cameraSettings: CameraSettings;
    locationSharing: boolean;
  };
  offlineData: {
    lastSyncTimestamp: number;
    pendingActions: OfflineAction[];
    cachedVendors: Vendor[];
  };
}

export interface WasteItem {
  id: string;
  userId: string;
  imageUrl: string;
  wasteType: WasteType;
  confidence: number;
  disposalMethod: string;
  location?: {
    lat: number;
    lng: number;
  };
  timestamp: Date;
  pointsEarned: number;
}

export type WasteType = 
  | 'organic'
  | 'recyclable'
  | 'hazardous'
  | 'electronic'
  | 'medical'
  | 'other';

export interface Vendor {
  id: string;
  name: string;
  type: 'recycler' | 'ngo' | 'municipal';
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  services: string[];
  rating: number;
  isVerified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AIResponse {
  wasteType: WasteType;
  confidence: number;
  disposalMethod: string;
  environmentalImpact: string;
  alternatives: string[];
  pointsEarned: number;
}

export interface OfflineAction {
  id: string;
  type: 'WASTE_CLASSIFICATION' | 'PROFILE_UPDATE' | 'VENDOR_RATING';
  payload: any;
  timestamp: number;
  retryCount: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface NotificationPreferences {
  achievements: boolean;
  challenges: boolean;
  reminders: boolean;
  marketing: boolean;
}

export interface CameraSettings {
  quality: 'low' | 'medium' | 'high';
  autoAnalyze: boolean;
  saveToGallery: boolean;
}

export interface UserStats {
  totalWasteClassified: number;
  carbonOffsetAchieved: number;
  streakDays: number;
  level: number;
}

export interface EcoChallenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'waste' | 'energy' | 'water' | 'transport' | 'lifestyle';
  difficulty: 'easy' | 'medium' | 'hard';
  pointsReward: number;
  startDate: Date;
  endDate: Date;
  requirements: ChallengeRequirement[];
  icon: string;
  isActive: boolean;
  participantCount: number;
  completionRate: number;
}

export interface ChallengeRequirement {
  id: string;
  description: string;
  type: 'action' | 'quantity' | 'duration';
  target: number;
  unit?: string;
  isCompleted: boolean;
}

export interface UserChallengeProgress {
  id: string;
  userId: string;
  challengeId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  progress: ChallengeProgress[];
  startedAt: Date;
  completedAt?: Date;
  pointsEarned: number;
}

export interface ChallengeProgress {
  requirementId: string;
  currentValue: number;
  targetValue: number;
  isCompleted: boolean;
  lastUpdated: Date;
}