import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.POH_API_URL || "https://api.proof-of-hustle.com"
const GITHUB_API_URL = "https://api.github.com"

// Server-side API helper with authentication
async function authenticatedApiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.POH_API_KEY}`,
  }

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
}

export async function POST(request: NextRequest) {
  try {
    const { username, startDate, endDate } = await request.json()

    const endpoint = `/users/${username}/contributions`
    const params = new URLSearchParams()

    if (startDate) params.append("start_date", startDate)
    if (endDate) params.append("end_date", endDate)

    const queryString = params.toString()
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint

    const data = await authenticatedApiRequest(fullEndpoint)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to fetch contributions:", error)
    return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 })
  }
}
