"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-warm-neutral py-20 md:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green leading-tight">
              Connected Hearts, <span className="text-deep-teal">Healed Lives</span>
            </h1>
            <p className="text-lg md:text-xl text-charcoal leading-relaxed">
              Guiding families toward peace, purpose, and legacy through faith-based coaching that blends cultural wisdom and practical strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-deep-teal text-white hover:bg-deep-teal/90">
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-deep-teal text-deep-teal">
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-sky-blue overflow-hidden">
              <img
                src="/diverse-group-of-people-in-coaching-session--warm-.jpg"
                alt="Coaching session with diverse group"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
