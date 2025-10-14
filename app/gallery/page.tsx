import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata = {
  title: "Gallery | Ìbáṣepọ̀",
  description: "Explore moments from our coaching sessions, workshops, and events.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </main>
  )
}
