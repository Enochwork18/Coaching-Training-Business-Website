import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyPaystackPayment } from '@/lib/payment/paystack.server'
import { verifyFlutterwavePayment } from '@/lib/payment/flutterwave.server'
import { updatePayment, updateBooking, getPaymentByReference, getBookingById } from '@/lib/db'
import { sendBookingConfirmationEmail } from '@/app/actions/email'

const VerifyPaymentSchema = z.object({
  reference: z.string(),
  provider: z.enum(['paystack', 'flutterwave']),
  transactionId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = VerifyPaymentSchema.parse(body)

    console.log('🔍 Verifying payment:', validatedData)

    // Get payment record
    const payment = await getPaymentByReference(validatedData.reference)
    if (!payment) {
      console.error('❌ Payment not found:', validatedData.reference)
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    console.log('✅ Payment found:', payment.id)

    // In development/test mode, skip external verification
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isTestTransaction = validatedData.transactionId?.startsWith('test-')

    let verificationResult

    if (isDevelopment && isTestTransaction) {
      console.log('🧪 TEST MODE: Bypassing external verification')
      verificationResult = {
        success: true,
        data: {
          transactionId: validatedData.transactionId,
          reference: validatedData.reference,
          amount: payment.amount,
          currency: payment.currency,
          customerEmail: payment.customerEmail,
          paidAt: new Date().toISOString(),
        },
      }
    } else {
      // Verify with payment provider
      if (validatedData.provider === 'paystack') {
        verificationResult = await verifyPaystackPayment(validatedData.reference)
      } else {
        verificationResult = await verifyFlutterwavePayment(
          validatedData.transactionId!
        )
      }
    }

    if (!verificationResult.success) {
      console.error('❌ Verification failed:', verificationResult.error)
      await updatePayment(payment.id, {
        status: 'failed',
        updatedAt: new Date(),
      })

      return NextResponse.json({
        success: false,
        error: verificationResult.error,
      })
    }

    console.log('✅ Payment verified successfully')

    // Update payment status
    await updatePayment(payment.id, {
      status: 'success',
      providerTransactionId: verificationResult.data.transactionId,
      webhookData: verificationResult.data,
      completedAt: new Date(),
      updatedAt: new Date(),
    })

    console.log('✅ Payment record updated')

    // Update booking status
    await updateBooking(payment.bookingId, {
      status: 'confirmed',
      paymentId: payment.id,
      updatedAt: new Date(),
    })

    console.log('✅ Booking record updated')

    // Send confirmation email
    const booking = await getBookingById(payment.bookingId)

    // Only send email in production or if explicitly enabled
    if (process.env.NODE_ENV === 'production' || process.env.SEND_TEST_EMAILS === 'true') {
      await sendBookingConfirmationEmail(booking)
      console.log('✅ Confirmation email sent')
    } else {
      console.log('ℹ️ Skipping email in development mode')
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      booking,
    })
  } catch (error) {
    console.error('❌ Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment', details: String(error) },
      { status: 500 }
    )
  }
}