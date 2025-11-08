"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function BlogPreview() {
  const posts = [
    {
      title: "5 Pillars of a Healthy Marriage",
      excerpt: "Discover the foundation of lasting love through these five essential principles...",
      href: "/blog/5-pillars-of-a-healthy-marriage",
    },
    {
      title: "Raising Emotionally Intelligent Children",
      excerpt: "Help your children understand and manage their emotions while building resilience...",
      href: "/blog/raising-emotionally-intelligent-children",
    },
    {
      title: "Healing from Relationship Trauma",
      excerpt: "A compassionate guide to processing past hurts and moving forward with hope...",
      href: "/blog/healing-from-relationship-trauma",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-text-dark">From the Blog</h2>
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
              <Card className="h-full hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-sans text-text-dark">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-dark/80 mb-4">{post.excerpt}</p>
                  <Button asChild variant="link" className="text-primary-purple">
                    <Link href={post.href}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="border-primary-purple text-primary-purple">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}