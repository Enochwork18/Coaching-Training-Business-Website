import { render } from '@testing-library/react'
import { StructuredData, schemas } from './structured-data'

describe('StructuredData', () => {
  describe('Blog Posting Schema', () => {
    it('should render with correct blogPosting schema on blog post pages', () => {
      const blogPostingSchema = schemas.blogPosting({
        headline: 'Understanding Relationship Dynamics',
        image: 'https://example.com/blog-image.jpg',
        authorName: 'Elizabeth Thompson',
        datePublished: '2025-01-15T10:00:00Z',
        dateModified: '2025-01-16T12:00:00Z',
        description: 'Learn about the key elements of healthy relationships',
        url: 'https://example.com/blog/understanding-relationship-dynamics',
      })

      const { container } = render(<StructuredData data={blogPostingSchema} />)
      
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
      
      const parsedData = JSON.parse(script?.textContent || '{}')
      expect(parsedData['@context']).toBe('https://schema.org')
      expect(parsedData['@type']).toBe('BlogPosting')
      expect(parsedData.headline).toBe('Understanding Relationship Dynamics')
      expect(parsedData.image).toBe('https://example.com/blog-image.jpg')
      expect(parsedData.author['@type']).toBe('Person')
      expect(parsedData.author.name).toBe('Elizabeth Thompson')
      expect(parsedData.datePublished).toBe('2025-01-15T10:00:00Z')
      expect(parsedData.dateModified).toBe('2025-01-16T12:00:00Z')
      expect(parsedData.description).toBe('Learn about the key elements of healthy relationships')
      expect(parsedData.mainEntityOfPage['@type']).toBe('WebPage')
      expect(parsedData.mainEntityOfPage['@id']).toBe('https://example.com/blog/understanding-relationship-dynamics')
    })

    it('should use datePublished as dateModified when dateModified is not provided', () => {
      const blogPostingSchema = schemas.blogPosting({
        headline: 'Test Post',
        authorName: 'Test Author',
        datePublished: '2025-01-15T10:00:00Z',
        url: 'https://example.com/blog/test',
      })

      const { container } = render(<StructuredData data={blogPostingSchema} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const parsedData = JSON.parse(script?.textContent || '{}')
      
      expect(parsedData.dateModified).toBe('2025-01-15T10:00:00Z')
    })
  })

  describe('Service Schema', () => {
    it('should render with correct service schema on service detail pages', () => {
      const serviceSchema = schemas.service({
        name: 'Marriage Counseling',
        description: 'Professional marriage counseling services to help couples strengthen their relationships',
        category: 'Relationship Coaching',
        url: 'https://example.com/services/marriage-counseling',
      })

      const { container } = render(<StructuredData data={serviceSchema} />)
      
      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()
      
      const parsedData = JSON.parse(script?.textContent || '{}')
      expect(parsedData['@context']).toBe('https://schema.org')
      expect(parsedData['@type']).toBe('Service')
      expect(parsedData.name).toBe('Marriage Counseling')
      expect(parsedData.description).toBe('Professional marriage counseling services to help couples strengthen their relationships')
      expect(parsedData.serviceType).toBe('Relationship Coaching')
      expect(parsedData.url).toBe('https://example.com/services/marriage-counseling')
    })

    it('should render service schema without optional fields', () => {
      const serviceSchema = schemas.service({
        name: 'Basic Service',
        url: 'https://example.com/services/basic',
      })

      const { container } = render(<StructuredData data={serviceSchema} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const parsedData = JSON.parse(script?.textContent || '{}')
      
      expect(parsedData.name).toBe('Basic Service')
      expect(parsedData.url).toBe('https://example.com/services/basic')
      expect(parsedData.description).toBeUndefined()
      expect(parsedData.serviceType).toBeUndefined()
    })
  })

  describe('Multiple Schemas', () => {
    it('should render multiple schema objects when passed as an array', () => {
      const schemas = [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Ìbáṣepọ̀ Connected Hearts',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Ìbáṣepọ̀ Connected Hearts',
        },
      ]

      const { container } = render(<StructuredData data={schemas} />)
      
      const scriptTags = container.querySelectorAll('script[type="application/ld+json"]')
      expect(scriptTags).toHaveLength(2)
      
      const firstSchema = JSON.parse(scriptTags[0]?.textContent || '{}')
      const secondSchema = JSON.parse(scriptTags[1]?.textContent || '{}')
      
      expect(firstSchema['@type']).toBe('Organization')
      expect(secondSchema['@type']).toBe('LocalBusiness')
    })
  })

  describe('XSS Protection', () => {
    it('should safely serialize data to prevent XSS attacks', () => {
      const maliciousData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '<script>alert("XSS")</script>',
        description: 'Normal description',
      }

      const { container } = render(<StructuredData data={maliciousData} />)
      const script = container.querySelector('script[type="application/ld+json"]')
      const content = script?.textContent || ''
      
      // Should be JSON-encoded, not executed as HTML
      expect(content).toContain('\\u003cscript\\u003e')
      expect(content).not.toContain('<script>')
    })
  })
})
