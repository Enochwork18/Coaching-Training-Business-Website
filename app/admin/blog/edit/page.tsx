"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogEditor } from "@/components/admin/blog/blog-editor"

export default function AdminBlogEditPage() {
  const params = useSearchParams()
  const id = params.get("id") || "new"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">{id === "new" ? "Create Post" : "Edit Post"}</h1>
        <Button asChild variant="outline">
          <Link href="/admin/blog">Back to posts</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogEditor postId={id !== "new" ? id : undefined} onSaved={() => { /* no-op */ }} />
        </CardContent>
      </Card>
    </div>
  )
}