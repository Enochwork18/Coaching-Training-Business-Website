import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const InitializePaymentSchema = z.object({
  serviceId: z.string(),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string(),
  preferredDate: z.string(),
  message: z.string().optional(),
  paymentProvider: z.enum(['paystack', 'flutterwave']),
  currency: z.enum(['NGN', 'GBP', 'USD']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = InitializePaymentSchema.parse(body);

    // Get service details
    const service = await db.services.getById(validatedData.serviceId);
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Determine price based on currency
    let amount = service.price || 0;
    if (validatedData.currency === 'NGN' && service.priceNGN) {
      amount = service.priceNGN;
    } else if (validatedData.currency === 'GBP' && service.priceGBP) {
      amount = service.priceGBP;
    } else if (validatedData.currency === 'USD' && service.priceUSD) {
      amount = service.priceUSD;
    }

    // Create booking
    const booking = await db.bookings.create({
      serviceId: service.id,
      name: validatedData.clientName,
      email: validatedData.clientEmail,
      phone: validatedData.clientPhone,
      date: validatedData.preferredDate,
      time: '', // This will be set by Calendly later
      message: validatedData.message || '',
      amount,
      currency: validatedData.currency,
      status: 'pending_payment',
      paymentId: null,
      createdAt: new Date().toISOString()
    });

    // Create payment record
    const payment = await db.payments.create({
      bookingId: booking.id,
      amount,
      currency: validatedData.currency,
      provider: validatedData.paymentProvider,
      providerReference: booking.id,
      providerTransactionId: '',
      status: 'pending',
      customerEmail: validatedData.clientEmail,
      customerPhone: validatedData.clientPhone,
      metadata: {},
      webhookData: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null,
    });

    return NextResponse.json({
      success: true,
      booking,
      payment,
      paymentReference: booking.id,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}