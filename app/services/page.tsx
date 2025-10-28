"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesList } from "@/components/services/services-list"
import { ProcessSection } from "@/components/services/process-section"
import { useDebounce } from "@/hooks/use-debounce"
import { Loader2 } from "lucide-react"

// Mock data - this would typically come from an API
const allServices = [
    { id: "1", title: "Individual Coaching", slug: "individual-coaching", category: "Personal Development", excerpt: "Unlock your potential with one-on-one guidance.", image: "/individual-coaching-session--professional-setting.jpg" },
    { id: "2", title: "Couples Coaching", slug: "couples-coaching", category: "Marriage & Relationships", excerpt: "Strengthen your bond and improve communication.", image: "/couple-talking-openly.jpg" },
    { id: "3", title: "Corporate Training", slug: "corporate-training", category: "Consultancy", excerpt: "Enhance team performance and leadership skills.", image: "/team-learning-workshop.jpg" },
    { id: "4", title: "Parenting & Family", slug: "parenting-family", category: "Parenting & Family", excerpt: "Navigate the challenges of modern parenting.", image: "/diverse-group-of-people-in-coaching-session--warm-.jpg" },
    { id: "5", title: "Faith & Spiritual Growth", slug: "faith-spiritual-growth", category: "Faith & Spiritual Growth", excerpt: "Deepen your spiritual journey and find purpose.", image: "/person-meditating-peacefully.jpg" },
    { id: "6", title: "Speaking Engagements", slug: "speaking-engagements", category: "Speaking", excerpt: "Inspirational talks for events and organizations.", image: "/leader-with-team.jpg" },
    { id: "7", title: "Digital Resources", slug: "digital-resources", category: "Digital Resources", excerpt: "E-books and guides for self-paced learning.", image: "/coaching-methodology--professional-development-ses.jpg" },
    { id: "8", title: "Workshops", slug: "workshops", category: "Workshops", excerpt: "Interactive group sessions on various topics.", image: "/professional-coach-in-consultation--warm-office-se.jpg" },
]

function ServicesContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"

  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const [filteredServices, setFilteredServices] = useState(allServices)

  useEffect(() => {
    const filtered = allServices.filter(service => {
      const matchesCategory = activeCategory === "All" || service.category === activeCategory
      const matchesSearch = debouncedSearchTerm === "" || 
        service.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        service.excerpt.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredServices(filtered)
  }, [debouncedSearchTerm, activeCategory])

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (activeCategory === "All") {
      params.delete("category")
    } else {
      params.set("category", activeCategory)
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`)
  }, [activeCategory])

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ServicesHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ServicesList 
        services={filteredServices} 
        allServicesCount={allServices.length}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProcessSection />
      <SiteFooter />
    </main>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ServicesContent />
    </Suspense>
  )
}
