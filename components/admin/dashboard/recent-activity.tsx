"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare, User } from "lucide-react"

export function RecentActivity() {
  // API Integration Point: GET /api/admin/activity
  // Expected response: Activity[]
  const activities = [
    {
      id: "1",
      type: "booking",
      title: "New booking from Sarah Johnson",
      description: "Individual Coaching - Jan 25, 2024",
      time: "2 hours ago",
      icon: Calendar,
    },
    {
      id: "2",
      type: "testimonial",
      title: "New testimonial received",
      description: "5-star review from Michael Chen",
      time: "5 hours ago",
      icon: MessageSquare,
    },
    {
      id: "3",
      type: "blog",
      title: "Blog post published",
      description: "5 Keys to Building Stronger Relationships",
      time: "1 day ago",
      icon: FileText,
    },
    {
      id: "4",
      type: "newsletter",
      title: "New newsletter subscriber",
      description: "jennifer.martinez@email.com",
      time: "2 days ago",
      icon: User,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and actions in your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <activity.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
