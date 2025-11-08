import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyPaystackPayment } from '@/lib/payment/paystack';
import { verifyFlutterwavePayment } from '@/lib/payment/flutterwave';
// import { sendBookingConfirmationEmail } from '@/lib/email';

const VerifyPaymentSchema = z.object({
  reference: z.string(),
  provider: z.enum(['paystack', 'flutterwave']),
  transactionId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = VerifyPaymentSchema.parse(body);

    // Get payment record
    const payment = await db.payments.getByReference(validatedData.reference);
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Verify with payment provider
    let verificationResult;
    if (validatedData.provider === 'paystack') {
      verificationResult = await verifyPaystackPayment(validatedData.reference);
    } else {
      verificationResult = await verifyFlutterwavePayment(
        validatedData.transactionId!
      );
    }

    if (!verificationResult.success) {
      await db.payments.update(payment.id, {
        status: 'failed',
        updatedAt: new Date(),
      });

      return NextResponse.json({
        success: false,
        error: verificationResult.error,
      });
    }

    // Update payment status
    await db.payments.update(payment.id, {
      status: 'success',
      providerTransactionId: verificationResult.data.transactionId,
      completedAt: new Date(),
      updatedAt: new Date(),
    });

    // Update booking status
    await db.bookings.update(payment.bookingId, {
      status: 'confirmed',
      paymentId: payment.id,
    });

    // Send confirmation email
    const booking = await db.bookings.getById(payment.bookingId);
    // await sendBookingConfirmationEmail(booking);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      booking,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}