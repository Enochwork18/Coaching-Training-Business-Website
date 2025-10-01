"use client"

import { motion } from "framer-motion"
import type { Service } from "@/lib/types"

interface ServiceDetailHeroProps {
  service: Service
}

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-brand-sky/30 via-brand-cream to-brand-mint/20 py-20 md:py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance">{service.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">{service.description}</p>
            {service.duration && (
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Duration:</span>
                  <span className="text-muted-foreground">{service.duration}</span>
                </div>
                {service.price && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Investment:</span>
                    <span className="text-muted-foreground">{service.price}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
