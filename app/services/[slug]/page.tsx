import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceDetailHero } from "@/components/services/service-detail-hero"
import { ServiceDetailContent } from "@/components/services/service-detail-content"
import { ServiceCTA } from "@/components/services/service-cta"

// API Integration Point: GET /api/services
// This should fetch all services for static generation
export async function generateStaticParams() {
  // In production, fetch from API
  // const services = await fetch('/api/services').then(res => res.json())
  // return services.map((service) => ({ slug: service.slug }))

  return [
    { slug: "individual-coaching" },
    { slug: "couples-coaching" },
    { slug: "corporate-training" },
    { slug: "executive-coaching" },
    { slug: "group-workshops" },
    { slug: "life-purpose-coaching" },
  ]
}

// API Integration Point: GET /api/services/:slug
// This should fetch a single service by slug
async function getService(slug: string) {
  // In production, fetch from API
  // const service = await fetch(`/api/services/${slug}`).then(res => res.json())
  // if (!service) return null
  // return service

  // Mock data for now
  const services: Record<string, any> = {
    "individual-coaching": {
      id: "1",
      title: "Individual Coaching",
      slug: "individual-coaching",
      description: "Personal growth, career development, and life transitions support.",
      longDescription:
        "Our individual coaching services are designed to help you unlock your full potential, navigate life transitions, and achieve your personal and professional goals. Through one-on-one sessions, we provide personalized support tailored to your unique circumstances and aspirations.",
      image: "/individual-coaching-session--professional-setting.jpg",
      features: [
        "Personalized coaching plans",
        "Career advancement strategies",
        "Life purpose discovery",
        "Confidence and self-esteem building",
        "Work-life balance optimization",
        "Goal setting and accountability",
      ],
      duration: "60-90 minutes per session",
      price: "Starting at $150/session",
      category: "individual",
    },
  }

  return services[slug] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: "Service Not Found | Ìbáṣepọ̀",
    }
  }

  return {
    title: `${service.title} | Ìbáṣepọ̀`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} />
      <ServiceCTA />
      <Footer />
    </main>
  )
}
