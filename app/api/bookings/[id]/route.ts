import { NextResponse } from 'next/server'
import { getBookingById } from '@/lib/db'

export async function GET(
  request: Request,
  context: any
) {
  try {
    const { id } = context.params;
    const booking = await getBookingById(id)
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }
    return NextResponse.json(booking)
  } catch (error) {
    console.error('Failed to retrieve booking:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve booking', details: String(error) },
      { status: 500 }
    )
  }
}