"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // API Integration Point: POST /api/newsletter
      // Expected payload: { email: string }
      // Expected response: { success: boolean, message: string }
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you for subscribing!" })
        setEmail("")
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        aria-label="Email address"
      />
      <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
      {message && (
        <p
          className={`text-sm mt-2 ${message.type === "success" ? "text-green-600" : "text-destructive"}`}
          role="alert"
        >
          {message.text}
        </p>
      )}
    </form>
  )
}
