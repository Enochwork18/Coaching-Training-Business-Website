"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"

export function ImageUploader({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-2">
      {value && (
        <img src={value} alt="Featured" className="w-full h-40 object-cover rounded-md border" />
      )}
      <div className="flex items-center gap-2">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const url = URL.createObjectURL(file)
          onChange(url)
        }} />
        <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>Upload Image</Button>
        {value && (
          <Button type="button" variant="ghost" onClick={() => onChange("")}>Remove</Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Upload handling is mocked. Replace with real upload and store URL in backend.</p>
    </div>
  )
}