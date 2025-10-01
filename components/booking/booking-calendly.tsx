"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BookingCalendly() {
  useEffect(() => {
    // Load Calendly widget script
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
        {/* Calendly Integration */}
        {/* Replace 'your-calendly-username' with actual Calendly username */}
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/your-calendly-username/30min"
          style={{ minWidth: "320px", height: "700px" }}
        />
        <p className="text-sm text-muted-foreground mt-4">
          Note: Replace the Calendly URL in the code with your actual Calendly scheduling link.
        </p>
      </CardContent>
    </Card>
  )
}
