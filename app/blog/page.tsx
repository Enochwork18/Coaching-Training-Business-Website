import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogList } from "@/components/blog/blog-list"
import { BlogCategories } from "@/components/blog/blog-categories"

export const metadata = {
  title: "Blog | Ìbáṣepọ̀",
  description:
    "Insights, tips, and resources on personal growth, relationships, leadership, and organizational development.",
}

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid md:grid-cols-3 gap-6">
          <Skeleton className="aspect-video md:aspect-square" />
          <div className="md:col-span-2 p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BlogHero />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Suspense fallback={<BlogListSkeleton />}>
                <BlogList />
              </Suspense>
            </div>
            <aside className="lg:col-span-1">
              <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <BlogCategories />
              </Suspense>
            </aside>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
