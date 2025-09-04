import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.POH_API_URL || "https://api.proof-of-hustle.com"

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
    const { username, userId } = await request.json()
    const data = await authenticatedApiRequest(`/users/${userId}/sync-github`, {
      method: "POST",
      body: JSON.stringify({ githubUsername: username }),
    })
    return NextResponse.json(data)
  } catch (error) {
    console.error("Failed to sync GitHub data:", error)
    return NextResponse.json({ error: "Failed to sync GitHub data" }, { status: 500 })
  }
}
