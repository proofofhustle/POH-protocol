// Proof-of-Hustle API Integration
// Placeholder functions for fetching contributions and user data

export interface GitHubContribution {
  date: string
  commits: number
  repo: string
  additions: number
  deletions: number
  pullRequests: number
}

export interface UserStats {
  totalCommits: number
  currentStreak: number
  longestStreak: number
  totalRepositories: number
  contributionsThisYear: number
  languagesUsed: string[]
}

export interface CourseProgress {
  id: string
  title: string
  provider: string
  completed: boolean
  progress: number
  completedAt?: string
  certificateUrl?: string
}

export interface BadgeData {
  id: string
  name: string
  description: string
  earned: boolean
  earnedAt?: string
  progress: number
  requirements: string[]
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface HustleScoreBreakdown {
  totalScore: number
  codeContributions: number
  learningProgress: number
  consistency: number
  communityImpact: number
  monthlyTrend: Array<{
    month: string
    score: number
  }>
}

export interface NFTUpdateData {
  level: number
  experience: number
  nextLevelExp: number
  newBadges: string[]
  statsUpdate: Partial<UserStats>
}

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_POH_API_URL || "https://api.proof-of-hustle.com"
const GITHUB_API_URL = "https://api.github.com"

// Helper function for API requests
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_POH_API_KEY || "placeholder-key"}`,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error)
    throw error
  }
}

// Helper function for public API requests (no authentication needed)
async function publicApiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request to ${endpoint} failed:`, error)
    throw error
  }
}

// GitHub API helper
async function githubRequest<T>(endpoint: string, username: string): Promise<T> {
  const url = `${GITHUB_API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || "placeholder-token"}`,
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`GitHub API request to ${endpoint} failed:`, error)
    // Return mock data for development
    return getMockGitHubData(endpoint) as T
  }
}

// Main API functions

/**
 * Fetch user's GitHub contributions for a specific time period
 */
export async function fetchContributions(
  username: string,
  startDate?: string,
  endDate?: string,
): Promise<GitHubContribution[]> {
  try {
    const response = await fetch("/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, startDate, endDate }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch contributions")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock contribution data due to API error:", error)
    return getMockContributions()
  }
}

/**
 * Fetch user's overall GitHub statistics
 */
export async function fetchUserStats(username: string): Promise<UserStats> {
  try {
    const response = await fetch("/api/user-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user stats")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock user stats due to API error:", error)
    return getMockUserStats()
  }
}

/**
 * Fetch user's course progress and completions
 */
export async function fetchCourseProgress(userId: string): Promise<CourseProgress[]> {
  try {
    const response = await fetch("/api/course-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch course progress")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock course data due to API error:", error)
    return getMockCourseProgress()
  }
}

/**
 * Fetch user's earned and available badges
 */
export async function fetchBadges(userId: string): Promise<BadgeData[]> {
  try {
    const response = await fetch("/api/badges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch badges")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock badge data due to API error:", error)
    return getMockBadges()
  }
}

/**
 * Fetch user's HustleScore breakdown and trends
 */
export async function fetchHustleScore(userId: string): Promise<HustleScoreBreakdown> {
  try {
    const response = await fetch("/api/hustle-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch hustle score")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock HustleScore data due to API error:", error)
    return getMockHustleScore()
  }
}

/**
 * Sync user's GitHub data and update NFT
 */
export async function syncGitHubData(username: string, userId: string): Promise<NFTUpdateData> {
  try {
    const response = await fetch("/api/sync-github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, userId }),
    })

    if (!response.ok) {
      throw new Error("Failed to sync GitHub data")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock sync data due to API error:", error)
    return getMockNFTUpdate()
  }
}

/**
 * Update user's NFT metadata
 */
export async function updateNFTMetadata(userId: string, metadata: Partial<any>): Promise<boolean> {
  try {
    const response = await fetch("/api/nft-metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, metadata }),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to update NFT metadata:", error)
    return false
  }
}

/**
 * Fetch leaderboard data
 */
export async function fetchLeaderboard(limit = 10): Promise<
  Array<{
    userId: string
    username: string
    hustleScore: number
    level: number
    rank: number
  }>
> {
  try {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limit }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard")
    }

    return await response.json()
  } catch (error) {
    console.warn("Using mock leaderboard data due to API error:", error)
    return getMockLeaderboard()
  }
}

// Mock data functions for development and fallback

