import { Suspense } from "react"
import { EditPageClient } from "@/components/admin/blog/edit-page-client"

export default function AdminBlogEditPage() {
  return (
    <Suspense fallback={null}>
      <EditPageClient />
    </Suspense>
  )
}
