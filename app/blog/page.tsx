"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogList } from "@/components/blog/blog-list"
import { BlogCategories } from "@/components/blog/blog-categories"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BlogHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogList searchTerm={searchTerm} activeCategory={activeCategory} />
            </div>
            <aside className="lg:col-span-1">
              <BlogCategories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            </aside>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}
