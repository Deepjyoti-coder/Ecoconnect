'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Upload, 
  Brain, 
  Leaf, 
  Recycle, 
  AlertTriangle,
  Zap,
  CheckCircle,
  Loader2,
  X,
  MapPin,
  Share2,
  BookOpen,
  Trophy
} from 'lucide-react'
import { AIResponse, WasteType } from '@/types'
import { Navbar } from '@/components/Navbar'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function DetectWaste() {
  const { user } = useAuth()
  const router = useRouter()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [showVendors, setShowVendors] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setResult(null)
        setShowVendors(false)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const analyzeImage = async () => {
    if (!uploadedImage) return

    setIsAnalyzing(true)
    
    try {
      // Simulate AI analysis with mock data
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockResults: AIResponse[] = [
        {
          wasteType: 'recyclable',
          confidence: 0.94,
          disposalMethod: 'Place in blue recycling bin or take to nearest recycling center. Make sure to clean the item before recycling.',
          environmentalImpact: 'Recycling this item saves energy equivalent to powering a light bulb for 6 hours and reduces landfill waste.',
          alternatives: ['Reuse as storage container', 'Donate if in good condition', 'Upcycle into art project'],
          pointsEarned: 25
        },
        {
          wasteType: 'organic',
          confidence: 0.87,
          disposalMethod: 'Compost at home or use municipal composting facility. Break down into smaller pieces for faster decomposition.',
          environmentalImpact: 'Composting creates nutrient-rich soil and reduces methane emissions from landfills by 50%.',
          alternatives: ['Use as animal feed', 'Create natural fertilizer', 'Make organic cleaning solutions'],
          pointsEarned: 15
        },
        {
          wasteType: 'hazardous',
          confidence: 0.91,
          disposalMethod: 'Take to hazardous waste collection center - DO NOT dispose in regular trash. Contact local municipality for collection schedule.',
          environmentalImpact: 'Proper disposal prevents soil and water contamination, protecting ecosystems and public health.',
          alternatives: ['Use eco-friendly alternatives', 'Check for take-back programs', 'Reduce consumption'],
          pointsEarned: 50
        },
        {
          wasteType: 'electronic',
          confidence: 0.89,
          disposalMethod: 'Take to e-waste recycling center or use manufacturer take-back program. Remove batteries if possible.',
          environmentalImpact: 'E-waste recycling recovers valuable materials and prevents toxic substances from entering the environment.',
          alternatives: ['Repair if possible', 'Donate to schools/charities', 'Sell for parts'],
          pointsEarned: 75
        }
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)
      toast.success('Analysis complete! You earned Green Points!')
    } catch (error) {
      toast.error('Failed to analyze image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getWasteTypeIcon = (type: WasteType) => {
    switch (type) {
      case 'organic':
        return <Leaf className="w-8 h-8 text-green-600" />
      case 'recyclable':
        return <Recycle className="w-8 h-8 text-blue-600" />
      case 'hazardous':
        return <AlertTriangle className="w-8 h-8 text-red-600" />
      case 'electronic':
        return <Zap className="w-8 h-8 text-yellow-600" />
      default:
        return <Brain className="w-8 h-8 text-gray-600" />
    }
  }

  const getWasteTypeColor = (type: WasteType) => {
    switch (type) {
      case 'organic':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'recyclable':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'hazardous':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'electronic':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getWasteTypeDescription = (type: WasteType) => {
    switch (type) {
      case 'organic':
        return 'Biodegradable waste that can be composted'
      case 'recyclable':
        return 'Materials that can be processed and reused'
      case 'hazardous':
        return 'Dangerous materials requiring special disposal'
      case 'electronic':
        return 'Electronic devices and components'
      default:
        return 'Other types of waste'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-eco-green rounded-lg flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">AI Waste Detection</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload a photo of waste and our AI will instantly classify it, provide disposal guidance, and award you Green Points!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Waste Image</h2>
                
                {!uploadedImage ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-eco-green bg-green-50'
                        : 'border-gray-300 hover:border-eco-green hover:bg-gray-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      {isDragActive ? 'Drop the image here' : 'Upload waste image'}
                    </p>
                    <p className="text-gray-600 mb-4">
                      Drag & drop or click to select an image (max 5MB)
                    </p>
                    <div className="flex justify-center">
                      <Camera className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded waste"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setUploadedImage(null)
                          setResult(null)
                          setShowVendors(false)
                        }}
                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Analyzing with AI...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-5 h-5" />
                          <span>Analyze Waste</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="card"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
                      <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getWasteTypeColor(result.wasteType)}`}>
                        {Math.round(result.confidence * 100)}% confidence
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Waste Type */}
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        {getWasteTypeIcon(result.wasteType)}
                        <div>
                          <h3 className="text-lg font-semibold capitalize text-gray-900">
                            {result.wasteType} Waste
                          </h3>
                          <p className="text-gray-600">
                            {getWasteTypeDescription(result.wasteType)}
                          </p>
                        </div>
                      </div>

                      {/* Disposal Method */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-eco-green" />
                          <span>Disposal Method</span>
                        </h4>
                        <p className="text-gray-700 bg-green-50 p-3 rounded-lg">
                          {result.disposalMethod}
                        </p>
                      </div>

                      {/* Environmental Impact */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Environmental Impact</h4>
                        <p className="text-gray-700">
                          {result.environmentalImpact}
                        </p>
                      </div>

                      {/* Alternatives */}
                      {result.alternatives.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Alternatives</h4>
                          <ul className="space-y-2">
                            {result.alternatives.map((alt, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-eco-green rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{alt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Points Earned */}
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-6 h-6 text-eco-green" />
                            <span className="font-semibold text-gray-900">
                              +{result.pointsEarned} Green Points earned!
                            </span>
                          </div>
                          <button className="text-eco-green hover:text-green-600">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowVendors(!showVendors)}
                          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Find Vendors</span>
                        </button>
                        <Link href="/learn" className="flex-1">
                          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Learn More</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="card">
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Ready to analyze?
                      </h3>
                      <p className="text-gray-600">
                        Upload an image of waste to get started with AI-powered classification
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Vendor Recommendations */}
          <AnimatePresence>
            {showVendors && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                <div className="card">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Nearby Vendors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: 'Green Earth Recycling',
                        type: 'recycler',
                        distance: '0.8 km',
                        rating: 4.5,
                        services: ['Plastic', 'Paper', 'Metal']
                      },
                      {
                        name: 'Eco Waste Solutions',
                        type: 'municipal',
                        distance: '1.2 km',
                        rating: 4.2,
                        services: ['All types', 'Hazardous waste']
                      },
                      {
                        name: 'Community Compost Center',
                        type: 'ngo',
                        distance: '2.1 km',
                        rating: 4.8,
                        services: ['Organic waste', 'Composting']
                      }
                    ].map((vendor, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-eco-green transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                          <span className="text-sm text-gray-500">{vendor.distance}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{vendor.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {vendor.services.map((service, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 