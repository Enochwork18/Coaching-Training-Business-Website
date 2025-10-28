"use client"

import React from "react"

type Json = Record<string, any>

interface StructuredDataProps {
  data: Json | Json[]
}

export function StructuredData({ data }: StructuredDataProps) {
  const json = Array.isArray(data) ? data : [data]

  // Safely serialize JSON to prevent XSS by escaping characters that can break out of the script tag
  const safeSerialize = (obj: Json) =>
    JSON.stringify(obj)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")

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

// Helpers to build common schemas
export const schemas = {
  organization: ({
    name,
    url,
    logo,
    sameAs,
  }: {
    name: string
    url: string
    logo?: string
    sameAs?: string[]
  }) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    sameAs,
  }),
  localBusiness: ({
    name,
    url,
    telephone,
    address,
    image,
  }: {
    name: string
    url: string
    telephone?: string
    image?: string
    address?: {
      streetAddress?: string
      addressLocality?: string
      postalCode?: string
      addressRegion?: string
      addressCountry?: string
    }
  }) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    image,
    telephone,
    address: address && {
      "@type": "PostalAddress",
      ...address,
    },
  }),
  blogPosting: ({
    headline,
    image,
    authorName,
    datePublished,
    dateModified,
    description,
    url,
  }: {
    headline: string
    image?: string
    authorName: string
    datePublished: string
    dateModified?: string
    description?: string
    url: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }),
  service: ({
    name,
    description,
    category,
    url,
  }: {
    name: string
    description?: string
    category?: string
    url: string
  }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: category,
    url,
  }),
}