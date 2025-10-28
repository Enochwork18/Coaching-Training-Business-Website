import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Basic shape validation (lightweight)
    if (!body?.name || !body?.email || !body?.subject || !body?.message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }
    // Honeypot guard (if sent)
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Thanks!" })
    }
    return NextResponse.json({ success: true, message: "Thank you! Your message has been sent. We'll get back to you soon." })
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 })
  }
}
