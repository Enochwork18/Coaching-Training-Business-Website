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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibasepo.org.uk"
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy"
  const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+447958709238"
  const orgLogo = "/logo.png"
  const sameAs = [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
  ].filter(Boolean) as string[]
  const businessAddress = (process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "14 Brunswick Street, Stretford, M32 8NJ, UK")

import { schemas as seoSchemas } from "@/lib/seo/schemas"
import { safeSerialize } from "@/lib/seo/serialize"

  return (
    <html lang="en" className={`${lato.variable} ${montserrat.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground overflow-x-hidden" suppressHydrationWarning>
        {/* Structured data scripts rendered server-side to avoid client import in layout */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeSerialize(seoSchemas.organization({ name: siteName, url: siteUrl, logo: orgLogo, sameAs })) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeSerialize(seoSchemas.localBusiness({
            name: siteName,
            url: siteUrl,
            telephone: businessPhone,
            address: { streetAddress: businessAddress },
            image: orgLogo,
          })) }}
        />
        {children}
      </body>
    </html>
  )
}
