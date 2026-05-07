"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabase } from "@/lib/supabase"
import { Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  async function handleEmailLogin() {
    if (!email) return
    setLoading(true)
    setMessage("")
    const { error } = await getSupabase().auth.signInWithOtp({ email })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Check your email for the login link!")
    }
    setLoading(false)
  }

  async function handleGoogleLogin() {
    setLoading(true)
    const { error } = await getSupabase().auth.signInWithOAuth({ provider: "google" })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Sprout className="h-10 w-10 text-green-700" />
          </div>
          <CardTitle>Welcome to AI Agri-Advisor</CardTitle>
          <CardDescription>Sign in to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full bg-green-700 hover:bg-green-800"
              onClick={handleEmailLogin}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>
          {message && (
            <p className="text-sm text-center text-green-700">{message}</p>
          )}
          <p className="text-xs text-center text-gray-500 mt-4">
            By signing in, you agree to our Terms of Service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
