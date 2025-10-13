'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

import { Booking } from "@/lib/types";

export async function sendBookingConfirmationEmail(booking: Booking & { serviceName: string }) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2A7F7F; color: white; padding: 30px; text-center; border-radius: 10px 10px 0 0; }
        .content { background: #F5F3EE; padding: 30px; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
        </div>
        <div class="content">
          <p>Dear ${booking.name},</p>
          <p>Your booking has been confirmed.</p>
          <p><strong>Reference:</strong> ${booking.id}</p>
          <p><strong>Service:</strong> ${booking.serviceName}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: '"Ìbáṣepọ̀ Connected Hearts" <enquiries@ibasepo.org.uk>',
      to: booking.email,
      subject: `Booking Confirmed - ${booking.serviceName}`,
      html: emailHtml,
    })

    // Send admin notification
    await transporter.sendMail({
      from: '"Ìbáṣepọ̀ Booking System" <enquiries@ibasepo.org.uk>',
      to: 'eo.bismark@ibasepo.org.uk',
      subject: `New Booking: ${booking.serviceName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Client:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Service:</strong> ${booking.serviceName}</p>
        <p><strong>Amount:</strong> ${booking.currency} ${booking.amount}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendPaymentFailedEmail(booking: Booking) {
  // Similar implementation
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif;">
      <h1 style="color: #EF4444;">Payment Failed</h1>
      <p>Dear ${booking.name},</p>
      <p>We couldn't process your payment. Please try again.</p>
      <p><strong>Reference:</strong> ${booking.id}</p>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: '"Ìbáṣepọ̀ Connected Hearts" <enquiries@ibasepo.org.uk>',
      to: booking.email,
      subject: 'Payment Failed - Action Required',
      html: emailHtml,
    })
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: String(error) }
  }
}