import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalendlyEmbed } from "@/components/booking/calendly-embed"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-warm-neutral">
      <SiteHeader />
      <div className="py-20 md:py-32">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-forest-green mb-8 text-center">
            Book a Session
          </h1>
          <CalendlyEmbed />
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}