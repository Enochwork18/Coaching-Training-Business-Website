"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"

export function TeamSection() {
  const team = [
    {
      name: "Dr. Adebayo Okonkwo",
      role: "Founder & Lead Coach",
      bio: "Certified professional coach with 15+ years of experience in individual and organizational development.",
      image: "/professional-coach-headshot.jpg",
      linkedin: "#",
      email: "adebayo@ibashepo.com",
    },
    {
      name: "Sarah Mitchell",
      role: "Couples & Relationship Coach",
      bio: "Specializing in relationship dynamics and communication, helping couples build stronger connections.",
      image: "/female-coach-headshot.jpg",
      linkedin: "#",
      email: "sarah@ibashepo.com",
    },
    {
      name: "James Rodriguez",
      role: "Corporate Training Specialist",
      bio: "Expert in leadership development and organizational transformation with Fortune 500 experience.",
      image: "/male-business-coach-headshot.jpg",
      linkedin: "#",
      email: "james@ibashepo.com",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold mb-2">Our Team</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">
            Meet the Experts Behind Your Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our diverse team of certified coaches and consultants brings decades of combined experience and a shared
            passion for empowering change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
