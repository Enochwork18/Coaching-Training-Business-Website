'use client'

import { PaystackButton } from 'react-paystack';

export interface PaystackConfig {
  reference: string;
  email: string;
  amount: number; // Amount in kobo (multiply by 100)
  publicKey: string;
  text?: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  onSuccess: (reference: { transaction: string, message: string, reference: string, status: string, trans: string, trxref: string }) => void;
  onClose: () => void;
}

export function initializePaystackPayment(config: PaystackConfig) {
  return {
    reference: config.reference,
    email: config.email,
    amount: config.amount * 100, // Convert to kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    metadata: {
      ...config.metadata,
      booking_id: config.reference,
    },
  };
}

// Verify payment server-side
export async function verifyPaystackPayment(reference: string) {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (data.status && data.data.status === 'success') {
    return {
      success: true,
      data: {
        reference: data.data.reference,
        amount: data.data.amount / 100, // Convert from kobo
        currency: data.data.currency,
        transactionId: data.data.id,
        customerEmail: data.data.customer.email,
        paidAt: data.data.paid_at,
      },
    };
  }

  return {
    success: false,
    error: data.message || 'Payment verification failed',
  };
}

import { Booking, Service } from '../types';

type PaystackPaymentButtonProps = {
  booking: Booking;
  service: Service;
  onSuccess: (reference: { transaction: string, message: string, reference: string, status: string, trans: string, trxref: string }) => void;
  onClose: () => void;
};

// Create payment component
export function PaystackPaymentButton({
  booking,
  service,
  onSuccess,
  onClose,
}: PaystackPaymentButtonProps) {
  const config = {
    reference: booking.id,
    email: booking.email,
    amount: (service.price || 0) * 100, // Convert to kobo
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
          value: booking.name,
        },
      ],
    },
    onSuccess,
    onClose,
  };

  return (
    <PaystackButton
      {...config}
      className="w-full bg-deep-teal text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
    />
  );
}