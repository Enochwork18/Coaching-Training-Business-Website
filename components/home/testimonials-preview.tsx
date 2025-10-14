"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

export function TestimonialsPreview() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marriage Counseling",
      content:
        "Elizabeth helped us find our way back to each other when we thought all hope was lost. Her faith-based approach combined with practical tools gave us exactly what we needed.",
      rating: 5,
    },
    {
      name: "Anonymous",
      role: "Parenting Coaching",
      content:
        "As a single parent struggling with my teenage daughter, I felt completely overwhelmed. Elizabeth's wisdom, patience, and practical strategies transformed our relationship.",
      rating: 5,
    },
    {
      name: "David & Grace T.",
      role: "Pre-Marital Coaching",
      content:
        "Starting our marriage with Elizabeth's guidance was the best decision we made. She helped us build a strong foundation rooted in faith, honest communication, and mutual respect.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-warm-neutral">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-4">What Our Clients Say</h2>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Real stories from families who have found peace, purpose, and connection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/50 backdrop-blur-sm shadow-lg">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-deep-teal/20 mb-4" />
                  <p className="text-charcoal mb-4 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold font-montserrat text-forest-green">{testimonial.name}</p>
                    <p className="text-sm text-charcoal">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
