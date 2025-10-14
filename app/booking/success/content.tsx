'use client'

import { useSearchParams } from 'next/navigation'

export default function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  return (
    <div className="container-custom text-center">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-lg">Thank you for your booking. A confirmation email has been sent to you.</p>
      <p className="text-sm text-gray-500 mt-4">Booking Reference: {ref}</p>
    </div>
  )
}