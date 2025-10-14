import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostAuthor } from "@/components/blog/blog-post-author"
import { RelatedPosts } from "@/components/blog/related-posts"

import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogPostContent } from "@/components/blog/blog-post-content"

async function getBlogPost(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)
  if (!res.ok) {
    return null
  }
  return res.json()
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Ìbáṣepọ̀",
    }
  }

  return {
    title: `${post.title} | Ìbáṣepọ̀ Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-warm-neutral">
      <SiteHeader />
      <div className="py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <BlogPostContent post={post} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
