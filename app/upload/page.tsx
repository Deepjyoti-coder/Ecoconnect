"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, Upload, Sparkles, ArrowRight, RotateCcw, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [wasteType, setWasteType] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
        analyzeImage(file)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  })

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true)
    setAnalysisComplete(false)

    // Simulate AI analysis
    setTimeout(() => {
      // Mock AI results based on common waste items
      const mockResults = [
        {
          type: "Plastic Bottle",
          suggestions: [
            {
              title: "Self-Watering Planter",
              description: "Create a beautiful planter with automatic watering system",
              difficulty: "Easy",
              time: "15 mins",
              materials: ["Plastic bottle", "String", "Soil", "Seeds"],
            },
            {
              title: "Bird Feeder",
              description: "Make a colorful bird feeder for your garden",
              difficulty: "Easy",
              time: "10 mins",
              materials: ["Plastic bottle", "Wooden spoons", "String", "Bird seeds"],
            },
            {
              title: "Piggy Bank",
              description: "Transform into a fun savings bank for kids",
              difficulty: "Medium",
              time: "20 mins",
              materials: ["Plastic bottle", "Paint", "Cork", "Decorations"],
            },
          ],
        },
        {
          type: "Cardboard Box",
          suggestions: [
            {
              title: "Storage Organizer",
              description: "Create compartmentalized storage for small items",
              difficulty: "Easy",
              time: "25 mins",
              materials: ["Cardboard", "Fabric", "Glue", "Scissors"],
            },
            {
              title: "Kids Play House",
              description: "Build a mini playhouse for children",
              difficulty: "Medium",
              time: "45 mins",
              materials: ["Large cardboard", "Paint", "Tape", "Markers"],
            },
          ],
        },
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setWasteType(randomResult.type)
      setSuggestions(randomResult.suggestions)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setWasteType("")
    setSuggestions([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold text-green-800">EcoConnect</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/pickup">Schedule Pickup</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Upcycling Assistant</h1>
            <p className="text-gray-600">
              Upload a photo of your waste item and discover creative ways to give it a new life
            </p>
          </div>

          {!uploadedImage ? (
            <Card className="border-2 border-dashed border-green-300 hover:border-green-400 transition-colors">
              <CardContent className="p-12">
                <div {...getRootProps()} className={`text-center cursor-pointer ${isDragActive ? "bg-green-50" : ""}`}>
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {isDragActive ? (
                      <Upload className="w-8 h-8 text-green-600" />
                    ) : (
                      <Camera className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isDragActive ? "Drop your image here" : "Upload Waste Image"}
                  </h3>
                  <p className="text-gray-600 mb-4">Drag and drop an image or click to browse</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">Supports: JPG, PNG, WebP (Max 10MB)</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Uploaded Image */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Image Uploaded
                    </CardTitle>
                    <CardDescription>
                      {isAnalyzing
                        ? "Analyzing your waste item..."
                        : analysisComplete
                          ? `Identified: ${wasteType}`
                          : "Ready for analysis"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetUpload}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Upload New
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded waste item"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                    <div className="md:w-2/3">
                      {isAnalyzing && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
                            <span className="font-medium">AI Analysis in Progress</span>
                          </div>
                          <Progress value={66} className="w-full" />
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>✓ Image processed</div>
                            <div>✓ Object detection complete</div>
                            <div className="animate-pulse">⏳ Generating upcycling ideas...</div>
                          </div>
                        </div>
                      )}

                      {analysisComplete && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Analysis Complete!</span>
                          </div>
                          <div>
                            <Badge className="bg-green-100 text-green-800">{wasteType}</Badge>
                          </div>
                          <p className="text-gray-600">
                            Great news! We found {suggestions.length} creative ways to upcycle your{" "}
                            {wasteType.toLowerCase()}.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcycling Suggestions */}
              {analysisComplete && suggestions.length > 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcycling Ideas for Your {wasteType}</h2>
                    <p className="text-gray-600">Transform your waste into something amazing!</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {suggestions.map((suggestion, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow group">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant={suggestion.difficulty === "Easy" ? "default" : "secondary"}>
                              {suggestion.difficulty}
                            </Badge>
                            <span className="text-sm text-gray-500">{suggestion.time}</span>
                          </div>
                          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                          <CardDescription>{suggestion.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Materials needed:</h4>
                              <div className="flex flex-wrap gap-1">
                                {suggestion.materials.map((material: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {material}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button className="w-full group-hover:bg-green-700 transition-colors">
                              View Tutorial
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center pt-6">
                    <p className="text-gray-600 mb-4">
                      Can't upcycle right now? Schedule a pickup with local recyclers!
                    </p>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/pickup">
                        Schedule Pickup
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
