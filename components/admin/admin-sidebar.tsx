"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, FileText, MessageSquare, ImageIcon, Calendar, Mail, Eye } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/blog", label: "Blog Posts", icon: FileText },
    { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  ]

  return (
    <aside className="w-64 border-r bg-background min-h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}

        <div className="pt-4 mt-4 border-t">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </nav>
    </aside>
  )
}