function getMockGitHubData(endpoint: string): any {
  if (endpoint.includes("/repos")) {
    return []
  }
  if (endpoint.includes("/user")) {
    return { login: "mockuser", public_repos: 23 }
  }
  return {}
}

function getMockContributions(): GitHubContribution[] {
  const contributions: GitHubContribution[] = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    contributions.push({
      date: date.toISOString().split("T")[0],
      commits: Math.floor(Math.random() * 8),
      repo: `project-${Math.floor(Math.random() * 5) + 1}`,
      additions: Math.floor(Math.random() * 200),
      deletions: Math.floor(Math.random() * 50),
      pullRequests: Math.floor(Math.random() * 3),
    })
  }

  return contributions
}

function getMockUserStats(): UserStats {
  return {
    totalCommits: 1247,
    currentStreak: 127,
    longestStreak: 189,
    totalRepositories: 23,
    contributionsThisYear: 892,
    languagesUsed: ["TypeScript", "JavaScript", "Python", "Solidity", "Rust"],
  }
}

function getMockCourseProgress(): CourseProgress[] {
  return [
    {
      id: "1",
      title: "React Fundamentals",
      provider: "Tech Academy",
      completed: true,
      progress: 100,
      completedAt: "2024-11-15T00:00:00Z",
      certificateUrl: "https://example.com/cert/1",
    },
    {
      id: "2",
      title: "Advanced TypeScript",
      provider: "Code School",
      completed: true,
      progress: 100,
      completedAt: "2024-11-20T00:00:00Z",
    },
    {
      id: "3",
      title: "Web3 Development",
      provider: "Blockchain University",
      completed: false,
      progress: 75,
    },
  ]
}

function getMockBadges(): BadgeData[] {
  return [
    {
      id: "1",
      name: "React Master",
      description: "Complete 10 React projects",
      earned: true,
      earnedAt: "2024-11-15T00:00:00Z",
      progress: 100,
      requirements: ["Complete 10 React projects", "Use advanced React patterns"],
      rarity: "rare",
    },
    {
      id: "2",
      name: "Streak Legend",
      description: "Maintain a 200-day commit streak",
      earned: false,
      progress: 63,
      requirements: ["Commit code for 200 consecutive days"],
      rarity: "legendary",
    },
  ]
}

function getMockHustleScore(): HustleScoreBreakdown {
  return {
    totalScore: 8750,
    codeContributions: 3500,
    learningProgress: 2625,
    consistency: 1750,
    communityImpact: 875,
    monthlyTrend: [
      { month: "Jul", score: 7350 },
      { month: "Aug", score: 7550 },
      { month: "Sep", score: 7950 },
      { month: "Oct", score: 8150 },
      { month: "Nov", score: 8450 },
      { month: "Dec", score: 8750 },
    ],
  }
}

function getMockNFTUpdate(): NFTUpdateData {
  return {
    level: 7,
    experience: 8750,
    nextLevelExp: 10000,
    newBadges: ["TypeScript Pro"],
    statsUpdate: {
      totalCommits: 1247,
      currentStreak: 127,
    },
  }
}

function getMockLeaderboard() {
  return [
    { userId: "1", username: "alice_codes", hustleScore: 9500, level: 8, rank: 1 },
    { userId: "2", username: "bob_builder", hustleScore: 9200, level: 8, rank: 2 },
    { userId: "3", username: "charlie_dev", hustleScore: 8750, level: 7, rank: 3 },
  ]
}

// Utility functions for data processing

/**
 * Calculate streak from contribution data
 */
export function calculateStreak(contributions: GitHubContribution[]): {
  current: number
  longest: number
} {
  const sortedContributions = contributions
    .filter((c) => c.commits > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  const today = new Date()
  const checkDate = new Date(today)

  // Calculate current streak
  for (const contribution of sortedContributions) {
    const contribDate = new Date(contribution.date)
    if (contribDate.toDateString() === checkDate.toDateString()) {
      currentStreak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  // Calculate longest streak
  for (let i = 0; i < sortedContributions.length; i++) {
    if (i === 0 || isConsecutiveDay(sortedContributions[i - 1].date, sortedContributions[i].date)) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 1
    }
  }

  return { current: currentStreak, longest: longestStreak }
}

function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d1.getTime() - d2.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays === 1
}

/**
 * Format contribution data for charts
 */
export function formatContributionsForChart(contributions: GitHubContribution[]) {
  return contributions.map((contrib) => ({
    date: contrib.date,
    commits: contrib.commits,
    additions: contrib.additions,
    deletions: contrib.deletions,
  }))
}
