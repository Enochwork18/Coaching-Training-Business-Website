import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { AboutPreview } from "@/components/home/about-preview"
import { TestimonialsPreview } from "@/components/home/testimonials-preview"
import { CTASection } from "@/components/home/cta-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <TestimonialsPreview />
      <CTASection />
      <NewsletterSection />
      <SiteFooter />
    </main>
  )
}
