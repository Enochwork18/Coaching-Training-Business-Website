"use client"

import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createBlogPost, getBlogPostById, updateBlogPost } from "@/lib/api"
import { WysiwygEditor } from "./wysiwyg-editor"
import { ImageUploader } from "./image-uploader"
import { TagInput } from "./tag-input"
import { SeoFields } from "./seo-fields"

interface BlogEditorProps {
  postId?: string
  onSaved?: (id: string) => void
}

export function BlogEditor({ postId, onSaved }: BlogEditorProps) {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [featuredImage, setFeaturedImage] = useState<string>("")
  const [status, setStatus] = useState<"draft" | "scheduled" | "published">("draft")
  const [scheduleAt, setScheduleAt] = useState<string>("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [metaKeywords, setMetaKeywords] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!postId) return
    ;(async () => {
      const existing = await getBlogPostById(postId)
      if (existing) {
        setTitle(existing.title)
        setSlug(existing.slug)
        setExcerpt(existing.excerpt || "")
        setContent(existing.content || "")
        setCategory(existing.category ? [existing.category] : [])
        setTags(existing.tags || [])
        setFeaturedImage(existing.image || "")
        setStatus(existing.featured ? "published" : "draft")
        setMetaTitle(existing.title)
        setMetaDescription(existing.excerpt)
      }
    })()
  }, [postId])

  // Auto-generate slug and excerpt
  useEffect(() => {
    if (!postId) {
      const s = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
      setSlug(s)
    }
  }, [title, postId])

  useEffect(() => {
    if (!excerpt && content) {
      const plain = content.replace(/<[^>]+>/g, "").slice(0, 150)
      setExcerpt(plain)
    }
  }, [content, excerpt])

  const handleSave = async (publish = false) => {
    setSaving(true)
    try {
      const payload = {
        title,
        slug,
        content,
        excerpt,
        category: category[0] || "Other",
        tags,
        image: featuredImage,
        status: publish ? "published" : status,
        scheduleAt: publish ? undefined : scheduleAt,
        seo: { metaTitle, metaDescription, metaKeywords },
      }
      const res = postId
        ? await updateBlogPost(postId, payload)
        : await createBlogPost(payload)

      if (res?.id && onSaved) onSaved(res.id)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <WysiwygEditor value={content} onChange={setContent} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Featured image</Label>
            <ImageUploader value={featuredImage} onChange={setFeaturedImage} />
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={4} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {[
                "Relationships",
                "Faith",
                "Parenting",
                "Personal Growth",
                "Other",
              ].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={category.includes(c)}
                    onChange={(e) =>
                      setCategory((prev) =>
                        e.target.checked ? Array.from(new Set([...prev, c])) : prev.filter((x) => x !== c)
                      )
                    }
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput value={tags} onChange={setTags} />
          </div>
          <Separator />
          <SeoFields
            metaTitle={metaTitle}
            onMetaTitleChange={setMetaTitle}
            metaDescription={metaDescription}
            onMetaDescriptionChange={setMetaDescription}
            metaKeywords={metaKeywords}
            onMetaKeywordsChange={setMetaKeywords}
          />
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
              Save Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}