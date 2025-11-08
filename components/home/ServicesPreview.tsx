"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Heart, Briefcase, Users } from "lucide-react"

export function ServicesPreview() {
  const services = [
    {
      icon: Heart,
      title: "Relationship Coaching",
      description: "Strengthen your connection and communication.",
      href: "/services/relationship-coaching",
    },
    {
      icon: Briefcase,
      title: "Business Coaching",
      description: "Achieve your professional goals with expert guidance.",
      href: "/services/business-coaching",
    },
    {
      icon: Users,
      title: "Life Coaching",
      description: "Navigate life's challenges and find your purpose.",
      href: "/services/life-coaching",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-secondary-lavender/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-dark">Our Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary-purple/10 flex items-center justify-center mb-4">
                    <service.icon className="h-8 w-8 text-primary-purple" />
                  </div>
                  <CardTitle className="text-xl font-sans text-text-dark">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-text-dark/80 mb-4">{service.description}</p>
                  <Button asChild variant="link" className="text-primary-purple">
                    <Link href={service.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}