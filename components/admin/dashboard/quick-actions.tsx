"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function QuickActions() {
  const actions = [
    { label: "Write Blog Post", href: "/admin/blog/new" },
    { label: "Add New Service", href: "/admin/services/new" },
    { label: "View Bookings", href: "/admin/bookings" },
    { label: "Manage Settings", href: "/admin/settings" },
  ]

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="font-montserrat text-lg text-forest-green">Quick Actions</CardTitle>
        <CardDescription className="text-charcoal/70">Shortcuts to common tasks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button key={action.label} asChild variant="outline" className="w-full justify-start">
            <Link href={action.href}>
              <Plus className="mr-2 h-4 w-4" />
              {action.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
