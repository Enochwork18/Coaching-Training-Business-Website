"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export function TestimonialsPreview() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Executive",
      content:
        "The coaching sessions transformed my approach to leadership. I've gained confidence and clarity in my career path.",
      rating: 5,
      image: "/professional-woman-smiling.png",
    },
    {
      name: "Michael & Lisa Chen",
      role: "Couple",
      content:
        "Our relationship has never been stronger. The tools and insights we gained have been life-changing for us both.",
      rating: 5,
      image: "/happy-couple-park.png",
    },
    {
      name: "David Thompson",
      role: "CEO, Tech Startup",
      content:
        "The corporate training program elevated our team's performance and created a culture of continuous growth.",
      rating: 5,
      image: "/business-executive.png",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold mb-2">Testimonials</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">Stories of Transformation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hear from those who have experienced the power of connected hearts and transformed lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
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
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/testimonials">Read More Stories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
