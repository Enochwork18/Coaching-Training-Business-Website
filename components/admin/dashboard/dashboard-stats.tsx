"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, MessageSquare, Users, Calendar, Newspaper } from "lucide-react"

export function DashboardStats() {
  const stats = [
    { title: "Bookings this month", value: "8", icon: Calendar, change: "+25%" },
    { title: "New Subscribers this week", value: "4", icon: Users, change: "+33%" },
    { title: "Published Blog Posts", value: "3", icon: Newspaper, change: null },
    { title: "Pending Testimonials", value: "2", icon: MessageSquare, change: null },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-charcoal">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-deep-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-green">{stat.value}</div>
            {stat.change && <p className="text-xs text-charcoal/70">{stat.change} from last period</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
