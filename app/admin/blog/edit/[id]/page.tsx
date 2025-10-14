import { BlogForm } from "@/components/admin/blog/blog-form"
import { notFound } from "next/navigation"

async function getBlogPost(id: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`)
  if (!res.ok) {
    return null
  }
  return res.json()
}

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold text-forest-green">Edit Blog Post</h1>
        <p className="text-charcoal/70">Edit your blog post here.</p>
      </div>
      <BlogForm post={post} />
    </div>
  )
}