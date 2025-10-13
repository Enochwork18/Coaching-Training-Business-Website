'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function BookingFailedPageContent() {
    const searchParams = useSearchParams();
    const bookingRef = searchParams.get('ref');

    return (
      <div className="min-h-screen bg-warm-neutral py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Payment Failed
            </h1>

            <p className="text-lg text-charcoal mb-8">
              Unfortunately, we couldn't process your payment. Your booking has been
              saved and you can try again.
            </p>

            {bookingRef && (
              <div className="bg-warm-neutral p-4 rounded-lg mb-8">
                <p className="text-sm text-charcoal">
                  Booking Reference: <span className="font-semibold">{bookingRef}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/booking?retry=${bookingRef}`}
                className="bg-deep-teal text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Try Again
              </Link>
              <Link
                href="/contact"
                className="bg-primary-green text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default function BookingFailedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingFailedPageContent />
        </Suspense>
    )
}