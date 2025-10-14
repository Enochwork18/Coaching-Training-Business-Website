import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { TeamSection } from "@/components/about/team-section"
import { ApproachSection } from "@/components/about/approach-section"

export const metadata = {
  title: "About Us | Ìbáṣepọ̀",
  description: "Learn about our mission, values, and the team behind Connected Hearts Coaching & Consultancy.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <MissionVision />
      <ApproachSection />
      <TeamSection />
      <Footer />
    </main>
  )
}
