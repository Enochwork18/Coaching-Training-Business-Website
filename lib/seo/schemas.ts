export type Json = Record<string, any>

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
} as const
