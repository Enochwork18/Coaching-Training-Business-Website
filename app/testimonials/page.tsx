import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero"
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import { TestimonialsCTA } from "@/components/testimonials/testimonials-cta"
import { TestimonialSubmit } from "@/components/testimonials/testimonial-submit"

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
      <section className="py-16 bg-muted/30">
        <div className="container-custom max-w-3xl">
          <TestimonialSubmit />
        </div>
      </section>
      <TestimonialsCTA />
      <SiteFooter />
    </main>
  )
}
