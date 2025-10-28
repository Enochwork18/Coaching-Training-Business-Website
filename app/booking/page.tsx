import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookingHero } from "@/components/booking/booking-hero"
import { BookingInfo } from "@/components/booking/booking-info"
import { BookingSteps } from "@/components/booking/booking-steps"

export const metadata = {
  title: "Book a Session | Ìbáṣepọ̀",
  description: "Schedule your complimentary consultation or coaching session with our expert team.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BookingHero />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BookingSteps />
            </div>
            <aside className="lg:col-span-1">
              <BookingInfo />
            </aside>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
