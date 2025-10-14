'use client'

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

export interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phone_number: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo: string
  }
  callback: (response: any) => void
  onClose: () => void
}

export function FlutterwavePaymentButton({
  booking,
  service,
  onSuccess,
  onClose,
}: {
  booking: any
  service: any
  onSuccess: (response: any) => void
  onClose: () => void
}) {
  // For testing: bypass Flutterwave and call success immediately
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (isDevelopment && !process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY) {
    return (
      <button
        onClick={() => {
          console.log('🧪 TEST MODE: Simulating payment success')
          setTimeout(() => {
            onSuccess({
              transaction_id: 'test-txn-' + Date.now(),
              tx_ref: `IB-${booking.id}-${Date.now()}`,
              status: 'successful',
            })
          }, 1000)
        }}
        className="w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
      >
        💳 Pay with Flutterwave (Test Mode)
      </button>
    )
  }

  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: `IB-${booking.id}-${Date.now()}`,
    amount: service.price,
    currency: service.currency || 'NGN',
    payment_options: 'card,mobilemoney,ussd,banktransfer',
    customer: {
      email: booking.clientEmail,
      phone_number: booking.clientPhone,
      name: booking.clientName,
    },
    customizations: {
      title: 'Ìbáṣepọ̀ Connected Hearts',
      description: `Payment for ${service.title}`,
      logo: 'https://ibasepo.org.uk/logo.png',
    },
    callback: onSuccess,
    onClose,
  }

  const handleFlutterPayment = useFlutterwave(config)

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: onSuccess,
          onClose,
        })
      }}
      className="w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
    >
      Pay with Flutterwave
    </button>
  )
}
