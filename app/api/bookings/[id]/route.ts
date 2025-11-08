import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }
) {
  try {
    const booking = await db.bookings.getById(params.id);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    // We probably want to join the service details here
    const service = await db.services.getById(booking.serviceId);
    return NextResponse.json({ ...booking, serviceName: service?.title });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}