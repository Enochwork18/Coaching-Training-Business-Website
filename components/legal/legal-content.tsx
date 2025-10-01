"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface LegalContentProps {
  title: string
  lastUpdated: string
  content: string
}

export function LegalContent({ title, lastUpdated, content }: LegalContentProps) {
  return (
    <>
      <section className="relative bg-gradient-to-br from-brand-sky/30 via-brand-cream to-brand-mint/20 py-20 md:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">{title}</h1>
            <p className="text-lg text-muted-foreground">Last Updated: {lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="pt-6">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content
                      .split("\n")
                      .map((line) => {
                        if (line.startsWith("# ")) {
                          return `<h1 class="font-heading text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`
                        }
                        if (line.startsWith("## ")) {
                          return `<h2 class="font-heading text-2xl font-bold mt-6 mb-3">${line.slice(3)}</h2>`
                        }
                        if (line.startsWith("### ")) {
                          return `<h3 class="font-heading text-xl font-semibold mt-4 mb-2">${line.slice(4)}</h3>`
                        }
                        if (line.startsWith("- ")) {
                          return `<li class="ml-6 mb-2">${line.slice(2)}</li>`
                        }
                        if (line.trim() === "") {
                          return "<br />"
                        }
                        return `<p class="mb-4 leading-relaxed text-muted-foreground">${line}</p>`
                      })
                      .join(""),
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}
