import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    const subscriber = await prisma.subscriber.create({
      data: { email }
    })

    // TODO: Sync with Mailchimp

    return NextResponse.json({ success: true, subscriber })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}