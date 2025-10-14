"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function BlogList() {
  const [loading] = useState(false)

  // API Integration Point: GET /api/blog/posts
  // Expected response: BlogPost[]
  // Query params: ?page=1&limit=10&category=string&search=string
  const posts = [
    {
      id: "1",
      title: "5 Keys to Building Stronger Relationships",
      slug: "5-keys-to-building-stronger-relationships",
      excerpt:
        "Discover the essential elements that create lasting, meaningful connections with the people who matter most in your life.",
      image: "/couple-having-meaningful-conversation.jpg",
      category: "Relationships",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      featured: true,
      author: {
        name: "Dr. Adebayo Okonkwo",
        avatar: "/professional-coach-headshot.jpg",
      },
    },
    {
      id: "2",
      title: "Navigating Career Transitions with Confidence",
      slug: "navigating-career-transitions-with-confidence",
      excerpt:
        "Learn how to approach career changes with clarity, purpose, and the confidence to pursue your professional goals.",
      image: "/professional-at-crossroads.jpg",
      category: "Career Development",
      publishedAt: "2024-01-10",
      readTime: "7 min read",
      featured: false,
      author: {
        name: "Sarah Mitchell",
        avatar: "/female-coach-headshot.jpg",
      },
    },
    {
      id: "3",
      title: "The Power of Emotional Intelligence in Leadership",
      slug: "power-of-emotional-intelligence-in-leadership",
      excerpt:
        "Explore how developing emotional intelligence can transform your leadership style and create more engaged, productive teams.",
      image: "/leader-with-team.jpg",
      category: "Leadership",
      publishedAt: "2024-01-05",
      readTime: "6 min read",
      featured: false,
      author: {
        name: "James Rodriguez",
        avatar: "/male-business-coach-headshot.jpg",
      },
    },
    {
      id: "4",
      title: "Mindfulness Practices for Daily Life",
      slug: "mindfulness-practices-for-daily-life",
      excerpt:
        "Simple, practical mindfulness techniques you can incorporate into your routine to reduce stress and increase presence.",
      image: "/person-meditating-peacefully.jpg",
      category: "Personal Growth",
      publishedAt: "2024-01-01",
      readTime: "4 min read",
      featured: false,
      author: {
        name: "Dr. Adebayo Okonkwo",
        avatar: "/professional-coach-headshot.jpg",
      },
    },
    {
      id: "5",
      title: "Creating a Culture of Continuous Learning",
      slug: "creating-culture-of-continuous-learning",
      excerpt:
        "How organizations can foster an environment where growth, development, and innovation become part of the DNA.",
      image: "/team-learning-workshop.jpg",
      category: "Organizational Development",
      publishedAt: "2023-12-28",
      readTime: "8 min read",
      featured: false,
      author: {
        name: "James Rodriguez",
        avatar: "/male-business-coach-headshot.jpg",
      },
    },
    {
      id: "6",
      title: "Communication Strategies for Couples",
      slug: "communication-strategies-for-couples",
      excerpt:
        "Effective communication techniques that can help couples navigate conflicts and deepen their emotional connection.",
      image: "/couple-talking-openly.jpg",
      category: "Relationships",
      publishedAt: "2023-12-20",
      readTime: "6 min read",
      featured: false,
      author: {
        name: "Sarah Mitchell",
        avatar: "/female-coach-headshot.jpg",
      },
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <div className="grid md:grid-cols-3 gap-6">
              <Skeleton className="aspect-video md:aspect-square" />
              <div className="md:col-span-2 p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`} className="grid md:grid-cols-3 gap-6">
              <div className="aspect-video md:aspect-square overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="md:col-span-2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                  </div>
                  <CardTitle className="text-2xl mb-3 hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </Card>
        </motion.div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-8">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  )
}
