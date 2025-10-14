import { BlogTable } from "@/components/admin/blog/blog-table"

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-3xl font-bold text-forest-green">Blog Posts</h1>
        <p className="text-charcoal/70">Manage your blog posts here.</p>
      </div>
      <BlogTable />
    </div>
  )
}