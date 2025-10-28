"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"
import { Briefcase, FileText, Star, Upload } from "lucide-react"

export function QuickActions() {
  const actions = [
    { label: "Add Service", href: "/admin/services/new", icon: Briefcase },
    { label: "Write Blog Post", href: "/admin/blog/new", icon: FileText },
    { label: "Add Testimonial", href: "/admin/testimonials/new", icon: Star },
    { label: "Upload to Gallery", href: "/admin/gallery/new", icon: Upload },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button key={action.label} asChild variant="outline" className="w-full justify-start bg-transparent">
            <Link href={action.href}>
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
