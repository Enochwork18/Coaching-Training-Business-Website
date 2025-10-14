import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
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
      <Header />
      <BlogHero />
      <div className="py-20 md:py-32 bg-background-light">
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
      <Footer />
    </main>
  )
}
