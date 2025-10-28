"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { subscribeToNewsletter } from "@/lib/api"
import { NewsletterConsentModal } from "@/components/newsletter/newsletter-consent-modal"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [consentOpen, setConsentOpen] = useState(false)

  const doSubscribe = async () => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await subscribeToNewsletter(email)
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Thank you for subscribing!" })
        setEmail("")
      } else {
        setMessage({ type: "error", text: res.message || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again later." })
    } finally {
      setLoading(false)
      setConsentOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConsentOpen(true)
  }

  return (
    <>
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
      <p className="text-xs text-muted-foreground mt-2">
        By subscribing, you agree to our <a className="underline" href="/privacy" target="_blank">Privacy Policy</a> and
        {" "}
        <a className="underline" href="/terms" target="_blank">Terms</a>.
      </p>
      <NewsletterConsentModal open={consentOpen} onOpenChange={setConsentOpen} onConfirm={doSubscribe} />
    </>
  )
}
