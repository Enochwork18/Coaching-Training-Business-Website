'use client'

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string; // NGN, USD, GBP
  payment_options: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  callback: (response: { status: string, transaction_id: string, tx_ref: string }) => void;
  onClose: () => void;
}

export function initializeFlutterwavePayment(
  booking: Booking,
  service: Service
): FlutterwaveConfig {
  return {
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
    callback: (response) => {
      console.log('Payment response:', response);
      closePaymentModal();
    },
    onClose: () => {
      console.log('Payment modal closed');
    },
  };
}

// Verify payment server-side
export async function verifyFlutterwavePayment(transactionId: string) {
  const response = await fetch(
    `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (data.status === 'success' && data.data.status === 'successful') {
    return {
      success: true,
      data: {
        reference: data.data.tx_ref,
        amount: data.data.amount,
        currency: data.data.currency,
        transactionId: data.data.id,
        customerEmail: data.data.customer.email,
        paidAt: data.data.created_at,
      },
    };
  }

  return {
    success: false,
    error: data.message || 'Payment verification failed',
  };
}

import { Booking, Service } from '../types';

type FlutterwavePaymentButtonProps = {
    booking: Booking;
    service: Service;
    onSuccess: (response: { status: string, transaction_id: string, tx_ref: string }) => void;
    onClose: () => void;
};

// Create payment component
export function FlutterwavePaymentButton({
  booking,
  service,
  onSuccess,
  onClose,
}: FlutterwavePaymentButtonProps) {
  const config = initializeFlutterwavePayment(booking, service);
  config.callback = onSuccess;
  config.onClose = onClose;

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      onClick={() => {
        handleFlutterPayment({
          callback: onSuccess,
          onClose,
        });
      }}
      className="w-full bg-primary-green text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
    >
      Pay with Flutterwave
    </button>
  );
}