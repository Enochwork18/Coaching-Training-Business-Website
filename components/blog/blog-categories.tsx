"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"

export function BlogCategories() {
  // API Integration Point: GET /api/blog/categories
  // Expected response: { name: string, count: number }[]
  const categories = [
    { name: "Personal Growth", count: 12 },
    { name: "Relationships", count: 8 },
    { name: "Career Development", count: 10 },
    { name: "Leadership", count: 15 },
    { name: "Organizational Development", count: 7 },
    { name: "Mindfulness", count: 6 },
  ]

  const popularPosts = [
    {
      title: "5 Keys to Building Stronger Relationships",
      slug: "5-keys-to-building-stronger-relationships",
    },
    {
      title: "The Power of Emotional Intelligence",
      slug: "power-of-emotional-intelligence-in-leadership",
    },
    {
      title: "Mindfulness Practices for Daily Life",
      slug: "mindfulness-practices-for-daily-life",
    },
  ]

  return (
    <div className="space-y-6 sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {popularPosts.map((post) => (
              <li key={post.slug}>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Get the latest insights delivered to your inbox.</p>
          <NewsletterForm />
        </CardContent>
      </Card>
    </div>
  )
}
