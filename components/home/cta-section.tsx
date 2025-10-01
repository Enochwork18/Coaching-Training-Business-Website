"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export function CTASection() {
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
            Ready to Begin Your Transformation?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
            Take the first step towards meaningful change. Book a complimentary consultation to explore how we can
            support your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
