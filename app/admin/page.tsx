import { redirect } from "next/navigation"

export default function AdminPage() {
  // In production, check authentication here
  // If not authenticated, redirect to login
  redirect("/admin/dashboard")
}
