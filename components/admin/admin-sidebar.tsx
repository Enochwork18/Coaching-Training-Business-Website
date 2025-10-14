"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Newspaper, Briefcase, MessageSquare, ImageIcon, Calendar, Users, Settings, LogOut } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const routes = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/subscribers", label: "Subscribers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="hidden lg:flex flex-col h-full w-64 border-r bg-white">
      <div className="p-6">
        <Link href="/" className="font-bold text-2xl text-forest-green">
          Ìbáṣepọ̀
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="px-4 py-2 space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant={pathname === route.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}