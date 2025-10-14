"use client"

import { motion } from "framer-motion"
import { BadgeCheck } from "lucide-react"

export function CredentialsSection() {
  const credentials = [
    "Certified Life Coach",
    "Relationship and Family Dynamics Specialist",
    "Mental Health First Aider",
    "Member of the International Coaching Federation (ICF)",
    "Neuro-Linguistic Programming (NLP) Practitioner",
  ]

  return (
    <section className="py-20 md:py-32 bg-warm-neutral">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-12">
            Credentials & Training
          </h2>
          <ul className="space-y-4 text-left">
            {credentials.map((credential, index) => (
              <li key={index} className="flex items-center gap-4 text-lg text-charcoal">
                <BadgeCheck className="h-6 w-6 text-deep-teal flex-shrink-0" />
                <span>{credential}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}