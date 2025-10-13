import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendBookingConfirmationEmail } from '@/app/actions/email';
import { verifyFlutterwavePayment } from '@/lib/payment/flutterwave.tsx';

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('verif-hash');

    // Verify webhook signature
    if (signature !== process.env.FLUTTERWAVE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Handle charge.completed event
    if (body.event === 'charge.completed') {
      const { tx_ref, id } = body.data;

      // Verify payment with Flutterwave API
      const verificationResult = await verifyFlutterwavePayment(id.toString());

      if (!verificationResult.success) {
        console.error('Flutterwave verification failed:', verificationResult.error);
        return NextResponse.json({ received: true });
      }

      // Extract booking reference from tx_ref (format: IB-{bookingId}-{timestamp})
      const bookingId = tx_ref.split('-')[1];

      // Get payment record
      const payment = await db.payments.getByReference(bookingId);
      if (!payment) {
        console.error('Payment not found for booking:', bookingId);
        return NextResponse.json({ received: true });
      }

      // Update payment
      await db.payments.update(payment.id, {
        status: 'success',
        providerTransactionId: id.toString(),
        webhookData: body.data,
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
    console.error('Flutterwave webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}