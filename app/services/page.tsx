import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesList } from "@/components/services/services-list"
import { ProcessSection } from "@/components/services/process-section"

export const metadata = {
  title: "Our Services | Ìbáṣepọ̀",
  description:
    "Explore our comprehensive coaching, training, and consultancy services for individuals, couples, and organizations.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ServicesHero />
      <ServicesList />
      <ProcessSection />
      <SiteFooter />
    </main>
  )
}
