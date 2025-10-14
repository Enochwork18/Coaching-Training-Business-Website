"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function BlogPreview() {
  const posts = [
    {
      title: "5 Pillars of a Healthy Marriage",
      category: "Relationships",
      excerpt: "Discover the foundation of lasting love through these five essential principles rooted in faith and psychology.",
      href: "/blog/5-pillars-of-a-healthy-marriage",
      image: "/blog-image-1.jpg",
    },
    {
      title: "Raising Emotionally Intelligent Children",
      category: "Parenting",
      excerpt: "Help your children understand and manage their emotions while building resilience for life's challenges.",
      href: "/blog/raising-emotionally-intelligent-children",
      image: "/blog-image-2.jpg",
    },
    {
      title: "Healing from Relationship Trauma",
      category: "Personal Growth",
      excerpt: "A compassionate guide to processing past hurts and moving forward with hope and wholeness.",
      href: "/blog/healing-from-relationship-trauma",
      image: "/blog-image-3.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-warm-neutral">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-forest-green mb-4">From the Blog</h2>
          <p className="text-lg text-charcoal max-w-2xl mx-auto">
            Insights and reflections to guide you on your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="aspect-[16/9] rounded-t-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <CardTitle className="text-xl font-montserrat text-forest-green pt-4">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-charcoal">{post.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal mb-4">{post.excerpt}</p>
                  <Button asChild variant="link" className="p-0 text-deep-teal">
                    <Link href={post.href}>
                      Read More
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