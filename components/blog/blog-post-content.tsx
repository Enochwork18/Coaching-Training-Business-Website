"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/types"

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose prose-lg max-w-none mb-12"
    >
      {post.image && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-8">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className="text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
      />

      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm font-semibold">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share:
          </span>
          <Button variant="outline" size="sm" aria-label="Share on Facebook">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" aria-label="Share on Twitter">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" aria-label="Share on LinkedIn">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
