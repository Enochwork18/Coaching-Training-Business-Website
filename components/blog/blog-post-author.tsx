"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin } from "lucide-react"

interface BlogPostAuthorProps {
  author: {
    name: string
    avatar: string
    bio: string
  }
}

export function BlogPostAuthor({ author }: BlogPostAuthorProps) {
  return (
    <Card className="mb-12">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <img
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-heading text-xl font-bold mb-2">About {author.name}</h3>
            <p className="text-muted-foreground mb-4">{author.bio}</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`${author.name} LinkedIn`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Email ${author.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
