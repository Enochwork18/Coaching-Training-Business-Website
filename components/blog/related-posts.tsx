"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface RelatedPostsProps {
  currentPostId: string
  category: string
}

export function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  // API Integration Point: GET /api/blog/posts/related
  // Query params: ?postId=string&category=string&limit=3
  // Expected response: BlogPost[]
  const relatedPosts = [
    {
      id: "2",
      title: "Communication Strategies for Couples",
      slug: "communication-strategies-for-couples",
      excerpt: "Effective communication techniques that can help couples navigate conflicts.",
      image: "/couple-talking-openly.jpg",
      category: "Relationships",
      publishedAt: "2023-12-20",
      readTime: "6 min read",
    },
    {
      id: "3",
      title: "The Power of Emotional Intelligence",
      slug: "power-of-emotional-intelligence-in-leadership",
      excerpt: "How developing emotional intelligence can transform your relationships.",
      image: "/leader-with-team.jpg",
      category: "Leadership",
      publishedAt: "2024-01-05",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Mindfulness Practices for Daily Life",
      slug: "mindfulness-practices-for-daily-life",
      excerpt: "Simple techniques to reduce stress and increase presence in your relationships.",
      image: "/person-meditating-peacefully.jpg",
      category: "Personal Growth",
      publishedAt: "2024-01-01",
      readTime: "4 min read",
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">Related Articles</h2>
          <p className="text-lg text-muted-foreground">Continue exploring insights on {category.toLowerCase()}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-xl mb-2 hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
