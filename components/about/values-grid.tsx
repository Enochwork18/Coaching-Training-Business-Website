"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Handshake, TrendingUp, Sun, BookOpen, Users } from "lucide-react"

export function ValuesGrid() {
  const values = [
    {
      icon: Heart,
      title: "Faith Foundation",
      description: "Our work is rooted in faith, providing a compassionate and hopeful perspective.",
    },
    {
      icon: Handshake,
      title: "Authentic Connection",
      description: "We believe in building genuine relationships based on trust, respect, and empathy.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "We are committed to lifelong learning and personal development for ourselves and our clients.",
    },
    {
      icon: Sun,
      title: "Cultural Roots",
      description: "We honor and integrate cultural wisdom, particularly from our rich Nigerian heritage.",
    },
    {
      icon: Users,
      title: "Compassionate Support",
      description: "We provide a safe, non-judgmental space for clients to explore and grow.",
    },
    {
      icon: BookOpen,
      title: "Evidence-Based Practice",
      description: "Our methods are informed by proven, research-backed coaching and psychological principles.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-sky-blue/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-4">Our Core Values</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center bg-white/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-deep-teal/10 flex items-center justify-center mb-4 mx-auto">
                    <value.icon className="h-6 w-6 text-deep-teal" />
                  </div>
                  <CardTitle className="text-xl font-montserrat text-forest-green">{value.title}</CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}