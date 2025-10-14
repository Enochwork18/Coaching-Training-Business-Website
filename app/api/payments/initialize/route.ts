import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBooking, createPayment } from '@/lib/db/index';
import { mockServices } from '@/lib/mockData';

const InitializePaymentSchema = z.object({
  serviceId: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientPhone: z.string(),
  preferredDate: z.string().datetime(),
  message: z.string(),
  paymentProvider: z.enum(['paystack', 'flutterwave']),
  currency: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = InitializePaymentSchema.parse(body);

    console.log('Received serviceId:', validatedData.serviceId);
    const service = mockServices.find(s => s.slug === validatedData.serviceId);
    console.log('Found service:', service);

    if (!service) {
      return NextResponse.json({ error: 'Service not found', receivedServiceId: validatedData.serviceId }, { status: 404 });
    }

    const booking = await createBooking({
      clientName: validatedData.clientName,
      clientEmail: validatedData.clientEmail,
      clientPhone: validatedData.clientPhone,
      serviceId: validatedData.serviceId,
      preferredDate: new Date(validatedData.preferredDate),
      message: validatedData.message,
      status: 'pending',
    });

    const payment = await createPayment({
      bookingId: booking.id,
      amount: Number(service.price?.replace('£', '')) || 0,
      currency: validatedData.currency,
      status: 'pending',
      provider: validatedData.paymentProvider,
      customerEmail: validatedData.clientEmail,
    });

    return NextResponse.json({
      success: true,
      booking,
      service,
      payment,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment', details: String(error) },
      { status: 500 }
    );
  }
}