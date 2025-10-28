"use client"

import React from "react"
import { safeSerialize } from "@/lib/seo/serialize"
export type Json = Record<string, any>

interface StructuredDataProps {
  data: Json | Json[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const json = Array.isArray(data) ? data : [data]

  return (
    <>
      {json.map((item, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // Avoid XSS by serializing safely
          dangerouslySetInnerHTML={{ __html: safeSerialize(item) }}
        />
      ))}
    </>
  )
}

// Re-export schemas for convenience in client code/tests
export { schemas } from "@/lib/seo/schemas"
