import type React from "react"
import type { Metadata } from "next"
import { Lato, Montserrat } from "next/font/google"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy",
  description:
    "Empowering individuals, couples, and organizations through transformative coaching, training, and consultancy services.",
  generator: "v0.app",
  alternates: {
    canonical: "https://ibashepo.com/",
  },
  openGraph: {
    siteName: "Ìbáṣepọ̀",
    title: "Connected Hearts Coaching & Consultancy | Ìbáṣepọ̀",
    description:
      "Empowering individuals, couples, and organizations through transformative coaching, training, and consultancy services.",
    type: "website",
    url: "https://ibashepo.com/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connected Hearts Coaching & Consultancy | Ìbáṣepọ̀",
    description:
      "Empowering individuals, couples, and organizations through transformative coaching, training, and consultancy services.",
    site: "@ibashepo",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">{children}</body>
    </html>
  )
}
