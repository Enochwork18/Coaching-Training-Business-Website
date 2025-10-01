"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function TestimonialsCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
            Join hundreds of individuals, couples, and organizations who have transformed their lives through our
            coaching services.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="/booking">Start Your Journey Today</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
