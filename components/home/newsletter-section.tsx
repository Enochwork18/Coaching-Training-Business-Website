"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function NewsletterSection() {
  return (
    <section className="py-20 md:py-32 bg-sky-blue/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-4">Join Our Community</h2>
          <p className="text-lg text-charcoal mb-8">
            Receive faith-based insights, practical strategies, and updates directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              required
            />
            <Button type="submit" size="lg" className="bg-deep-teal text-white hover:bg-deep-teal/90">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
