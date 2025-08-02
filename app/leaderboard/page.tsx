'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  Users,
  Calendar,
  Filter
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { User } from '@/types'

interface LeaderboardEntry {
  user: User
  rank: number
  points: number
  carbonOffset: number
  level: number
  badges: number
  streak: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [timeframe, setTimeframe] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading leaderboard data
    setTimeout(() => {
      const mockLeaderboard: LeaderboardEntry[] = [
        {
          user: {
            uid: '1',
            email: 'eco.champion@example.com',
            displayName: 'Eco Champion',
            photoURL: undefined,
            greenPoints: 2500,
            carbonOffset: 150,
            joinDate: new Date('2024-01-01'),
            level: 15,
            badges: 8
          },
          rank: 1,
          points: 2500,
          carbonOffset: 150,
          level: 15,
          badges: 8,
          streak: 45
        },
        {
          user: {
            uid: '2',
            email: 'green.warrior@example.com',
            displayName: 'Green Warrior',
            photoURL: undefined,
            greenPoints: 2100,
            carbonOffset: 120,
            joinDate: new Date('2024-01-15'),
            level: 12,
            badges: 6
          },
          rank: 2,
          points: 2100,
          carbonOffset: 120,
          level: 12,
          badges: 6,
          streak: 32
        },
        {
          user: {
            uid: '3',
            email: 'sustainability.guru@example.com',
            displayName: 'Sustainability Guru',
            photoURL: undefined,
            greenPoints: 1800,
            carbonOffset: 95,
            joinDate: new Date('2024-02-01'),
            level: 10,
            badges: 5
          },
          rank: 3,
          points: 1800,
          carbonOffset: 95,
          level: 10,
          badges: 5,
          streak: 28
        },
        {
          user: {
            uid: '4',
            email: 'recycle.master@example.com',
            displayName: 'Recycle Master',
            photoURL: undefined,
            greenPoints: 1600,
            carbonOffset: 85,
            joinDate: new Date('2024-01-20'),
            level: 9,
            badges: 4
          },
          rank: 4,
          points: 1600,
          carbonOffset: 85,
          level: 9,
          badges: 4,
          streak: 25
        },
        {
          user: {
            uid: '5',
            email: 'earth.protector@example.com',
            displayName: 'Earth Protector',
            photoURL: undefined,
            greenPoints: 1400,
            carbonOffset: 75,
            joinDate: new Date('2024-02-10'),
            level: 8,
            badges: 3
          },
          rank: 5,
          points: 1400,
          carbonOffset: 75,
          level: 8,
          badges: 3,
          streak: 20
        }
      ]
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1000)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <Trophy className="w-5 h-5 text-gray-400" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300'
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300'
      case 3:
        return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-eco-green rounded-lg flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrate the top eco-warriors making a difference in waste management
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="card text-center">
              <Users className="w-8 h-8 text-eco-green mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="card text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">45,230</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            <div className="card text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">2,450</p>
              <p className="text-sm text-gray-600">kg CO2 Offset</p>
            </div>
            <div className="card text-center">
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Days Active</p>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                  <option value="today">Today</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <div className="card">
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading leaderboard...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.user.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`card border-2 ${getRankColor(entry.rank)} hover:shadow-lg transition-all duration-200`}
                  >
                    <div className="flex items-center space-x-6">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {entry.user.displayName}
                          </h3>
                          <span className="px-2 py-1 bg-eco-green text-white text-xs font-medium rounded-full">
                            Level {entry.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>🏆 {entry.points} points</span>
                          <span>🌱 {entry.carbonOffset}kg CO2</span>
                          <span>🎖️ {entry.badges} badges</span>
                          <span>🔥 {entry.streak} day streak</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-eco-green">
                          #{entry.rank}
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.points} pts
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Community Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 eco-gradient rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Community Challenge</h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Join the "Waste Warriors" challenge and compete with fellow eco-conscious individuals. 
                The top 10 participants will receive exclusive badges and rewards!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">1,000</div>
                  <div className="text-green-100">Target Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">7</div>
                  <div className="text-green-100">Days Left</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">89</div>
                  <div className="text-green-100">Participants</div>
                </div>
              </div>
              <button className="bg-white text-eco-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Join Challenge
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 