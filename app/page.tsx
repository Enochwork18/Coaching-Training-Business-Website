import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { AboutPreview } from "@/components/home/about-preview"
import { TestimonialsPreview } from "@/components/home/testimonials-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-warm-neutral">
      <SiteHeader />
      <HeroSection />
      <ServicesPreview />
      <AboutPreview />
      <TestimonialsPreview />
      <BlogPreview />
      <NewsletterSection />
      <SiteFooter />
    </main>
  )
}
