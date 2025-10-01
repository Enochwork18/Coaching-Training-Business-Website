"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, MessageSquare } from "lucide-react"

export function ServiceCTA() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Take the first step towards transformation. Book a complimentary consultation or reach out with any
            questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
