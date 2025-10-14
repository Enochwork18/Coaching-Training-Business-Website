"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users, Heart, Building2, ArrowRight } from "lucide-react"

export function ServicesPreview() {
  const services = [
    {
      icon: Users,
      title: "Individual Coaching",
      description: "Personal growth, career development, and life transitions support tailored to your unique journey.",
      href: "/services/individual-coaching",
    },
    {
      icon: Heart,
      title: "Couples Coaching",
      description: "Strengthen your relationship, improve communication, and build a deeper connection together.",
      href: "/services/couples-coaching",
    },
    {
      icon: Building2,
      title: "Corporate Training",
      description: "Leadership development, team building, and organizational transformation programs.",
      href: "/services/corporate-training",
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
          <p className="text-primary font-semibold mb-2">Our Services</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">
            Tailored Solutions for Every Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Whether you're seeking personal growth, relationship enhancement, or organizational development, we have the
            expertise to guide you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
