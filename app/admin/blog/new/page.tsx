"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogEditor } from "@/components/admin/blog/blog-editor"

export default function AdminBlogNewPage() {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Create New Post</h1>
        <Button asChild variant="outline">
          <Link href="/admin/blog">Back to posts</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogEditor onSaved={(id) => router.push(`/admin/blog/edit?id=${id}`)} />
        </CardContent>
      </Card>
    </div>
  )
}