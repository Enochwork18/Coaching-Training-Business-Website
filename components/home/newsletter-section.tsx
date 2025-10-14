import { NewsletterForm } from "@/components/newsletter-form"

export function NewsletterSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-balance mb-4">Stay Connected</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Subscribe to our newsletter for insights, tips, and updates on personal growth, relationships, and
            organizational development.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
