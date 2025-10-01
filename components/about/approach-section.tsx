"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function ApproachSection() {
  const approaches = [
    "Client-centered and collaborative methodology",
    "Evidence-based coaching techniques",
    "Cultural sensitivity and inclusivity",
    "Holistic approach to personal and professional development",
    "Continuous professional development and learning",
    "Ethical practice and confidentiality",
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-mint to-brand-teal overflow-hidden">
              <img
                src="/coaching-methodology--professional-development-ses.jpg"
                alt="Our coaching approach"
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
              <p className="text-primary font-semibold mb-2">Our Approach</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance">
                Grounded in Excellence, Driven by Compassion
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our coaching philosophy combines proven methodologies with a deep understanding of cultural contexts and
              individual needs. We believe in creating safe, supportive spaces where transformation can flourish.
            </p>
            <ul className="space-y-3">
              {approaches.map((approach, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{approach}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
