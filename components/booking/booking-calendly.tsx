"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BookingCalendly() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/ibasepo"

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Preferred Time</CardTitle>
        <CardDescription>
          Choose a date and time that works best for you. We'll send you a confirmation email with all the details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: "320px", height: "700px" }}
        />
      </CardContent>
    </Card>
  )
}
