"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AboutSnippet() {
  return (
    <section className="py-20 md:py-32 bg-background-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-dark">About Ìbáṣepọ̀</h2>
          <p className="mt-6 text-lg md:text-xl text-text-dark/80 leading-relaxed">
            Ìbáṣepọ̀ is a coaching and consultancy service dedicated to helping individuals, couples, and families build stronger connections and live more fulfilling lives. Our approach is rooted in faith, cultural wisdom, and evidence-based practices.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="outline" className="border-primary-purple text-primary-purple">
              <Link href="/about">Read More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}