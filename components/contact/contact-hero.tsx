"use client"

import { motion } from "framer-motion"

export function ContactHero() {
  return (
    <section className="relative bg-warm-neutral py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-charcoal leading-relaxed">
            Have a question or ready to start your journey? We'd love to hear from you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
