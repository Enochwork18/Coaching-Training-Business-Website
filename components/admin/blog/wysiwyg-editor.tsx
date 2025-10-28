"use client"

import dynamic from "next/dynamic"
import { Textarea } from "@/components/ui/textarea"
import { useMemo } from "react"

const ReactQuill = dynamic(() => import("react-quill").then((m) => m.default), {
  ssr: false,
  loading: () => null,
}) as any

// Minimal styles note: user must install `react-quill` for full editor
// Fallback to simple textarea if library unavailable
export function WysiwygEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  )

  // If ReactQuill fails to load, show textarea
  if (!ReactQuill) {
    return <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={12} />
  }

  return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />
}