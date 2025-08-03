'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  Leaf, 
  TrendingUp, 
  Camera, 
  MapPin, 
  BookOpen,
  Award,
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your eco dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const quickActions = [
    {
      title: 'Detect Waste',
      description: 'Upload a photo to classify waste',
      icon: <Camera className="w-6 h-6" />,
      href: '/detect',
      color: 'bg-blue-500'
    },
    {
      title: 'Find Vendors',
      description: 'Locate nearby recycling centers',
      icon: <MapPin className="w-6 h-6" />,
      href: '/vendors',
      color: 'bg-green-500'
    },
    {
      title: 'Take Quiz',
      description: 'Learn and earn points',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/quiz',
      color: 'bg-purple-500'
    },
    {
      title: 'View Rewards',
      description: 'Redeem your green points',
      icon: <Award className="w-6 h-6" />,
      href: '/rewards',
      color: 'bg-yellow-500'
    }
  ]

  const recentActivity = [
    {
      type: 'waste_detected',
      title: 'Plastic bottle detected',
      description: 'Recyclable waste - 25 points earned',
      time: '2 hours ago',
      points: 25
    },
    {
      type: 'quiz_completed',
      title: 'Waste Segregation Quiz',
      description: 'Perfect score! - 50 points earned',
      time: '1 day ago',
      points: 50
    },
    {
      type: 'vendor_visited',
      title: 'Recycling Center Visit',
      description: 'Dropped off electronics - 100 points earned',
      time: '3 days ago',
      points: 100
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user.displayName}! 🌱
            </h1>
            <p className="text-gray-600">
              Continue your journey towards a sustainable future
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Green Points</p>
                  <p className="text-2xl font-bold text-eco-green">{user.greenPoints}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-eco-green" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Carbon Offset</p>
                  <p className="text-2xl font-bold text-blue-600">{user.carbonOffset}kg</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Level</p>
                  <p className="text-2xl font-bold text-purple-600">{user.level}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Badges</p>
                  <p className="text-2xl font-bold text-yellow-600">{user.badges.length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <Link href="/actions" className="text-eco-green hover:text-green-600 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-eco-green hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-eco-green transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-eco-green transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <Link href="/activity" className="text-eco-green hover:text-green-600 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Activity className="w-4 h-4 text-eco-green" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="text-sm font-medium text-eco-green">
                        +{activity.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 eco-gradient rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to make a difference?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Upload a photo of waste to get started with AI-powered classification and earn your first Green Points!
            </p>
            <Link href="/detect">
              <button className="bg-white text-eco-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <Plus className="w-5 h-5" />
                <span>Start Detecting Waste</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 