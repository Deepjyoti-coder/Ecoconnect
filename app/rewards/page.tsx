"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Trophy, Coins, ShoppingCart, Award } from "lucide-react"
import Link from "next/link"

export default function RewardsPage() {
  const [userPoints, setUserPoints] = useState(2250)
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([])

  const rewards = [
    {
      id: "amazon-100",
      name: "₹100 Amazon Voucher",
      points: 1000,
      category: "vouchers",
      description: "Shop for anything on Amazon with this voucher",
      image: "🛒",
      popular: true,
    },
    {
      id: "plant-tree",
      name: "Plant a Tree",
      points: 500,
      category: "environment",
      description: "We'll plant a tree in your name in partnership with local NGOs",
      image: "🌳",
      popular: true,
    },
    {
      id: "water-bottle",
      name: "Eco Water Bottle",
      points: 800,
      category: "products",
      description: "Sustainable bamboo fiber water bottle",
      image: "🍶",
    },
    {
      id: "flipkart-500",
      name: "₹500 Flipkart Voucher",
      points: 5000,
      category: "vouchers",
      description: "Premium shopping voucher for Flipkart",
      image: "🛍️",
    },
    {
      id: "solar-charger",
      name: "Solar Phone Charger",
      points: 1500,
      category: "products",
      description: "Portable solar-powered phone charger",
      image: "🔋",
    },
    {
      id: "organic-seeds",
      name: "Organic Seed Kit",
      points: 600,
      category: "environment",
      description: "Grow your own organic vegetables at home",
      image: "🌱",
    },
  ]

  const badges = [
    { name: "First Upload", icon: "🎯", description: "Uploaded your first waste item", earned: true, points: 100 },
    { name: "Eco Hero", icon: "🦸", description: "Recycled 50kg of waste", earned: true, points: 500 },
    { name: "Recycling Pro", icon: "♻️", description: "Completed 25 successful pickups", earned: true, points: 300 },
    { name: "Upcycling Master", icon: "🎨", description: "Created 10 upcycling projects", earned: false, points: 400 },
    {
      name: "Community Leader",
      icon: "👑",
      description: "Referred 10 friends to EcoConnect",
      earned: false,
      points: 1000,
    },
    { name: "Green Champion", icon: "🏆", description: "Top 10 in monthly leaderboard", earned: false, points: 750 },
    { name: "Planet Saver", icon: "🌍", description: "Saved 100kg CO₂ emissions", earned: false, points: 2000 },
  ]

  const recentTransactions = [
    { type: "earned", description: "Plastic bottles pickup completed", points: 150, date: "2 hours ago" },
    { type: "earned", description: "Upcycling project shared", points: 200, date: "1 day ago" },
    { type: "redeemed", description: "Plant a Tree reward", points: -500, date: "3 days ago" },
    { type: "earned", description: "Weekly challenge completed", points: 300, date: "5 days ago" },
  ]

  const handleRedeem = (rewardId: string, points: number) => {
    if (userPoints >= points) {
      setUserPoints(userPoints - points)
      setRedeemedRewards([...redeemedRewards, rewardId])
    }
  }

  const filteredRewards = (category: string) => {
    if (category === "all") return rewards
    return rewards.filter((reward) => reward.category === category)
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
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/upload">Upload Waste</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Eco Rewards Store 🎁</h1>
            <p className="text-gray-600 mb-6">
              Redeem your eco points for amazing rewards and make an even bigger impact!
            </p>

            {/* Points Balance */}
            <Card className="max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Coins className="w-6 h-6" />
                  <span className="text-lg font-medium">Your Balance</span>
                </div>
                <div className="text-4xl font-bold mb-2">{userPoints.toLocaleString()}</div>
                <div className="text-green-100">Eco Points</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="rewards" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
              <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  Vouchers
                </Button>
                <Button variant="outline" size="sm">
                  Products
                </Button>
                <Button variant="outline" size="sm">
                  Environment
                </Button>
              </div>

              {/* Rewards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="hover:shadow-lg transition-shadow relative">
                    {reward.popular && (
                      <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-800">Popular</Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{reward.image}</div>
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Coins className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-green-600">{reward.points}</span>
                          <span className="text-sm text-gray-500">points</span>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {reward.category}
                        </Badge>
                      </div>

                      <Button
                        className="w-full"
                        disabled={userPoints < reward.points || redeemedRewards.includes(reward.id)}
                        onClick={() => handleRedeem(reward.id, reward.points)}
                      >
                        {redeemedRewards.includes(reward.id) ? (
                          "Redeemed ✓"
                        ) : userPoints < reward.points ? (
                          `Need ${reward.points - userPoints} more points`
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Redeem Now
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="badges" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Achievements</h2>
                <p className="text-gray-600">Unlock badges by completing eco-friendly activities</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge, index) => (
                  <Card
                    key={index}
                    className={`text-center ${
                      badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <CardHeader>
                      <div className={`text-4xl mb-2 ${!badge.earned && "grayscale opacity-50"}`}>{badge.icon}</div>
                      <CardTitle className={`text-lg ${!badge.earned && "text-gray-500"}`}>{badge.name}</CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <Coins className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">{badge.points} points</span>
                      </div>
                      {badge.earned ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Award className="w-3 h-3 mr-1" />
                          Earned
                        </Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Progress to Next Badge */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                    Next Achievement
                  </CardTitle>
                  <CardDescription>You're close to unlocking your next badge!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">🎨</div>
                      <div className="flex-1">
                        <h3 className="font-medium">Upcycling Master</h3>
                        <p className="text-sm text-gray-600">Create 10 upcycling projects</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>3/10 projects</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent eco points activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "earned" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "earned" ? (
                            <Coins className="w-5 h-5 text-green-600" />
                          ) : (
                            <Gift className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div
                          className={`font-bold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "earned" ? "+" : ""}
                          {transaction.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Points Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">3,450</div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">1,200</div>
                    <div className="text-sm text-gray-600">Total Redeemed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{userPoints}</div>
                    <div className="text-sm text-gray-600">Current Balance</div>
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
