"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative bg-warm-neutral py-20 md:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="aspect-square rounded-2xl bg-sky-blue overflow-hidden shadow-lg">
              <img
                src="/elizabeth-omolara-photo.jpg"
                alt="Elizabeth Omolara"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center order-1 lg:order-2"
          >
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-6">
              Guiding families toward peace, purpose, and legacy
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
