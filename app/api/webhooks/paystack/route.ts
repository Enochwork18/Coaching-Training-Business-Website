import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { sendBookingConfirmationEmail } from '@/app/actions/email';

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle charge.success event
    if (event.event === 'charge.success') {
      const { reference, id } = event.data;

      // Get payment record
      const payment = await db.payments.getByReference(reference);
      if (!payment) {
        console.error('Payment not found for reference:', reference);
        return NextResponse.json({ received: true });
      }

      // Update payment
      await db.payments.update(payment.id, {
        status: 'success',
        providerTransactionId: id.toString(),
        webhookData: event.data,
        completedAt: new Date(),
        updatedAt: new Date(),
      });

      // Update booking
      await db.bookings.update(payment.bookingId, {
        status: 'confirmed',
        paymentId: payment.id,
      });

      // Send confirmation email
      const booking = await db.bookings.getById(payment.bookingId);
      if(booking) {
        await sendBookingConfirmationEmail(booking);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}