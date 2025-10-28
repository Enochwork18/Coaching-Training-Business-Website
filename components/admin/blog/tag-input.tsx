"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("")

  const add = () => {
    const t = draft.trim()
    if (!t) return
    if (!value.includes(t)) onChange([...value, t])
    setDraft("")
  }

  const remove = (t: string) => onChange(value.filter((x) => x !== t))

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a tag and press Enter" onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            add()
          }
        }} />
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => remove(t)}>
            {t} ×
          </Badge>
        ))}
      </div>
    </div>
  )
}