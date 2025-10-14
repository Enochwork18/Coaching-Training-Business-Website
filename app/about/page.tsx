import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutHero } from "@/components/about/about-hero"
import { FounderStory } from "@/components/about/founder-story"
import { ValuesGrid } from "@/components/about/values-grid"
import { CredentialsSection } from "@/components/about/credentials-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata = {
  title: "About | Ìbáṣepọ̀",
  description: "Learn about Elizabeth Omolara's mission to guide families toward peace, purpose, and legacy.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-warm-neutral">
      <SiteHeader />
      <AboutHero />
      <FounderStory />
      <ValuesGrid />
      <CredentialsSection />
      <CTASection />
      <SiteFooter />
    </main>
  )
}
