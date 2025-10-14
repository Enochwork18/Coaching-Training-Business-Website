"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterForm } from "@/components/newsletter-form"

export function BlogCategories() {
  const categories = [
    "Relationships",
    "Faith",
    "Parenting",
    "Personal Growth",
  ]

  return (
    <div className="space-y-6 sticky top-20">
      <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-montserrat text-forest-green">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                className="cursor-pointer bg-sky-blue text-deep-teal hover:bg-deep-teal hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
