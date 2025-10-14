"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function AboutPreview() {
  const values = [
    "Compassionate and client-centered approach",
    "Evidence-based coaching methodologies",
    "Cultural sensitivity and inclusivity",
    "Commitment to lasting transformation",
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-mint to-brand-sky overflow-hidden">
              <img
                src="/professional-coach-in-consultation--warm-office-se.jpg"
                alt="Professional coaching consultation"
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
              <p className="text-primary font-semibold mb-2">About Ìbáṣepọ̀</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
                Building Bridges to Your Best Self
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ìbáṣepọ̀ means "connection" in Yoruba, reflecting our core belief that meaningful relationships—with
              ourselves, others, and our purpose—are the foundation of a fulfilling life.
            </p>
            <ul className="space-y-3">
              {values.map((value, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
