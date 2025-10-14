import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BookingHero } from "@/components/booking/booking-hero"
import { BookingCalendly } from "@/components/booking/booking-calendly"
import { BookingInfo } from "@/components/booking/booking-info"

export const metadata = {
  title: "Book a Session | Ìbáṣepọ̀",
  description: "Schedule your complimentary consultation or coaching session with our expert team.",
}

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BookingHero />
      <div className="py-20 md:py-32 bg-background-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <BookingCalendly />
            </div>
            <aside className="lg:col-span-1">
              <BookingInfo />
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
