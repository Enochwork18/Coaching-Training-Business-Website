'use client'

import { PaystackButton } from 'react-paystack'

export interface PaystackConfig {
  reference: string
  email: string
  amount: number
  publicKey: string
  text?: string
  metadata?: any
  onSuccess: (reference: any) => void
  onClose: () => void
}

export function PaystackPaymentButton({
  booking,
  service,
  onSuccess,
  onClose,
}: {
  booking: any
  service: any
  onSuccess: (reference: any) => void
  onClose: () => void
}) {
  const config = {
    reference: booking.id,
    email: booking.clientEmail,
    amount: service.price * 100, // Convert to kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    text: 'Pay with Paystack',
    metadata: {
      custom_fields: [
        {
          display_name: 'Service',
          variable_name: 'service',
          value: service.title,
        },
        {
          display_name: 'Client Name',
          variable_name: 'client_name',
          value: booking.clientName,
        },
      ],
    },
    onSuccess,
    onClose,
  }

  return (
    <PaystackButton
      {...config}
      className="w-full bg-deep-teal text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
    />
  )
}
