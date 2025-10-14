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
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
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
          <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm">
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
                    <Badge className="bg-sky-blue text-deep-teal">{post.category}</Badge>
                    {post.featured && <Badge className="bg-deep-teal text-white">Featured</Badge>}
                  </div>
                  <CardTitle className="text-2xl mb-3 font-montserrat text-forest-green hover:text-deep-teal transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-base mb-4 text-charcoal">{post.excerpt}</CardDescription>
                </div>
                <div className="flex items-center justify-between text-sm text-charcoal">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Button variant="link" className="p-0 text-deep-teal">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
