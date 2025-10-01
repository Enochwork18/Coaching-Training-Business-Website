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

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BlogHero />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogList />
            </div>
            <aside className="lg:col-span-1">
              <BlogCategories />
            </aside>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
