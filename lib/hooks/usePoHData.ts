"use client"

import { useState, useEffect, useCallback } from "react"
import {
  fetchContributions,
  fetchUserStats,
  fetchCourseProgress,
  fetchBadges,
  fetchHustleScore,
  type GitHubContribution,
  type UserStats,
  type CourseProgress,
  type BadgeData,
  type HustleScoreBreakdown,
} from "@/utils/pohApi"

// Custom hooks for fetching and managing Proof-of-Hustle data

export function useContributions(username: string) {
  const [contributions, setContributions] = useState<GitHubContribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadContributions = useCallback(async () => {
    if (!username) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchContributions(username)
      setContributions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch contributions")
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    loadContributions()
  }, [loadContributions])

  return { contributions, loading, error, refetch: loadContributions }
}

export function useUserStats(username: string) {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    if (!username) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchUserStats(username)
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user stats")
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  return { stats, loading, error, refetch: loadStats }
}

export function useCourseProgress(userId: string) {
  const [courses, setCourses] = useState<CourseProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCourses = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchCourseProgress(userId)
      setCourses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch course progress")
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  return { courses, loading, error, refetch: loadCourses }
}

export function useBadges(userId: string) {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBadges = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchBadges(userId)
      setBadges(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch badges")
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadBadges()
  }, [loadBadges])

  return { badges, loading, error, refetch: loadBadges }
}

export function useHustleScore(userId: string) {
  const [hustleScore, setHustleScore] = useState<HustleScoreBreakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadHustleScore = useCallback(async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)
      const data = await fetchHustleScore(userId)
      setHustleScore(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hustle score")
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadHustleScore()
  }, [loadHustleScore])

  return { hustleScore, loading, error, refetch: loadHustleScore }
}
