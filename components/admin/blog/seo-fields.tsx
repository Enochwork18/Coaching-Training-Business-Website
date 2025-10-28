"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SeoFields({
  metaTitle,
  onMetaTitleChange,
  metaDescription,
  onMetaDescriptionChange,
  metaKeywords,
  onMetaKeywordsChange,
}: {
  metaTitle: string
  onMetaTitleChange: (v: string) => void
  metaDescription: string
  onMetaDescriptionChange: (v: string) => void
  metaKeywords: string[]
  onMetaKeywordsChange: (v: string[]) => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta title</Label>
        <Input id="metaTitle" value={metaTitle} onChange={(e) => onMetaTitleChange(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta description</Label>
        <Textarea id="metaDescription" value={metaDescription} onChange={(e) => onMetaDescriptionChange(e.target.value)} rows={3} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="metaKeywords">Meta keywords (comma-separated)</Label>
        <Input
          id="metaKeywords"
          value={metaKeywords.join(", ")}
          onChange={(e) => onMetaKeywordsChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )}
        />
      </div>
    </div>
  )
}