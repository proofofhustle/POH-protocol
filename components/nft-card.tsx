import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GitCommit, Award, Star, Calendar, Code, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NFTMetadata {
  id: string
  name: string
  level: number
  totalCommits: number
  currentStreak: number
  longestStreak: number
  coursesCompleted: number
  totalCourses: number
  badges: string[]
  createdAt: string
  lastUpdated: string
  rarity: "common" | "rare" | "epic" | "legendary"
  experience: number
  nextLevelExp: number
}

interface NFTCardProps {
  metadata: NFTMetadata
  className?: string
  variant?: "default" | "compact" | "detailed"
}

const rarityConfig = {
  common: {
    gradient: "from-gray-500 to-gray-600",
    border: "border-gray-500/20",
    glow: "shadow-gray-500/10",
  },
  rare: {
    gradient: "from-blue-500 to-blue-600",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/10",
  },
  epic: {
    gradient: "from-purple-500 to-purple-600",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/10",
  },
  legendary: {
    gradient: "from-primary to-accent",
    border: "border-primary/20",
    glow: "shadow-primary/10",
  },
}

export function NFTCard({ metadata, className, variant = "default" }: NFTCardProps) {
  const rarity = rarityConfig[metadata.rarity]
  const expProgress = (metadata.experience / metadata.nextLevelExp) * 100

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300",
          rarity.border,
          rarity.glow,
          className,
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div
              className={cn("w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br", rarity.gradient)}
            >
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{metadata.name}</h3>
              <p className="text-sm text-muted-foreground">Level {metadata.level}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{metadata.totalCommits}</div>
              <div className="text-xs text-muted-foreground">commits</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "detailed") {
    return (
      <Card
        className={cn(
          "bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300",
          rarity.border,
          rarity.glow,
          className,
        )}
      >
        <CardHeader className="text-center pb-4">
          <div
            className={cn(
              "w-20 h-20 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
              rarity.gradient,
            )}
          >
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-xl">{metadata.name}</CardTitle>
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="secondary" className="capitalize">
              {metadata.rarity}
            </Badge>
            <Badge variant="outline">Level {metadata.level}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Experience Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Experience</span>
              <span className="font-medium">
                {metadata.experience}/{metadata.nextLevelExp}
              </span>
            </div>
            <Progress value={expProgress} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <GitCommit className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold text-primary">{metadata.totalCommits}</div>
              <div className="text-xs text-muted-foreground">Total Commits</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold text-primary">{metadata.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Code className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold text-primary">{metadata.coursesCompleted}</div>
              <div className="text-xs text-muted-foreground">Courses Done</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
              <div className="text-2xl font-bold text-primary">{metadata.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Course Progress</span>
              <span className="font-medium">
                {metadata.coursesCompleted}/{metadata.totalCourses}
              </span>
            </div>
            <Progress value={(metadata.coursesCompleted / metadata.totalCourses) * 100} className="h-2" />
          </div>

          {/* Badges */}
          {metadata.badges.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Achievements</h4>
              <div className="flex flex-wrap gap-2">
                {metadata.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
            <div>Created: {new Date(metadata.createdAt).toLocaleDateString()}</div>
            <div>Last Updated: {new Date(metadata.lastUpdated).toLocaleDateString()}</div>
            <div>Token ID: {metadata.id}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300",
        rarity.border,
        rarity.glow,
        className,
      )}
    >
      <CardHeader className="text-center">
        <div
          className={cn(
            "w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br",
            rarity.gradient,
          )}
        >
          <Award className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-lg">{metadata.name}</CardTitle>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="outline">Level {metadata.level}</Badge>
          <Badge variant="secondary" className="capitalize">
            {metadata.rarity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-primary">{metadata.currentStreak}</div>
            <div className="text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-primary">{metadata.totalCommits}</div>
            <div className="text-muted-foreground">Commits</div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Courses Completed</span>
            <span className="font-medium">
              {metadata.coursesCompleted}/{metadata.totalCourses}
            </span>
          </div>
          <Progress value={(metadata.coursesCompleted / metadata.totalCourses) * 100} className="h-2" />
        </div>

        {/* Top Badges */}
        {metadata.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {metadata.badges.slice(0, 3).map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
            {metadata.badges.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{metadata.badges.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
