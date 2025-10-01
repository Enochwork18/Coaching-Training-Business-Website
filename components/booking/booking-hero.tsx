"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function BookingHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-sky/30 via-brand-cream to-brand-mint/20 py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            <span>Schedule Your Session</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Book Your <span className="text-primary">Transformation</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
            Take the first step towards meaningful change. Schedule a complimentary consultation to explore how we can
            support your journey.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
