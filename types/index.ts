export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  greenPoints: number
  carbonOffset: number
  joinDate: Date
  level: number
  badges: Badge[]
}

export interface WasteItem {
  id: string
  userId: string
  imageUrl: string
  wasteType: WasteType
  confidence: number
  disposalMethod: string
  location?: {
    lat: number
    lng: number
  }
  timestamp: Date
  pointsEarned: number
}

export type WasteType = 
  | 'organic'
  | 'recyclable'
  | 'hazardous'
  | 'electronic'
  | 'medical'
  | 'other'

export interface Vendor {
  id: string
  name: string
  type: 'recycler' | 'ngo' | 'municipal'
  address: string
  location: {
    lat: number
    lng: number
  }
  phone: string
  email: string
  services: string[]
  rating: number
  isVerified: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  pointsReward: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  imageUrl: string
  vendorId?: string
  isAvailable: boolean
  category: 'product' | 'discount' | 'donation'
}

export interface CommunityChallenge {
  id: string
  title: string
  description: string
  goal: number
  currentProgress: number
  participants: string[]
  startDate: Date
  endDate: Date
  reward: number
  type: 'waste_collection' | 'recycling' | 'education'
}

export interface AIResponse {
  wasteType: WasteType
  confidence: number
  disposalMethod: string
  environmentalImpact: string
  alternatives: string[]
  pointsEarned: number
} 