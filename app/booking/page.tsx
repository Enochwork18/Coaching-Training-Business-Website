'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import payment components
const PaystackPaymentButton = dynamic(
  () => import('@/lib/payment/paystack.tsx').then(mod => mod.PaystackPaymentButton),
  { ssr: false }
)

const FlutterwavePaymentButton = dynamic(
  () => import('@/lib/payment/flutterwave.tsx').then(mod => mod.FlutterwavePaymentButton),
  { ssr: false }
)

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<any[]>([])
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
      .then(data => {
        console.log('📋 Services loaded:', data.length)
        setServices(data)
      })
      .catch(err => console.error('Failed to load services:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 Form submitted with data:', formData)
    setLoading(true)

    try {
      console.log('🚀 Calling /api/payments/initialize')
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      console.log('📥 Response status:', response.status)
      const data = await response.json()
      console.log('📦 Response data:', data)

      if (data.success) {
        console.log('✅ Payment initialized, moving to step 2')
        setBooking(data.booking)
        setService(data.service)
        setStep(2)
      } else {
        console.error('❌ Payment initialization failed:', data)
        alert('Failed to initialize booking. Please try again.')
      }
    } catch (error) {
      console.error('💥 Error during submission:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (reference: any) => {
    console.log('🎉 Payment success callback triggered:', reference)
    setLoading(true)

    try {
      console.log('🔍 Verifying payment...')
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: booking.id,
          provider: formData.paymentProvider,
          transactionId: reference.transaction || reference.transaction_id,
        }),
      })

      console.log('📥 Verification response status:', response.status)
      const data = await response.json()
      console.log('📦 Verification response data:', data)

      if (data.success) {
        console.log('✅ Payment verified, redirecting to success page')
        router.push(`/booking/success?ref=${booking.id}`)
      } else {
        console.error('❌ Payment verification failed:', data)
        alert('Payment verification failed. Please contact support.')
        router.push(`/booking/failed?ref=${booking.id}`)
      }
    } catch (error) {
      console.error('💥 Error during verification:', error)
      alert('An error occurred. Please contact support.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentClose = () => {
    console.log('⚠️ Payment cancelled')
    alert('Payment cancelled. Your booking is still saved.')
  }

  // Check if form is valid
  const isFormValid =
    formData.serviceId &&
    formData.clientName &&
    formData.clientEmail &&
    formData.clientPhone &&
    formData.preferredDate &&
    formData.termsAccepted

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
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Select Service *
                </label>
                <select
                  name="serviceId"
                  required
                  value={formData.serviceId}
                  onChange={(e) => {
                    console.log('Service selected:', e.target.value)
                    setFormData({ ...formData, serviceId: e.target.value })
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                >
                  <option value="">Choose a service...</option>
                  {services.map((s: any) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  required
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Phone Number (with country code) *
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  required
                  placeholder="+234..."
                  value={formData.clientPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, clientPhone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              {/* Preferred Date - Simple input for testing */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredDate: e.target.value })
                  }
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Additional Information
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                  placeholder="Tell us anything else we should know..."
                />
              </div>

              {/* Currency Selection */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Currency *
                </label>
                <select
                  name="currency"
                  required
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currency: e.target.value as 'NGN' | 'GBP' | 'USD',
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-teal"
                >
                  <option value="NGN">Nigerian Naira (₦)</option>
                  <option value="GBP">British Pounds (£)</option>
                  <option value="USD">US Dollars ($)</option>
                </select>
              </div>

              {/* Terms & Conditions - CRITICAL */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="terms-checkbox"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    console.log('Terms checkbox changed:', e.target.checked)
                    setFormData({ ...formData, termsAccepted: e.target.checked })
                  }}
                  className="mt-1 h-4 w-4 text-deep-teal focus:ring-deep-teal border-gray-300 rounded"
                />
                <label htmlFor="terms-checkbox" className="ml-2 text-sm text-charcoal">
                  I agree to the{' '}
                  <a href="/terms" className="text-deep-teal hover:underline" target="_blank">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-deep-teal hover:underline" target="_blank">
                    Privacy Policy
                  </a>
                  *
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full bg-deep-teal text-white py-4 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>

              {/* Debug info (remove in production) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 mt-2">
                  Form valid: {isFormValid ? 'Yes' : 'No'} |
                  Terms: {formData.termsAccepted ? 'Checked' : 'Unchecked'}
                </div>
              )}
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
                  <span className="text-charcoal">Service:</span>
                  <span className="font-semibold">{service.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal">Duration:</span>
                  <span className="font-semibold">{service.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal">Date:</span>
                  <span className="font-semibold">
                    {new Date(formData.preferredDate).toLocaleDateString()}
                  </span>
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

              <button
                onClick={() => setStep(1)}
                className="w-full bg-gray-200 text-charcoal py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
              >
                ← Back to Edit Details
              </button>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-sky-blue rounded-lg">
              <p className="text-sm text-charcoal text-center">
                🔒 Your payment is secure and encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}