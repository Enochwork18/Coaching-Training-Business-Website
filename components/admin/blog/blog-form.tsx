"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function BlogForm({ post }: { post?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      published: formData.get("published") === "on",
    }

    try {
      const url = post ? `/api/blog/${post.id}` : "/api/blog"
      const method = post ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: `Blog post ${post ? "updated" : "created"} successfully!` })
        router.push("/admin/blog")
      } else {
        setMessage({ type: "error", text: result.message || "Something went wrong. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="font-montserrat text-2xl text-forest-green">{post ? "Edit Post" : "New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-charcoal">Title</Label>
            <Input id="title" name="title" required defaultValue={post?.title} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-charcoal">Content</Label>
            <Textarea id="content" name="content" required defaultValue={post?.content} rows={10} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-charcoal">Category</Label>
            <Input id="category" name="category" required defaultValue={post?.category} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-charcoal">Tags</Label>
            <Input id="tags" name="tags" defaultValue={post?.tags.join(", ")} />
          </div>
          <div className="flex items-center space-x-2">
            <Input type="checkbox" id="published" name="published" defaultChecked={post?.published} />
            <Label htmlFor="published" className="text-charcoal">Published</Label>
          </div>
          {message && (
            <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`} role="alert">
              {message.text}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-teal text-white hover:bg-deep-teal/90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {post ? "Updating..." : "Creating..."}
              </>
            ) : (
              post ? "Update Post" : "Create Post"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}