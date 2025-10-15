import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/Hero"
import { ServicesPreview } from "@/components/home/ServicesPreview"
import { AboutSnippet } from "@/components/home/AboutSnippet"
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview"
import { BlogPreview } from "@/components/home/BlogPreview"
import { CTASection } from "@/components/home/CTASection"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServicesPreview />
      <AboutSnippet />
      <TestimonialsPreview />
      <BlogPreview />
      <CTASection />
      <Footer />
    </main>
  )
}
