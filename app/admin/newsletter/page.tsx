import { NewsletterTable } from "@/components/admin/newsletter/newsletter-table"
import { NewsletterStats } from "@/components/admin/newsletter/newsletter-stats"

export default function AdminNewsletterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Newsletter Subscribers</h1>
        <p className="text-muted-foreground">Manage your newsletter subscribers and campaigns.</p>
      </div>

      <NewsletterStats />
      <NewsletterTable />
    </div>
  )
}
