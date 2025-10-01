import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import { TestimonialsCTA } from "@/components/testimonials/testimonials-cta"

export const metadata = {
  title: "Testimonials | Ìbáṣepọ̀",
  description: "Read success stories and testimonials from our clients who have experienced transformation.",
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <TestimonialsHero />
      <TestimonialsGrid />
      <TestimonialsCTA />
      <SiteFooter />
    </main>
  )
}
