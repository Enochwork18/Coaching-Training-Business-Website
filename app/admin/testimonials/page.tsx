import { TestimonialsTable } from "@/components/admin/testimonials/testimonials-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials and reviews.</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <TestimonialsTable />
    </div>
  )
}
