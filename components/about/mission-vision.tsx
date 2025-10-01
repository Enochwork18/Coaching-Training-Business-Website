"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MissionVision() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower individuals, couples, and organizations to achieve meaningful growth and lasting transformation through evidence-based coaching and culturally sensitive support.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A world where everyone has access to the tools, support, and guidance needed to build fulfilling relationships and reach their full potential.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Compassion, integrity, cultural sensitivity, excellence, and a commitment to creating safe spaces for growth and transformation.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
