"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-background-light py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark leading-tight">
            Connected Hearts, <span className="text-primary-purple">Empowered Minds.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-text-dark/80 leading-relaxed">
            Guiding you on a transformative journey of personal growth, relationship healing, and professional development.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-primary-purple text-white hover:bg-primary-purple/90">
              <Link href="/booking">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}