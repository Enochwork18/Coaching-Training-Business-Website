import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ìbáṣepọ̀ – Connected Hearts Coaching & Consultancy",
  description: "Guiding families toward peace, purpose, and legacy",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background-light text-text-dark`}>{children}</body>
    </html>
  )
}
