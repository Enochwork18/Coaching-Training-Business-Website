"use client"

import type React from "react"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { requireAdmin } from "@/lib/auth"

export const metadata = {
  title: "Admin Dashboard | Ìbáṣepọ̀",
  description: "Manage your coaching business content and data.",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    requireAdmin()
  }, [])

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
