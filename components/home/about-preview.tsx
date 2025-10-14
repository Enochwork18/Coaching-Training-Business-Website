"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function AboutPreview() {
  return (
    <section className="py-20 md:py-32 bg-warm-neutral">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-sky-blue overflow-hidden shadow-lg">
              <img
                src="/elizabeth-omolara-photo.jpg"
                alt="Elizabeth Omolara"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green">
                Meet Elizabeth Omolara
              </h2>
            </div>
            <p className="text-lg text-charcoal leading-relaxed">
              "My mission is to guide you toward a life of peace, purpose, and legacy. Drawing from a deep well of faith, cultural wisdom, and evidence-based practices, I help families build authentic connections and navigate life's challenges with grace."
            </p>
            <Button asChild size="lg" className="bg-deep-teal text-white hover:bg-deep-teal/90">
              <Link href="/about">Read My Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
