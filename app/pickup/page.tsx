"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Calendar, Clock, Truck, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function PickupPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([])
  const [isScheduled, setIsScheduled] = useState(false)

  const wasteTypes = [
    { id: "plastic", label: "Plastic", icon: "🥤" },
    { id: "paper", label: "Paper & Cardboard", icon: "📄" },
    { id: "metal", label: "Metal", icon: "🥫" },
    { id: "glass", label: "Glass", icon: "🍶" },
    { id: "electronics", label: "E-waste", icon: "📱" },
    { id: "organic", label: "Organic Waste", icon: "🍎" },
  ]

  const recyclers = [
    {
      name: "GreenCycle Solutions",
      rating: 4.8,
      distance: "2.3 km",
      specialties: ["Plastic", "Paper", "Metal"],
      nextAvailable: "Today, 2:00 PM",
      price: "Free pickup",
    },
    {
      name: "EcoWaste Collectors",
      rating: 4.6,
      distance: "3.1 km",
      specialties: ["E-waste", "Glass", "Metal"],
      nextAvailable: "Tomorrow, 10:00 AM",
      price: "₹50 for e-waste",
    },
    {
      name: "Local Kabadiwala",
      rating: 4.9,
      distance: "1.8 km",
      specialties: ["Paper", "Plastic", "Metal"],
      nextAvailable: "Today, 4:00 PM",
      price: "Pays ₹15/kg",
    },
  ]

  const handleWasteTypeChange = (wasteType: string, checked: boolean) => {
    if (checked) {
      setSelectedWasteTypes([...selectedWasteTypes, wasteType])
    } else {
      setSelectedWasteTypes(selectedWasteTypes.filter((type) => type !== wasteType))
    }
  }

  const handleSchedulePickup = () => {
    setIsScheduled(true)
  }

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <nav className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold text-green-800">EcoConnect</span>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pickup Scheduled Successfully! 🎉</h1>
            <p className="text-gray-600 mb-8">
              Your waste pickup has been confirmed. GreenCycle Solutions will arrive at your location on the scheduled
              time.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recycler:</span>
                  <span className="font-medium">GreenCycle Solutions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Waste Types:</span>
                  <span className="font-medium">{selectedWasteTypes.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup ID:</span>
                  <span className="font-medium">#ECO-2024-001</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/upload">Upload More Waste</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
            <Link href="/upload">Upload Waste</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule Waste Pickup</h1>
            <p className="text-gray-600">Connect with local recyclers and schedule convenient pickup times</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pickup Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Pickup Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea id="address" placeholder="Enter your complete address with landmarks" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="400001" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste Types</CardTitle>
                  <CardDescription>Select the types of waste you want to dispose</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {wasteTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedWasteTypes.includes(type.label)}
                          onCheckedChange={(checked) => handleWasteTypeChange(type.label, checked as boolean)}
                        />
                        <Label htmlFor={type.id} className="flex items-center cursor-pointer">
                          <span className="mr-2">{type.icon}</span>
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        className="mt-1"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any special instructions for the pickup team" className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Recyclers */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-green-600" />
                    Available Recyclers Near You
                  </CardTitle>
                  <CardDescription>Choose from verified local recyclers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recyclers.map((recycler, index) => (
                    <Card key={index} className="border-2 hover:border-green-300 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{recycler.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                {recycler.rating}
                              </div>
                              <span>•</span>
                              <span>{recycler.distance} away</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{recycler.price}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Specializes in: </span>
                            <span className="text-sm text-gray-600">{recycler.specialties.join(", ")}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1 text-green-600" />
                            <span className="text-gray-600">Next available: </span>
                            <span className="font-medium ml-1">{recycler.nextAvailable}</span>
                          </div>
                        </div>

                        <Button
                          className="w-full mt-3"
                          onClick={handleSchedulePickup}
                          disabled={!selectedDate || !selectedTime || selectedWasteTypes.length === 0}
                        >
                          Select This Recycler
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Pickup Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p>Interactive map showing recycler locations</p>
                      <p className="text-sm">Map integration coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
