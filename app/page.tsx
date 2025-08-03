'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  Camera, 
  Trophy, 
  MapPin, 
  Brain, 
  Users,
  ArrowRight,
  Play,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { WasteDetectionDemo } from '@/components/WasteDetectionDemo'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "AI-Powered Detection",
      description: "Upload photos of waste and get instant classification with our advanced AI model."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Gamified Rewards",
      description: "Earn Green Points for eco-friendly actions and redeem them for sustainable products."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Vendor Mapping",
      description: "Find nearby recycling centers, NGOs, and municipal drop-off points."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Guidance",
      description: "Get personalized disposal recommendations and educational content."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Join a community of eco-conscious individuals making a difference."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Carbon Tracking",
      description: "Monitor your environmental impact and track your carbon offset."
    }
  ]

  const stats = [
    { number: "50K+", label: "Users" },
    { number: "100K+", label: "Waste Items Classified" },
    { number: "500+", label: "Vendors Mapped" },
    { number: "10K+", label: "Green Points Earned" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Transform Waste Management with{' '}
                <span className="eco-gradient bg-clip-text text-transparent">
                  AI Power
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join India's first AI-powered, gamified waste management platform. 
                Detect, segregate, and earn rewards while making the planet greener.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <button className="btn-primary flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button 
                  onClick={() => setIsDemoOpen(true)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Try AI Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce-slow">
          <div className="w-4 h-4 bg-eco-green rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse-slow">
          <div className="w-6 h-6 bg-eco-blue rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce-slow">
          <div className="w-3 h-3 bg-eco-yellow rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-eco-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Waste Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with 
              gamification to make waste management engaging and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-eco-green mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 eco-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of users already making the world greener, one waste item at a time.
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-eco-green px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
              Start Your Eco Journey Today
            </button>
          </Link>
        </div>
      </section>

      <Footer />
      
      {/* Demo Modal */}
      {isDemoOpen && (
        <WasteDetectionDemo onClose={() => setIsDemoOpen(false)} />
      )}
    </div>
  )
} 