"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-sky/30 via-brand-cream to-brand-mint/20 py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
            About <span className="text-primary">Ìbáṣepọ̀</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
            Building meaningful connections and empowering transformation through compassionate coaching, training, and
            consultancy services.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
