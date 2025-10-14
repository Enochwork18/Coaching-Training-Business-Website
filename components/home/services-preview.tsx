"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BookOpen, Briefcase, Handshake, Heart, Mic, Users, ArrowRight } from "lucide-react"

export function ServicesPreview() {
  const services = [
    {
      icon: Heart,
      title: "Marriage & Relationships",
      description: "Strengthen your bond with faith-based guidance.",
      href: "/services/marriage-counseling",
    },
    {
      icon: Users,
      title: "Parenting & Family",
      description: "Build confident, emotionally intelligent children.",
      href: "/services/parenting-coaching",
    },
    {
      icon: Briefcase,
      title: "Personal Development",
      description: "Unlock your potential and find your purpose.",
      href: "/services/personal-development",
    },
    {
      icon: Handshake,
      title: "Consultancy",
      description: "Strategic advice for organizations and leaders.",
      href: "/services/consultancy",
    },
    {
      icon: Mic,
      title: "Speaking Engagements",
      description: "Inspirational talks on faith, family, and leadership.",
      href: "/services/speaking-engagements",
    },
    {
      icon: BookOpen,
      title: "Digital Resources",
      description: "E-books, courses, and tools for growth.",
      href: "/services/digital-resources",
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
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-4">
            Our Services
          </h2>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Blending cultural wisdom and practical strategies for individuals, couples, and families.
          </p>
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
              <Card className="h-full hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-deep-teal/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-deep-teal" />
                  </div>
                  <CardTitle className="text-xl font-montserrat text-forest-green">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal mb-4">{service.description}</p>
                  <Button asChild variant="link" className="p-0 text-deep-teal">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
