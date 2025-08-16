'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Upload, 
  Camera, 
  Brain, 
  Leaf, 
  Recycle, 
  AlertTriangle,
  Zap,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { AIResponse, WasteType } from '@/types'
import toast from 'react-hot-toast'

interface WasteDetectionDemoProps {
  onClose: () => void
}

export function WasteDetectionDemo({ onClose }: WasteDetectionDemoProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        setResult(null)
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResults: AIResponse[] = [
        {
          wasteType: 'recyclable',
          confidence: 0.94,
          disposalMethod: 'Place in blue recycling bin or take to nearest recycling center',
          environmentalImpact: 'Recycling this item saves energy and reduces landfill waste',
          alternatives: ['Reuse as storage container', 'Donate if in good condition'],
          pointsEarned: 25
        },
        {
          wasteType: 'organic',
          confidence: 0.87,
          disposalMethod: 'Compost at home or use municipal composting facility',
          environmentalImpact: 'Composting creates nutrient-rich soil and reduces methane emissions',
          alternatives: ['Use as animal feed', 'Create natural fertilizer'],
          pointsEarned: 15
        },
        {
          wasteType: 'hazardous',
          confidence: 0.91,
          disposalMethod: 'Take to hazardous waste collection center - DO NOT dispose in regular trash',
          environmentalImpact: 'Proper disposal prevents soil and water contamination',
          alternatives: ['Use eco-friendly alternatives', 'Check for take-back programs'],
          pointsEarned: 50
        }
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)
      toast.success('Analysis complete!')
    } catch (error) {
      toast.error('Failed to analyze image. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getWasteTypeIcon = (type: WasteType) => {
    switch (type) {
      case 'organic':
        return <Leaf className="w-6 h-6 text-green-600" />
      case 'recyclable':
        return <Recycle className="w-6 h-6 text-blue-600" />
      case 'hazardous':
        return <AlertTriangle className="w-6 h-6 text-red-600" />
      case 'electronic':
        return <Zap className="w-6 h-6 text-yellow-600" />
      default:
        return <Brain className="w-6 h-6 text-gray-600" />
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-eco-green rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Waste Detection</h2>
              <p className="text-sm text-gray-600">Upload an image to classify waste</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Upload Area */}
          {!uploadedImage && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-eco-green bg-green-50'
                  : 'border-gray-300 hover:border-eco-green hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? 'Drop the image here' : 'Upload waste image'}
              </p>
              <p className="text-gray-600">
                Drag & drop or click to select an image (max 5MB)
              </p>
              <div className="mt-4 flex justify-center">
                <Camera className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}

          {/* Image Preview */}
          {uploadedImage && (
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Analyze with AI</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 space-y-4"
              >
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getWasteTypeIcon(result.wasteType)}
                      <span className="text-lg font-semibold capitalize">
                        {result.wasteType} Waste
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getWasteTypeColor(result.wasteType)}`}>
                      {Math.round(result.confidence * 100)}% confidence
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Disposal Method</h4>
                      <p className="text-gray-700">{result.disposalMethod}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Environmental Impact</h4>
                      <p className="text-gray-700">{result.environmentalImpact}</p>
                    </div>

                    {result.alternatives.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Alternatives</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {result.alternatives.map((alt, index) => (
                            <li key={index}>{alt}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-eco-green">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">
                        +{result.pointsEarned} Green Points earned!
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      setUploadedImage(null)
                      setResult(null)
                    }}
                    className="btn-secondary"
                  >
                    Try Another Image
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 