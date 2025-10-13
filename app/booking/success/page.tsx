'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Booking } from '@/lib/types';

function BookingSuccessPageContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get('ref');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingRef) {
      fetch(`/api/bookings/${bookingRef}`)
        .then((res) => res.json())
        .then((data) => {
          setBooking(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [bookingRef]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-neutral py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-primary-green rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-forest-green mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-lg text-charcoal mb-8">
            Thank you for your payment. Your booking has been confirmed and a
            confirmation email has been sent to {booking?.email}.
          </p>

          {booking && (
            <div className="bg-warm-neutral p-6 rounded-lg mb-8 text-left">
              <h2 className="text-xl font-semibold text-forest-green mb-4">
                Booking Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span className="font-semibold">{booking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-semibold">{(booking as any).serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-semibold">
                    {new Date(booking.date).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Paid:</span>
                  <span className="font-semibold">
                    {booking.currency === 'NGN' && '₦'}
                    {booking.currency === 'GBP' && '£'}
                    {booking.currency === 'USD' && '$'}
                    {booking.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-deep-teal text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingSuccessPageContent />
        </Suspense>
    )
}