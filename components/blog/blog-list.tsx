"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { BlogPost } from "@/lib/types"
import { useSearchParams } from "next/navigation"

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(6)

  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })
      if (category) {
        query.set("category", category)
      }
      if (search) {
        query.set("search", search)
      }

      try {
        const res = await fetch(`/api/blog/posts?${query.toString()}`)
        const data = await res.json()
        setPosts(data.posts)
        setTotal(data.total)
      } catch (error) {
        console.error("Failed to fetch blog posts", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, limit, category, search])

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
              <div className="aspect-video md:aspect-square overflow-hidden relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  layout="fill"
                  className="object-cover hover:scale-105 transition-transform duration-300"
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
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
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

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No posts found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center gap-2 pt-8">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          {[...Array(Math.ceil(total / limit))].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(total / limit)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
