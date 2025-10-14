import { BlogForm } from "@/components/admin/blog/blog-form"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold text-forest-green">New Blog Post</h1>
        <p className="text-charcoal/70">Create a new blog post here.</p>
      </div>
      <BlogForm />
    </div>
  )
}