"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageSquare, Target, TrendingUp } from "lucide-react"

export function ProcessSection() {
  const steps = [
    {
      icon: Calendar,
      title: "Book Consultation",
      description: "Schedule a complimentary consultation to discuss your goals and needs.",
    },
    {
      icon: MessageSquare,
      title: "Assessment & Planning",
      description: "We'll assess your situation and create a customized coaching plan.",
    },
    {
      icon: Target,
      title: "Coaching Sessions",
      description: "Engage in regular sessions with your dedicated coach.",
    },
    {
      icon: TrendingUp,
      title: "Growth & Results",
      description: "Track progress, celebrate wins, and achieve lasting transformation.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold mb-2">Our Process</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">
            Your Journey to Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A simple, structured approach designed to maximize your growth and ensure lasting results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 font-bold">
                    {index + 1}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
