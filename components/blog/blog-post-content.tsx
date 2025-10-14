"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

interface BlogPostContentProps {
  post: BlogPost
}

import { Calendar, Clock, User } from "lucide-react"

interface BlogPostContentProps {
  post: {
    title: string
    image: string
    content: string
    author: string
    createdAt: string
    readTime: number
    category: string
    tags: string[]
  }
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose lg:prose-xl max-w-none"
    >
      <div className="mb-8">
        <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-forest-green">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-charcoal text-sm mt-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
          <Badge className="bg-sky-blue text-deep-teal">{post.category}</Badge>
        </div>
      </div>

      {post.image && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className="text-charcoal leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
      />

      <div className="mt-12 pt-8 border-t border-charcoal/20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-forest-green">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} className="bg-deep-teal/10 text-deep-teal">{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
