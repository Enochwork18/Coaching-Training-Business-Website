"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [filter, setFilter] = useState("all")

  // API Integration Point: GET /api/gallery
  // Query params: ?category=string
  // Expected response: GalleryItem[]
  const galleryItems = [
    {
      id: "1",
      title: "Individual Coaching Session",
      description: "One-on-one coaching session focused on career development",
      image: "/individual-coaching-session--professional-setting.jpg",
      category: "Coaching Sessions",
    },
    {
      id: "2",
      title: "Corporate Leadership Workshop",
      description: "Team building and leadership development workshop",
      image: "/team-learning-workshop.jpg",
      category: "Workshops",
    },
    {
      id: "3",
      title: "Couples Coaching",
      description: "Relationship coaching session for couples",
      image: "/couple-talking-openly.jpg",
      category: "Coaching Sessions",
    },
    {
      id: "4",
      title: "Group Training Event",
      description: "Interactive group training on communication skills",
      image: "/diverse-group-of-people-in-coaching-session--warm-.jpg",
      category: "Workshops",
    },
    {
      id: "5",
      title: "Executive Coaching",
      description: "Strategic coaching for senior leadership",
      image: "/professional-coach-in-consultation--warm-office-se.jpg",
      category: "Coaching Sessions",
    },
    {
      id: "6",
      title: "Team Building Activity",
      description: "Corporate team building and collaboration exercise",
      image: "/leader-with-team.jpg",
      category: "Events",
    },
    {
      id: "7",
      title: "Mindfulness Workshop",
      description: "Group mindfulness and meditation practice",
      image: "/person-meditating-peacefully.jpg",
      category: "Workshops",
    },
    {
      id: "8",
      title: "Consultation Session",
      description: "Initial consultation and goal setting",
      image: "/coaching-methodology--professional-development-ses.jpg",
      category: "Coaching Sessions",
    },
  ]

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} image{filteredItems.length !== 1 ? "s" : ""}
          </p>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Coaching Sessions">Coaching Sessions</SelectItem>
              <SelectItem value="Workshops">Workshops</SelectItem>
              <SelectItem value="Events">Events</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="mt-3">
                {item.category}
              </Badge>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogTitle className="sr-only">{selectedImage?.title}</DialogTitle>
            <DialogDescription className="sr-only">{selectedImage?.description}</DialogDescription>
            {selectedImage && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 bg-background rounded-full p-2 shadow-lg hover:bg-muted transition-colors z-10"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="font-heading text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">{selectedImage.description}</p>
                  <Badge variant="secondary" className="mt-3">
                    {selectedImage.category}
                  </Badge>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
