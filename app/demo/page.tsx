"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <Image src="/images/poh-logo.jpg" alt="Proof-of-Hustle Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold">Proof-of-Hustle Demo</span>
          </div>
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Interactive Demo</h1>
            <p className="text-xl text-muted-foreground">
              Experience how Proof-of-Hustle transforms your developer journey into verifiable achievements
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary" />
                </div>
                Demo Walkthrough
              </CardTitle>
              <CardDescription>See how your GitHub activity automatically updates your soulbound NFT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-primary/20 hover:bg-primary/30 text-primary"
                >
                  {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
                  {isPlaying ? "Pause Demo" : "Play Demo"}
                </Button>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                {isPlaying ? "Demo is playing..." : "Click to start the interactive demo"}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Try the Dashboard</CardTitle>
                <CardDescription>Explore the full dashboard experience</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard">
                  <Button className="w-full">View Live Dashboard</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Start Your Journey</CardTitle>
                <CardDescription>Create your account and begin earning achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth">
                  <Button className="w-full bg-transparent" variant="outline">
                    Sign Up Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
