"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

export function TestimonialsPreview() {
  const testimonials = [
    {
      quote: "The coaching sessions transformed my approach to leadership. I've gained confidence and clarity in my career path.",
      author: "Sarah Johnson",
    },
    {
      quote: "Our relationship has never been stronger. The tools and insights we gained have been life-changing for us both.",
      author: "Michael & Lisa Chen",
    },
    {
      quote: "The corporate training program elevated our team's performance and created a culture of continuous growth.",
      author: "David Thompson",
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
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-dark">What Our Clients Say</h2>
        </motion.div>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="bg-white">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-lg md:text-xl text-text-dark/80 mb-4">"{testimonial.quote}"</p>
                      <p className="font-semibold text-text-dark">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}