"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function GalleryGrid() {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  // API Integration Point: GET /api/admin/gallery
  // Expected response: GalleryItem[]
  const items = [
    {
      id: "1",
      title: "Individual Coaching Session",
      category: "Coaching Sessions",
      image: "/individual-coaching-session--professional-setting.jpg",
    },
    {
      id: "2",
      title: "Corporate Workshop",
      category: "Workshops",
      image: "/team-learning-workshop.jpg",
    },
  ]

  const handleDelete = async (id: string) => {
    // API Integration Point: DELETE /api/admin/gallery/:id
    console.log("Delete gallery item:", id)
    setDeleteId(null)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="aspect-square relative">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
              <Badge variant="outline">{item.category}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the gallery item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
