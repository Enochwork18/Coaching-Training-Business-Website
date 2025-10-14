"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, MessageSquare, Users } from "lucide-react"

export function DashboardStats() {
  // API Integration Point: GET /api/admin/stats
  // Expected response: { services: number, blogPosts: number, testimonials: number, bookings: number }
  const stats = [
    { title: "Services", value: "6", icon: Briefcase, change: "+2 this month" },
    { title: "Blog Posts", value: "24", icon: FileText, change: "+4 this month" },
    { title: "Testimonials", value: "47", icon: MessageSquare, change: "+8 this month" },
    { title: "Bookings", value: "156", icon: Users, change: "+23 this month" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
