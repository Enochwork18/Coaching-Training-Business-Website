'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Dynamically import payment components (client-side only)
const PaystackPaymentButton = dynamic(
  () => import('@/lib/payment/paystack.tsx').then(mod => mod.PaystackPaymentButton),
  { ssr: false }
)

const FlutterwavePaymentButton = dynamic(
  () => import('@/lib/payment/flutterwave.tsx').then(mod => mod.FlutterwavePaymentButton),
  { ssr: false }
)


function BookingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState({
    serviceId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredDate: '',
    message: '',
    paymentProvider: 'paystack' as 'paystack' | 'flutterwave',
    currency: 'NGN' as 'NGN' | 'GBP' | 'USD',
    termsAccepted: false,
  })
  const [booking, setBooking] = useState<any>(null)
  const [service, setService] = useState<any>(null)

  // Load services on mount
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Failed to load services:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setBooking(data.booking)
        const selectedService = services.find(s => s.id === formData.serviceId);
        setService(selectedService);
        setStep(2)
      } else {
        alert('Failed to initialize booking. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (reference: any) => {
    setLoading(true)

    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: booking.id,
          provider: formData.paymentProvider,
          transactionId: reference.transaction || reference.transaction_id,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/booking/success?ref=${booking.id}`)
      } else {
        alert('Payment verification failed. Please contact support.')
        router.push(`/booking/failed?ref=${booking.id}`)
      }
    } catch (error) {
      console.error('Payment verification error:', error)
      alert('An error occurred. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentClose = () => {
    alert('Payment cancelled. Your booking is still saved.')
  }

  return (
    <div className="min-h-screen bg-warm-neutral py-12">
      <div className="max-w-3xl mx-auto px-4">
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-forest-green mb-6">
              Book a Session
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <Label htmlFor="serviceId">Select Service *</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
                  value={formData.serviceId}
                  required
                >
                    <SelectTrigger id="serviceId">
                        <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                        {services.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>

              {/* Client Name */}
              <div>
                <Label htmlFor="clientName">Full Name *</Label>
                <Input
                  id="clientName"
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="clientEmail">Email Address *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="clientPhone">Phone Number (with country code) *</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  required
                  placeholder="+234..."
                  value={formData.clientPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, clientPhone: e.target.value })
                  }
                />
              </div>

              {/* Preferred Date */}
              <div>
                <Label htmlFor="preferredDate">Preferred Date & Time *</Label>
                <Input
                  id="preferredDate"
                  type="datetime-local"
                  required
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredDate: e.target.value })
                  }
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us anything else we should know..."
                />
              </div>

              {/* Payment Provider Selection */}
              <div>
                <Label>Payment Method *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentProvider: 'paystack' })
                    }
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.paymentProvider === 'paystack'
                        ? 'border-deep-teal bg-sky-blue'
                        : 'border-gray-300 hover:border-deep-teal'
                    }`}
                  >
                    Paystack
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, paymentProvider: 'flutterwave' })
                    }
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.paymentProvider === 'flutterwave'
                        ? 'border-deep-teal bg-sky-blue'
                        : 'border-gray-300 hover:border-deep-teal'
                    }`}
                  >
                    Flutterwave
                  </button>
                </div>
              </div>

              {/* Currency Selection */}
              <div>
                <Label htmlFor="currency">Currency *</Label>
                <Select
                  onValueChange={(value) => setFormData({ ...formData, currency: value as 'NGN' | 'GBP' | 'USD' })}
                  value={formData.currency}
                  required
                >
                    <SelectTrigger id="currency">
                        <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="GBP">British Pounds (£)</SelectItem>
                        <SelectItem value="USD">US Dollars ($)</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <Checkbox
                  id="terms"
                  required
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, termsAccepted: checked as boolean })
                  }
                />
                <Label htmlFor="terms" className="ml-2">
                  I agree to the{' '}
                  <a href="/terms" className="text-deep-teal hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-deep-teal hover:underline">
                    Privacy Policy
                  </a>
                  *
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </form>
          </div>
        )}

        {step === 2 && booking && service && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-forest-green mb-6">
              Complete Payment
            </h1>

            {/* Booking Summary */}
            <div className="bg-warm-neutral p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-forest-green mb-4">
                Booking Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-semibold">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold">{service.duration}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-forest-green pt-4 border-t border-gray-300">
                  <span>Total:</span>
                  <span>
                    {formData.currency === 'NGN' && '₦'}
                    {formData.currency === 'GBP' && '£'}
                    {formData.currency === 'USD' && '$'}
                    {booking.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-4">
              {formData.paymentProvider === 'paystack' ? (
                <PaystackPaymentButton
                  booking={booking}
                  service={service}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                />
              ) : (
                <FlutterwavePaymentButton
                  booking={booking}
                  service={service}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentClose}
                />
              )}

              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="w-full"
              >
                ← Back to Edit Details
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Calendly Embed Section */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto px-4 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-forest-green mb-6 text-center">
              Or Schedule Directly
            </h2>
            <iframe
              src="https://calendly.com/ibasepo"
              width="100%"
              height="800"
              frameBorder="0"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingPageContent />
        </Suspense>
    )
}