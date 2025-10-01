"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TestimonialsGrid() {
  const [loading] = useState(false)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    console.log("TestimonialsGrid mounted. Total testimonials:", testimonials.length)
  }, [])

  // API Integration Point: GET /api/testimonials
  // Query params: ?category=string&featured=boolean
  // Expected response: Testimonial[]
  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Marketing Executive",
      company: "Tech Corp",
      image: "/professional-woman-smiling.png",
      content:
        "Working with Ìbáṣepọ̀ has been transformative for my career and personal life. The coaching sessions helped me gain clarity on my goals and develop the confidence to pursue them. I've since been promoted and feel more aligned with my purpose than ever before.",
      rating: 5,
      serviceId: "individual-coaching",
      category: "Individual Coaching",
      featured: true,
    },
    {
      id: "2",
      name: "Michael & Lisa Chen",
      role: "Couple",
      image: "/happy-couple-park.png",
      content:
        "Our relationship was at a breaking point when we started couples coaching. The tools and insights we gained have completely transformed how we communicate and connect. We're now stronger than ever and have the skills to navigate any challenge together.",
      rating: 5,
      serviceId: "couples-coaching",
      category: "Couples Coaching",
      featured: true,
    },
    {
      id: "3",
      name: "David Thompson",
      role: "CEO",
      company: "Innovation Labs",
      image: "/business-executive.png",
      content:
        "The corporate training program was exactly what our leadership team needed. The facilitators created a safe space for vulnerability and growth. Our team dynamics have improved dramatically, and we're seeing the results in our performance metrics.",
      rating: 5,
      serviceId: "corporate-training",
      category: "Corporate Training",
      featured: true,
    },
    {
      id: "4",
      name: "Jennifer Martinez",
      role: "Entrepreneur",
      image: "/female-entrepreneur.jpg",
      content:
      featured: false,
    },
    {
      id: "5",
      name: "Robert & Amanda Williams",
      role: "Couple",
      image: "/couple-smiling-together.jpg",
      content:
        "We came to coaching to work on our communication, but we gained so much more. We learned to truly see and appreciate each other. The exercises and homework assignments were practical and effective. Highly recommend!",
      rating: 5,
      serviceId: "couples-coaching",
      category: "Couples Coaching",
      featured: false,
    },
    {
      id: "6",
      name: "Patricia Anderson",
      role: "HR Director",
      company: "Global Solutions Inc",
      image: "/professional-woman-office.jpg",
      content:
        "The executive coaching program helped me develop the leadership presence I needed to step into my new role with confidence. My coach challenged me in the best ways and provided invaluable support during a critical transition.",
      rating: 5,
      serviceId: "executive-coaching",
      category: "Corporate Training",
      featured: false,
    },
    {
      id: "7",
      name: "James Cooper",
      role: "Software Engineer",
      image: "/young-professional-male.jpg",
      content:
        "I was struggling with work-life balance and burnout. The coaching sessions gave me tools to set boundaries, prioritize what matters, and find joy in my work again. I'm more productive and much happier.",
      rating: 5,
      serviceId: "individual-coaching",
      category: "Individual Coaching",
      featured: false,
    },
    {
      id: "8",
      name: "Maria Rodriguez",
      role: "Non-Profit Director",
      image: "/nonprofit-leader.jpg",
      content:
        "The group workshop on leadership was phenomenal. The interactive format and practical exercises made the learning stick. Our entire team left energized and equipped with new skills we use daily.",
      rating: 5,
      serviceId: "group-workshops",
      category: "Corporate Training",
      featured: false,
    },
    {
      id: "9",
      name: "Tom & Rachel Green",
      role: "Couple",
      image: "/mature-couple-happy.jpg",
      content:
        "After 20 years of marriage, we thought we knew everything about each other. Couples coaching showed us there's always room to grow deeper. We're rediscovering each other and falling in love all over again.",
      rating: 5,
      serviceId: "couples-coaching",
      category: "Couples Coaching",
      featured: false,
    },
  ]

  const filteredTestimonials = filter === "all" ? testimonials : testimonials.filter((t) => t.category === filter)

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-20 w-20 rounded-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredTestimonials.length} testimonial{filteredTestimonials.length !== 1 ? "s" : ""}
          </p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Individual Coaching">Individual Coaching</SelectItem>
              <SelectItem value="Couples Coaching">Couples Coaching</SelectItem>
              <SelectItem value="Corporate Training">Corporate Training</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  {testimonial.featured && <Badge className="bg-primary text-primary-foreground mb-4">Featured</Badge>}
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-4 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && `, ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-4">
                    {testimonial.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
