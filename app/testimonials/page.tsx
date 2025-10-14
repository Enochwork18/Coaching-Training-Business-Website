import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
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
      <Header />
      <TestimonialsHero />
      <TestimonialsGrid />
      <TestimonialsCTA />
      <Footer />
    </main>
  )
}
