# API Integration Points

This file documents all the API endpoints that need to be implemented on the backend.

## Authentication
All admin endpoints require authentication. Implement JWT or session-based auth.

## Public Endpoints

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
  - Body: `{ email: string }`
  - Response: `{ success: boolean, message: string }`

### Contact
- `POST /api/contact` - Submit contact form
  - Body: `{ name: string, email: string, phone?: string, subject: string, message: string }`
  - Response: `{ success: boolean, message: string }`

### Services
- `GET /api/services` - Get all services
  - Response: `Service[]`
- `GET /api/services/:slug` - Get service by slug
  - Response: `Service`

### Blog
- `GET /api/blog/posts` - Get all blog posts
  - Query: `?page=1&limit=10&category=string&search=string`
  - Response: `{ posts: BlogPost[], total: number, page: number }`
- `GET /api/blog/posts/:slug` - Get blog post by slug
  - Response: `BlogPost`
- `GET /api/blog/posts/related` - Get related posts
  - Query: `?postId=string&category=string&limit=3`
  - Response: `BlogPost[]`
- `GET /api/blog/categories` - Get all categories
  - Response: `{ name: string, count: number }[]`

### Testimonials
- `GET /api/testimonials` - Get all testimonials
  - Query: `?category=string&featured=boolean`
  - Response: `Testimonial[]`

### Gallery
- `GET /api/gallery` - Get all gallery items
  - Query: `?category=string`
  - Response: `GalleryItem[]`

## Admin Endpoints

### Dashboard
- `GET /api/admin/stats` - Get dashboard statistics
  - Response: `{ services: number, blogPosts: number, testimonials: number, bookings: number }`
- `GET /api/admin/activity` - Get recent activity
  - Response: `Activity[]`

### Services Management
- `GET /api/admin/services` - Get all services (admin view)
  - Response: `Service[]`
- `POST /api/admin/services` - Create new service
  - Body: `Service`
  - Response: `{ success: boolean, service: Service }`
- `PUT /api/admin/services/:id` - Update service
  - Body: `Partial<Service>`
  - Response: `{ success: boolean, service: Service }`
- `DELETE /api/admin/services/:id` - Delete service
  - Response: `{ success: boolean }`

### Blog Management
- `GET /api/admin/blog/posts` - Get all blog posts (admin view)
  - Response: `BlogPost[]`
- `POST /api/admin/blog/posts` - Create new blog post
  - Body: `BlogPost`
  - Response: `{ success: boolean, post: BlogPost }`
- `PUT /api/admin/blog/posts/:id` - Update blog post
  - Body: `Partial<BlogPost>`
  - Response: `{ success: boolean, post: BlogPost }`
- `DELETE /api/admin/blog/posts/:id` - Delete blog post
  - Response: `{ success: boolean }`

### Testimonials Management
- `GET /api/admin/testimonials` - Get all testimonials (admin view)
  - Response: `Testimonial[]`
- `POST /api/admin/testimonials` - Create new testimonial
  - Body: `Testimonial`
  - Response: `{ success: boolean, testimonial: Testimonial }`
- `PUT /api/admin/testimonials/:id` - Update testimonial
  - Body: `Partial<Testimonial>`
  - Response: `{ success: boolean, testimonial: Testimonial }`
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
  - Response: `{ success: boolean }`

### Gallery Management
- `GET /api/admin/gallery` - Get all gallery items (admin view)
  - Response: `GalleryItem[]`
- `POST /api/admin/gallery` - Upload new gallery item
  - Body: `FormData` with image file
  - Response: `{ success: boolean, item: GalleryItem }`
- `PUT /api/admin/gallery/:id` - Update gallery item
  - Body: `Partial<GalleryItem>`
  - Response: `{ success: boolean, item: GalleryItem }`
- `DELETE /api/admin/gallery/:id` - Delete gallery item
  - Response: `{ success: boolean }`

### Bookings Management
- `GET /api/admin/bookings` - Get all bookings
  - Response: `Booking[]`
- `PATCH /api/admin/bookings/:id` - Update booking status
  - Body: `{ status: 'pending' | 'confirmed' | 'cancelled' }`
  - Response: `{ success: boolean, booking: Booking }`

### Newsletter Management
- `GET /api/admin/newsletter/stats` - Get newsletter statistics
  - Response: `{ total: number, active: number, growth: string }`
- `GET /api/admin/newsletter/subscribers` - Get all subscribers
  - Query: `?search=string&page=number&limit=number`
  - Response: `{ subscribers: NewsletterSubscriber[], total: number }`
- `DELETE /api/admin/newsletter/subscribers/:id` - Delete subscriber
  - Response: `{ success: boolean }`

## Database Schema

Refer to `/lib/types.ts` for TypeScript interfaces that match the expected database schema.

## Error Handling

All endpoints should return consistent error responses:
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
\`\`\`

## Rate Limiting

Implement rate limiting on public endpoints:
- Newsletter: 5 requests per hour per IP
- Contact: 10 requests per hour per IP
- Other public endpoints: 100 requests per hour per IP
