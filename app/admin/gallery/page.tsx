import { GalleryGrid as AdminGalleryGrid } from "@/components/admin/gallery/gallery-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Gallery</h1>
          <p className="text-muted-foreground">Manage your gallery images and media.</p>
        </div>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <Plus className="mr-2 h-4 w-4" />
            Upload Image
          </Link>
        </Button>
      </div>

      <AdminGalleryGrid />
    </div>
  )
}
