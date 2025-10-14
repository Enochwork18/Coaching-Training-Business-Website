"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BlogHero() {
  return (
    <section className="relative bg-warm-neutral py-20 md:py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-forest-green mb-6">
            From the Blog
          </h1>
          <p className="text-xl md:text-2xl text-charcoal leading-relaxed mb-8">
            Insights and reflections to guide you on your journey of faith, family, and personal growth.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal/50" />
            <Input
              type="search"
              placeholder="Search articles, tags, or categories..."
              className="pl-10 h-12"
              aria-label="Search blog posts"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
