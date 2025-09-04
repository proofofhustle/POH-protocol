"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NFTCard, type NFTMetadata } from "@/components/nft-card"
import { Link } from "next/link"
import {
  TrendingUp,
  GitCommit,
  Award,
  Zap,
  BookOpen,
  ArrowUp,
  ArrowLeft,
  Home,
  Settings,
  LogOut,
  Crown,
  Bell,
  Code,
  Trophy,
  Star,
  Flame,
} from "lucide-react"
import Image from "next/image"

// Mock data for demonstration
const mockUser = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "/developer-avatar.png",
  hustleScore: 850,
  level: 7,
  notifications: 3,
}

const mockNFTData: NFTMetadata = {
  id: "0x1a2b3c4d5e6f",
  name: "Developer Hustler",
  level: 7,
  totalCommits: 1247,
  currentStreak: 127,
  longestStreak: 189,
  coursesCompleted: 12,
  totalCourses: 15,
  badges: ["React Master", "TypeScript Pro", "Web3 Pioneer", "Git Guru", "100 Commits"],
  createdAt: "2024-01-15T00:00:00Z",
  lastUpdated: "2024-12-09T00:00:00Z",
  rarity: "legendary",
  experience: 8750,
  nextLevelExp: 10000,
}

const activityFeed = [
  {
    type: "commit",
    description: "5 commits to proof-of-hustle/frontend",
    time: "2 hours ago",
    points: 50,
    icon: GitCommit,
  },
  {
    type: "course",
    description: 'Completed "Advanced React Patterns" course',
    time: "1 day ago",
    points: 100,
    icon: BookOpen,
  },
  {
    type: "hackathon",
    description: "Joined ETHGlobal Hackathon 2024",
    time: "2 days ago",
    points: 200,
    icon: Code,
  },
  {
    type: "badge",
    description: 'Earned "TypeScript Pro" badge',
    time: "3 days ago",
    points: 150,
    icon: Award,
  },
  {
    type: "commit",
    description: "12 commits across 3 repositories",
    time: "4 days ago",
    points: 120,
    icon: GitCommit,
  },
]

const milestoneNFTs = [
  {
    name: "100 Commits",
    description: "Reached 100 total commits",
    earned: true,
    progress: 100,
    icon: "🎯",
  },
  {
    name: "First Hackathon",
    description: "Participated in your first hackathon",
    earned: true,
    progress: 100,
    icon: "🏆",
  },
  {
    name: "Streak Master",
    description: "Maintain a 30-day commit streak",
    earned: true,
    progress: 100,
    icon: "🔥",
  },
  {
    name: "Course Graduate",
    description: "Complete 10 online courses",
    earned: true,
    progress: 100,
    icon: "🎓",
  },
  {
    name: "Open Source Hero",
    description: "Contribute to 5 open source projects",
    earned: false,
    progress: 60,
    icon: "⭐",
  },
  {
    name: "Community Leader",
    description: "Help 50 developers in the community",
    earned: false,
    progress: 46,
    icon: "👥",
  },
]

const sidebarItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "hustlescore", label: "HustleScore", icon: TrendingUp },
  { id: "contributions", label: "Contributions", icon: GitCommit },
  { id: "badges", label: "Badges", icon: Award },
  { id: "leaderboard", label: "Leaderboard", icon: Crown },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("home")

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />
      case "hustlescore":
        return <HustleScoreSection />
      case "contributions":
        return <ContributionsSection />
      case "badges":
        return <BadgesSection />
      case "leaderboard":
        return <LeaderboardSection />
      case "settings":
        return <SettingsSection />
      default:
        return <HomeSection />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <Image src="/images/poh-logo.jpg" alt="Proof-of-Hustle Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">Proof-of-Hustle</span>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold capitalize">{activeSection}</h1>
              <p className="text-muted-foreground">Welcome back, {mockUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Sync GitHub
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>
                {mockUser.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {mockUser.notifications}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="font-medium">{mockUser.name}</div>
                  <div className="text-sm text-muted-foreground">{mockUser.username}</div>
                </div>
                <Avatar>
                  <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

function HomeSection() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HustleScore</CardTitle>
            <div className="p-2 bg-primary/10 rounded-full">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">850</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              <span className="text-green-500">+12%</span>
              <span className="ml-1">from last month</span>
            </div>
            <Progress value={85} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500 mb-2">127</div>
            <p className="text-xs text-muted-foreground">days active</p>
            <div className="mt-3 flex items-center space-x-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="w-2 h-6 bg-orange-500/20 rounded-sm">
                  <div
                    className="w-full bg-orange-500 rounded-sm transition-all duration-500"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <GitCommit className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 mb-2">1,247</div>
            <p className="text-xs text-muted-foreground">this year</p>
            <div className="mt-3 text-xs text-blue-500 font-medium">+23 this week</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Award className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-500 mb-2">5</div>
            <p className="text-xs text-muted-foreground">out of 8 available</p>
            <Progress value={62.5} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Activity Feed
            </CardTitle>
            <CardDescription>Your latest contributions, courses, and hackathons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityFeed.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">+{activity.points} XP</div>
                    <div className="text-xs text-muted-foreground">{activity.type}</div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
            <CardDescription>8,750 / 10,000 XP to Level 8</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Progress value={87.5} className="h-4" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full animate-pulse" />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Level 7</span>
              <span className="font-medium text-primary">1,250 XP needed</span>
              <span>Level 8</span>
            </div>
            <div className="space-y-3 pt-2">
              <div className="text-sm font-medium">Ways to earn XP:</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>• Daily commits</span>
                  <span className="text-primary font-medium">+10 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>• Complete courses</span>
                  <span className="text-primary font-medium">+100 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>• Earn badges</span>
                  <span className="text-primary font-medium">+50 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>• Join hackathons</span>
                  <span className="text-primary font-medium">+200 XP</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HustleScoreSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your HustleScore</CardTitle>
          <CardDescription>Track your developer performance and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8">
            <div className="relative inline-block">
              <div className="text-8xl font-bold text-primary mb-4 animate-pulse">850</div>
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                +12%
              </div>
            </div>
            <div className="text-lg text-muted-foreground mb-6">Current HustleScore</div>
            <div className="max-w-md mx-auto space-y-4">
              <Progress value={85} className="h-6" />
              <div className="text-sm text-muted-foreground">Top 15% of developers</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xl font-bold text-primary">340 pts</div>
                  <div className="text-muted-foreground">Code Contributions (40%)</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xl font-bold text-primary">255 pts</div>
                  <div className="text-muted-foreground">Learning Progress (30%)</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xl font-bold text-primary">170 pts</div>
                  <div className="text-muted-foreground">Consistency (20%)</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-xl font-bold text-primary">85 pts</div>
                  <div className="text-muted-foreground">Community Impact (10%)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>How your HustleScore is calculated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Code Contributions (40%)</span>
                <span className="font-medium text-primary">340 pts</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Learning Progress (30%)</span>
                <span className="font-medium text-primary">255 pts</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Consistency (20%)</span>
                <span className="font-medium text-primary">170 pts</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Community Impact (10%)</span>
                <span className="font-medium text-primary">85 pts</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Your progress over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Dec", "Nov", "Oct", "Sep", "Aug", "Jul"].map((month, index) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month} 2024</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${85 + index * 2}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">{850 - index * 20}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ContributionsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-primary" />
            Contribution Tracker
          </CardTitle>
          <CardDescription>Your coding activity and GitHub contributions over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-53 gap-1">
              {Array.from({ length: 365 }, (_, i) => {
                const intensity = Math.random()
                return (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer ${
                      intensity > 0.8
                        ? "bg-primary shadow-sm"
                        : intensity > 0.6
                          ? "bg-primary/70"
                          : intensity > 0.3
                            ? "bg-primary/40"
                            : intensity > 0.1
                              ? "bg-primary/20"
                              : "bg-muted"
                    }`}
                    title={`Day ${i + 1}: ${Math.floor(intensity * 10)} contributions`}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-muted rounded-sm" />
                <div className="w-3 h-3 bg-primary/20 rounded-sm" />
                <div className="w-3 h-3 bg-primary/40 rounded-sm" />
                <div className="w-3 h-3 bg-primary/70 rounded-sm" />
                <div className="w-3 h-3 bg-primary rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Total Commits</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">127</div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">189</div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">23</div>
              <div className="text-sm text-muted-foreground">Repositories</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BadgesSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Your NFT Collection
          </CardTitle>
          <CardDescription>Showcase your milestone achievements as soulbound NFTs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <NFTCard metadata={mockNFTData} variant="detailed" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestone Badges</CardTitle>
          <CardDescription>Earn badges for reaching important developer milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestoneNFTs.map((milestone, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 hover:scale-105 ${
                  milestone.earned
                    ? "border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg"
                    : "border-muted-foreground/20 hover:border-primary/20"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{milestone.icon}</div>
                  <CardTitle className={`text-lg ${milestone.earned ? "text-foreground" : "text-muted-foreground"}`}>
                    {milestone.name}
                  </CardTitle>
                  <CardDescription>{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    {milestone.earned && <Badge className="w-full justify-center mt-3">Earned</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LeaderboardSection() {
  const topHustlers = [
    { rank: 1, name: "Sarah Kim", score: 1250, avatar: "/developer-1.jpg", streak: 245, badges: 8 },
    { rank: 2, name: "Mike Johnson", score: 1180, avatar: "/developer-2.jpg", streak: 189, badges: 7 },
    { rank: 3, name: "Alex Chen", score: 850, avatar: "/developer-3.jpg", streak: 127, badges: 5 },
    { rank: 4, name: "Lisa Wang", score: 820, avatar: "/developer-4.jpg", streak: 98, badges: 6 },
    { rank: 5, name: "David Brown", score: 780, avatar: "/developer-5.jpg", streak: 156, badges: 4 },
    { rank: 6, name: "Emma Wilson", score: 750, avatar: "/developer-1.jpg", streak: 87, badges: 5 },
    { rank: 7, name: "James Lee", score: 720, avatar: "/developer-2.jpg", streak: 134, badges: 4 },
    { rank: 8, name: "Sofia Garcia", score: 690, avatar: "/developer-3.jpg", streak: 76, badges: 3 },
    { rank: 9, name: "Ryan Chen", score: 650, avatar: "/developer-4.jpg", streak: 92, badges: 4 },
    { rank: 10, name: "Maya Patel", score: 620, avatar: "/developer-5.jpg", streak: 65, badges: 3 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            Top 10 Hustlers
          </CardTitle>
          <CardDescription>See how you rank against other developers worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topHustlers.map((hustler, index) => (
              <div
                key={hustler.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.02] ${
                  hustler.rank === 3
                    ? "bg-primary/10 border border-primary/20 shadow-md"
                    : "bg-muted/50 hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      hustler.rank === 1
                        ? "bg-yellow-500 text-yellow-900 shadow-lg"
                        : hustler.rank === 2
                          ? "bg-gray-400 text-gray-900 shadow-lg"
                          : hustler.rank === 3
                            ? "bg-orange-500 text-orange-900 shadow-lg"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {hustler.rank}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={hustler.avatar || "/placeholder.svg"} alt={hustler.name} />
                    <AvatarFallback>
                      {hustler.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-lg">{hustler.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span>{hustler.streak} day streak</span>
                      <span>{hustler.badges} badges</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{hustler.score}</div>
                  <div className="text-sm text-muted-foreground">HustleScore</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your profile and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">GitHub Username</label>
              <div className="mt-1 p-2 bg-muted rounded border">alexchen</div>
            </div>
            <div>
              <label className="text-sm font-medium">Email Notifications</label>
              <div className="mt-1">
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
