"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Building2, Briefcase, GraduationCap, Target, ArrowRight } from "lucide-react"

export function ServicesList() {
  // API Integration Point: GET /api/services
  // This should fetch services from the backend
  // Expected response: Service[]
  const services = [
    {
      id: "1",
      slug: "individual-coaching",
      icon: Users,
      title: "Individual Coaching",
      description: "Personal growth, career development, and life transitions support.",
      features: ["Career advancement", "Life purpose discovery", "Confidence building", "Work-life balance"],
      category: "individual",
    },
    {
      id: "2",
      slug: "couples-coaching",
      icon: Heart,
      title: "Couples Coaching",
      description: "Strengthen relationships and improve communication.",
      features: ["Communication skills", "Conflict resolution", "Intimacy building", "Shared goals alignment"],
      category: "couples",
    },
    {
      id: "3",
      slug: "corporate-training",
      icon: Building2,
      title: "Corporate Training",
      description: "Leadership development and team building programs.",
      features: ["Leadership skills", "Team dynamics", "Change management", "Performance optimization"],
      category: "corporate",
    },
    {
      id: "4",
      slug: "executive-coaching",
      icon: Briefcase,
      title: "Executive Coaching",
      description: "Strategic guidance for senior leaders and executives.",
      features: ["Strategic thinking", "Decision making", "Executive presence", "Stakeholder management"],
      category: "corporate",
    },
    {
      id: "5",
      slug: "group-workshops",
      icon: GraduationCap,
      title: "Group Workshops",
      description: "Interactive learning experiences for teams and communities.",
      features: ["Skill development", "Team bonding", "Knowledge sharing", "Practical tools"],
      category: "corporate",
    },
    {
      id: "6",
      slug: "life-purpose-coaching",
      icon: Target,
      title: "Life Purpose Coaching",
      description: "Discover your calling and align your life with your values.",
      features: ["Values clarification", "Purpose discovery", "Goal setting", "Action planning"],
      category: "individual",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
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
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" className="group w-full">
                    <Link href={`/services/${service.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
