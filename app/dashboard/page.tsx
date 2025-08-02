"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Recycle, Calendar, Award, Leaf, Target, Gift } from "lucide-react"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export default function DashboardPage() {
  const wasteData = [
    { name: "Plastic", value: 45, color: "#3B82F6" },
    { name: "Paper", value: 30, color: "#10B981" },
    { name: "Metal", value: 15, color: "#F59E0B" },
    { name: "Glass", value: 10, color: "#8B5CF6" },
  ]

  const monthlyData = [
    { month: "Jan", recycled: 12 },
    { month: "Feb", recycled: 19 },
    { month: "Mar", recycled: 15 },
    { month: "Apr", recycled: 25 },
    { month: "May", recycled: 22 },
    { month: "Jun", recycled: 30 },
  ]

  const impactData = [
    { month: "Jan", co2Saved: 5.2 },
    { month: "Feb", co2Saved: 8.1 },
    { month: "Mar", co2Saved: 6.3 },
    { month: "Apr", co2Saved: 10.5 },
    { month: "May", co2Saved: 9.2 },
    { month: "Jun", co2Saved: 12.8 },
  ]

  const leaderboard = [
    { name: "Priya Sharma", points: 2450, recycled: "89kg", badge: "Eco Champion" },
    { name: "Rajesh Kumar", points: 2380, recycled: "85kg", badge: "Green Warrior" },
    { name: "You", points: 2250, recycled: "78kg", badge: "Eco Hero", isCurrentUser: true },
    { name: "Anita Patel", points: 2100, recycled: "72kg", badge: "Green Guardian" },
    { name: "Vikram Singh", points: 1950, recycled: "68kg", badge: "Eco Defender" },
  ]

  const recentActivities = [
    { type: "pickup", description: "Plastic bottles pickup completed", points: 150, date: "2 hours ago" },
    { type: "upcycle", description: "Created bird feeder from plastic bottle", points: 200, date: "1 day ago" },
    { type: "pickup", description: "Paper waste pickup scheduled", points: 100, date: "2 days ago" },
    { type: "achievement", description: "Earned 'Eco Hero' badge", points: 500, date: "3 days ago" },
  ]

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
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/upload">Upload Waste</Link>
            </Button>
            <Button asChild>
              <Link href="/pickup">Schedule Pickup</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Eco Warrior! 🌱</h1>
            <p className="text-gray-600">Track your environmental impact and see how you're making a difference</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Recycled</p>
                    <p className="text-3xl font-bold">78kg</p>
                  </div>
                  <Recycle className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Eco Points</p>
                    <p className="text-3xl font-bold">2,250</p>
                  </div>
                  <Trophy className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">CO₂ Saved</p>
                    <p className="text-3xl font-bold">52kg</p>
                  </div>
                  <Leaf className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Rank</p>
                    <p className="text-3xl font-bold">#3</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Waste Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Waste Type Breakdown</CardTitle>
                    <CardDescription>Your recycling composition this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={wasteData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {wasteData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {wasteData.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">
                            {item.name}: {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest eco-friendly actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.type === "pickup"
                                ? "bg-blue-100"
                                : activity.type === "upcycle"
                                  ? "bg-green-100"
                                  : "bg-purple-100"
                            }`}
                          >
                            {activity.type === "pickup" ? (
                              <Calendar className="w-5 h-5 text-blue-600" />
                            ) : activity.type === "upcycle" ? (
                              <Recycle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Award className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">+{activity.points} pts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Goals Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    Monthly Goals
                  </CardTitle>
                  <CardDescription>Track your progress towards this month's targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Waste Recycled</span>
                        <span>30kg / 40kg</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-gray-500">10kg to go!</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Eco Points</span>
                        <span>2,250 / 3,000</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-gray-500">750 points to go!</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Upcycling Projects</span>
                        <span>3 / 5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      <p className="text-xs text-gray-500">2 projects to go!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Recycling Trend</CardTitle>
                    <CardDescription>Your recycling activity over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="recycled" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                    <CardDescription>CO₂ emissions saved through your recycling efforts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={impactData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="co2Saved" stroke="#059669" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                    Community Leaderboard
                  </CardTitle>
                  <CardDescription>Top Eco-Contributors this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-4 p-4 rounded-lg ${
                          user.isCurrentUser ? "bg-green-50 border-2 border-green-200" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : index === 1
                                ? "bg-gray-100 text-gray-800"
                                : index === 2
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.name}</span>
                            {user.isCurrentUser && <Badge className="bg-green-100 text-green-800">You</Badge>}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{user.recycled} recycled</span>
                            <Badge variant="outline">{user.badge}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{user.points}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="w-5 h-5 mr-2 text-purple-600" />
                      Available Rewards
                    </CardTitle>
                    <CardDescription>Redeem your eco points for exciting rewards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "₹100 Amazon Voucher", points: 1000, available: true },
                        { name: "Plant a Tree", points: 500, available: true },
                        { name: "Eco-friendly Water Bottle", points: 800, available: true },
                        { name: "₹500 Flipkart Voucher", points: 5000, available: false },
                      ].map((reward, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{reward.name}</p>
                            <p className="text-sm text-gray-600">{reward.points} points</p>
                          </div>
                          <Button
                            size="sm"
                            disabled={!reward.available}
                            className={reward.available ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {reward.available ? "Redeem" : "Locked"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Badges</CardTitle>
                    <CardDescription>Achievements you've unlocked</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: "First Upload", icon: "🎯", earned: true },
                        { name: "Eco Hero", icon: "🦸", earned: true },
                        { name: "Recycling Pro", icon: "♻️", earned: true },
                        { name: "Community Leader", icon: "👑", earned: false },
                        { name: "Green Champion", icon: "🏆", earned: false },
                        { name: "Planet Saver", icon: "🌍", earned: false },
                      ].map((badge, index) => (
                        <div
                          key={index}
                          className={`text-center p-3 rounded-lg border ${
                            badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-50"
                          }`}
                        >
                          <div className="text-2xl mb-2">{badge.icon}</div>
                          <p className="text-xs font-medium">{badge.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
