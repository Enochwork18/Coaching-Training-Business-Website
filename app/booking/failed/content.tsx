'use client'

import { useSearchParams } from 'next/navigation'

export default function BookingFailedContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  return (
    <div className="container-custom text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h1>
      <p className="text-lg">Unfortunately, we were unable to process your payment.</p>
      <p className="text-sm text-gray-500 mt-4">Please try again or contact support with booking reference: {ref}</p>
    </div>
  )
}