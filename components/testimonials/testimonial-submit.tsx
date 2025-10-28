"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { submitTestimonial } from "@/lib/api"

export function TestimonialSubmit() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [service, setService] = useState("")
  const [rating, setRating] = useState(5)
  const [text, setText] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await submitTestimonial({
        clientName: name || (anonymous ? "Anonymous" : ""),
        clientEmail: email,
        serviceName: service,
        rating,
        testimonialText: text,
        isAnonymous: anonymous,
      })
      setMessage(res.message)
      setName("")
      setEmail("")
      setService("")
      setRating(5)
      setText("")
      setAnonymous(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="font-heading text-3xl font-bold mb-4">Share Your Story</h2>
      <p className="text-muted-foreground mb-8">Your feedback helps others take the first step. Approved testimonials will appear publicly.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" disabled={anonymous} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Input id="service" value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g., Marriage Counseling" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text">Testimonial</Label>
          <Textarea id="text" value={text} onChange={(e) => setText(e.target.value)} required placeholder="What was your experience?" rows={5} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          Submit as Anonymous
        </label>
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Testimonial"}</Button>
        </div>
        {message && <p className="text-sm text-green-600" role="status">{message}</p>}
      </form>
    </div>
  )
}
