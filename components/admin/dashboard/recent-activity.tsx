"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, MessageSquare, User } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: "1",
      user: "Elizabeth Omolara",
      action: "approved",
      item: "testimonial from Sarah M.",
      timestamp: "2024-03-06T10:30:00Z",
      icon: MessageSquare,
    },
    {
      id: "2",
      user: "Elizabeth Omolara",
      action: "published",
      item: 'blog post "5 Pillars"',
      timestamp: "2024-03-05T14:20:00Z",
      icon: FileText,
    },
  ]

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="font-montserrat text-lg text-forest-green">Recent Activity</CardTitle>
        <CardDescription className="text-charcoal/70">A log of recent administrative actions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-deep-teal/10 flex items-center justify-center flex-shrink-0">
                <activity.icon className="h-5 w-5 text-deep-teal" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-charcoal">
                  <span className="font-semibold">{activity.user}</span> {activity.action} the <span className="font-semibold">{activity.item}</span>.
                </p>
                <p className="text-xs text-charcoal/70">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
