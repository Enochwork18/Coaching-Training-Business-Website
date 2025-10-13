import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostAuthor } from "@/components/blog/blog-post-author"
import { RelatedPosts } from "@/components/blog/related-posts"

import { BlogPost } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// API Integration Point: GET /api/blog/posts
// This should fetch all blog posts for static generation
export async function generateStaticParams() {
    try {
        const res = await fetch(`${BASE_URL}/api/blog/posts`);
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        const posts = data.posts as BlogPost[];
        return posts.map((post) => ({ slug: post.slug }));
    } catch (error) {
        console.error("Failed to fetch slugs for static generation", error);
        return [];
    }
}

// API Integration Point: GET /api/blog/posts/:slug
// This should fetch a single blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/blog/posts/${slug}`, {
            cache: 'no-store' // Ensure fresh data
        });
        if (!res.ok) {
            return null;
        }
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch blog post with slug ${slug}`, error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getBlogPost(slug)

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
  const { slug } = params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BlogPostHero post={post} />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <BlogPostContent post={post} />
            <BlogPostAuthor author={post.author} />
          </div>
        </div>
      </div>
      <RelatedPosts currentPostId={post.id} category={post.category} />
      <SiteFooter />
    </main>
  )
}
