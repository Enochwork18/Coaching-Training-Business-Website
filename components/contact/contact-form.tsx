"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      // API Integration Point: POST /api/contact
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you! Your message has been sent." })
        e.currentTarget.reset()
      } else {
        setMessage({ type: "error", text: result.message || "An error occurred. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "A network error occurred. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="font-montserrat text-2xl text-forest-green">Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-charcoal">Name *</Label>
            <Input id="name" name="name" required placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-charcoal">Email *</Label>
            <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-charcoal">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="Your Phone Number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-charcoal">Subject *</Label>
            <Input id="subject" name="subject" required placeholder="Reason for your message" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-charcoal">Message *</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Please type your message here..."
              rows={5}
            />
          </div>
          {message && (
            <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`} role="alert">
              {message.text}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-teal text-white hover:bg-deep-teal/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
