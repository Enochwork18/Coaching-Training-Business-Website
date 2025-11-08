"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-primary-purple text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Take the first step towards a more connected and fulfilling life.
          </p>
          <Button asChild size="lg" className="bg-white text-primary-purple hover:bg-white/90">
            <Link href="/booking">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}