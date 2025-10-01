"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TestimonialsHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-sky/30 via-brand-cream to-brand-mint/20 py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-primary text-primary" />
            ))}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Stories of <span className="text-primary">Transformation</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
            Hear from individuals, couples, and organizations who have experienced meaningful growth and lasting change
            through our coaching services.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
