"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createBooking, createPaymentSession } from "@/lib/api"
import { BookingCalendly } from "@/components/booking/booking-calendly"

interface ServiceOption {
  id: string
  name: string
  price?: number
}

const serviceOptions: ServiceOption[] = [
  { id: "marriage", name: "Marriage & Relationship Counseling" },
  { id: "parenting", name: "Parenting Coaching" },
  { id: "personal", name: "Personal Development Coaching" },
  { id: "workshop", name: "Workshops" },
  { id: "consultancy", name: "Consultancy" },
  { id: "speaking", name: "Speaking Engagements" },
]

export function BookingSteps() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)

  // Step 1
  const [serviceId, setServiceId] = useState<string>(serviceOptions[0].id)
  const selectedService = useMemo(() => serviceOptions.find(s => s.id === serviceId)!, [serviceId])
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  // Step 2
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [agree, setAgree] = useState(false)

  // Step 3
  const [provider, setProvider] = useState<"paystack" | "flutterwave">("paystack")
  const [loading, setLoading] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  // Step 4 (confirmation)
  const [confirmation, setConfirmation] = useState<{ id: string } | null>(null)

  const canContinueStep1 = !!serviceId && (!!process.env.NEXT_PUBLIC_CALENDLY_URL || (date && time))
  const canContinueStep2 = name && email && phone && agree

  const handleCreateBooking = async () => {
    setLoading(true)
    try {
      const result = await createBooking({
        serviceId,
        serviceName: selectedService.name,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        preferredDate: date || "calendly",
        preferredTime: time || "calendly",
        notes,
        agreedToTerms: agree,
      })
      if (result.success) {
        setBookingId(result.bookingId)
        setStep(3)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePayment = async () => {
    if (!bookingId) return
    setLoading(true)
    try {
      const session = await createPaymentSession(bookingId, 0, provider)
      setPaymentUrl(session.paymentUrl)
      setConfirmation({ id: bookingId })
      setStep(4)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center gap-3 text-sm">
        <span className={step >= 1 ? "font-semibold text-primary" : "text-muted-foreground"}>1. Select</span>
        <span>›</span>
        <span className={step >= 2 ? "font-semibold text-primary" : "text-muted-foreground"}>2. Details</span>
        <span>›</span>
        <span className={step >= 3 ? "font-semibold text-primary" : "text-muted-foreground"}>3. Payment</span>
        <span>›</span>
        <span className={step >= 4 ? "font-semibold text-primary" : "text-muted-foreground"}>4. Confirmation</span>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1 — Choose service and time</CardTitle>
            <CardDescription>Pick a service and select a suitable time in Calendly. If Calendly is unavailable, use the fallback date/time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                className="w-full h-10 rounded-md border px-3 bg-background"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Calendly</Label>
              <BookingCalendly />
            </div>

            {!process.env.NEXT_PUBLIC_CALENDLY_URL && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred date (fallback)</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred time (fallback)</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button disabled={!canContinueStep1} onClick={() => setStep(2)}>Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2 — Your details</CardTitle>
            <CardDescription>Tell us how to reach you. We’ll confirm your booking by email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(!!v)} />
              <Label htmlFor="agree" className="text-sm">
                I agree to the <a className="text-primary underline" href="/terms" target="_blank">Terms</a> and <a className="text-primary underline" href="/privacy" target="_blank">Privacy Policy</a>.
              </Label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleCreateBooking} disabled={!canContinueStep2 || loading}>
                {loading ? "Saving..." : "Continue to payment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3 — Payment</CardTitle>
            <CardDescription>Select a payment provider. This is a mocked flow prepared for backend integration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={provider} onValueChange={(v) => setProvider(v as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paystack" id="paystack" />
                <Label htmlFor="paystack">Paystack</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flutterwave" id="flutterwave" />
                <Label htmlFor="flutterwave">Flutterwave</Label>
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleCreatePayment} disabled={!bookingId || loading}>
                {loading ? "Creating session..." : "Proceed"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && confirmation && (
        <Card>
          <CardHeader>
            <CardTitle>Booking confirmed (mock)</CardTitle>
            <CardDescription>We generated a mock confirmation. Replace with real payment verification on backend.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Booking ID: <span className="font-mono">{confirmation.id}</span></p>
            {paymentUrl && (
              <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Open payment session (mock)
              </a>
            )}
            <p className="text-sm text-muted-foreground">Add calendar file and email confirmations during backend integration.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
