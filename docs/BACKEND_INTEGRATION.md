# Backend Integration Guide

This document explains how to connect the frontend to the Node.js + Express + Prisma + NeonDB backend.

## Overview

The frontend is **fully functional with mock data** and ready for backend integration. All API calls are centralized in `/lib/api/client.ts` with clear TODO comments marking where real API calls should replace mock data.

## Current Architecture

```
Frontend (Next.js 14)
├── /lib/api/client.ts        → API client functions (currently mock)
├── /lib/api/types.ts          → TypeScript interfaces
├── /lib/mockData/index.ts     → Mock data for development
└── All components             → Use API client functions
```

## Integration Steps

### 1. Environment Variables

Update `.env.local` with your backend URL:

```env
NEXT_PUBLIC_API_URL=https://api.ibasepo.org.uk/api
```

### 2. Replace Mock API Calls

In `/lib/api/client.ts`, replace each mock function with real API calls.

**Example - Before (Mock):**
```typescript
export async function getServices() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`).then(r => r.json())
  return mockServices.filter(s => s.published);
}
```

**After (Real API):**
```typescript
export async function getServices() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
}
```

### 3. Authentication Flow

The frontend uses localStorage for demo purposes. Replace with httpOnly cookies:

**Current (Mock):**
```typescript
export async function adminLogin(data: { email: string; password: string }) {
  // Mock: stores in localStorage
  localStorage.setItem('adminToken', 'mock-jwt-token');
  localStorage.setItem('adminUser', JSON.stringify(mockAdminUser));
}
```

**Real Implementation:**
```typescript
export async function adminLogin(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Include cookies
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}
```

### 4. Protected Routes Middleware

Create middleware for admin routes:

**File: `middleware.ts`**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // TODO: Verify JWT token with backend
    // const token = request.cookies.get('token');
    // Verify token is valid

    // For now, check localStorage (client-side)
    // In production, verify server-side with API call
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
```

### 5. File Upload Integration

For image uploads (services, blog, gallery):

**Current:** Mock console.log
**Backend Needed:** Cloudinary integration

**Example Implementation:**
```typescript
export async function uploadImage(file: File, folder: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData
  });

  if (!response.ok) throw new Error('Upload failed');

  const data = await response.json();
  return data.url; // Cloudinary URL
}
```

### 6. Payment Integration

**Booking Page** (`app/booking/page.tsx`):

Currently has placeholder buttons that console.log. Replace with:

```typescript
const handlePaystackPayment = async () => {
  // Initialize Paystack payment
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/initialize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: bookingData.clientEmail,
      amount: servicePrice * 100, // in kobo
      serviceId: bookingData.serviceId,
      bookingId: bookingId
    })
  });

  const { authorization_url } = await response.json();
  window.location.href = authorization_url; // Redirect to Paystack
};
```

### 7. Webhook Handlers

Backend must handle payment webhooks:

**Paystack Webhook:**
- Endpoint: `POST /api/webhooks/paystack`
- Verify signature using Paystack secret
- Update booking status in database

**Flutterwave Webhook:**
- Endpoint: `POST /api/webhooks/flutterwave`
- Verify signature
- Update booking status

### 8. Email Notifications

Backend should send emails for:
- **Booking confirmation** (to client and admin)
- **Contact form** submissions
- **Newsletter** welcome email

Use **Nodemailer** or **Resend** for email delivery.

### 9. Calendly Integration

Currently embedded as iframe. Optional backend sync:

**Webhook from Calendly:**
```typescript
// POST /api/webhooks/calendly
// Sync Calendly bookings to your database
```

### 10. Error Handling

Add global error handling:

**File: `lib/api/client.ts`**
```typescript
async function apiRequest(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## Backend API Requirements

See `/docs/API_ENDPOINTS.md` for complete API specification.

### Required Endpoints:

**Public:**
- `GET /api/services` - List services
- `GET /api/services/:slug` - Get service by slug
- `GET /api/blog` - List blog posts
- `GET /api/blog/:slug` - Get blog post
- `GET /api/testimonials` - List testimonials
- `GET /api/gallery` - List gallery items
- `POST /api/bookings` - Create booking
- `POST /api/newsletter` - Subscribe
- `POST /api/contact` - Contact form

**Admin (Protected):**
- `POST /api/admin/login` - Login
- `POST /api/admin/logout` - Logout
- `GET /api/admin/me` - Get current user
- `GET /api/admin/dashboard/stats` - Dashboard stats
- CRUD endpoints for: services, blog, testimonials, gallery, bookings, subscribers

**Webhooks:**
- `POST /api/webhooks/paystack` - Paystack payment webhook
- `POST /api/webhooks/flutterwave` - Flutterwave webhook
- `POST /api/webhooks/calendly` - Calendly webhook (optional)

## Database Schema (Prisma)

```prisma
model Service {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  category    String
  excerpt     String
  description String   @db.Text
  image       String
  duration    String
  price       String
  included    String[]
  faqs        Json
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  category    String
  excerpt     String
  content     String   @db.Text
  image       String
  author      String
  published   Boolean  @default(false)
  featured    Boolean  @default(false)
  tags        String[]
  readTime    Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Testimonial {
  id          String   @id @default(cuid())
  name        String
  isAnonymous Boolean  @default(false)
  service     String?
  serviceId   String?
  rating      Int
  quote       String   @db.Text
  image       String?
  approved    Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model GalleryItem {
  id          String   @id @default(cuid())
  title       String
  description String?
  image       String
  category    String
  published   Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model Booking {
  id            String   @id @default(cuid())
  reference     String   @unique
  clientName    String
  clientEmail   String
  clientPhone   String
  serviceId     String
  serviceName   String
  date          String
  time          String
  notes         String?
  status        String   @default("PENDING")
  paymentStatus String   @default("PENDING")
  paymentAmount String
  createdAt     DateTime @default(now())
}

model Subscriber {
  id           String    @id @default(cuid())
  email        String    @unique
  name         String?
  status       String    @default("ACTIVE")
  subscribedAt DateTime  @default(now())
}

model Admin {
  id       String @id @default(cuid())
  email    String @unique
  password String // Hashed with bcrypt
  name     String
  role     String @default("ADMIN")
}
```

## Testing Integration

### 1. Test Public Endpoints
```bash
curl http://localhost:3001/api/services
curl http://localhost:3001/api/blog
```

### 2. Test Admin Login
```bash
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"elizabeth@ibasepo.org.uk","password":"password123"}' \
  -c cookies.txt
```

### 3. Test Protected Endpoint
```bash
curl http://localhost:3001/api/admin/dashboard/stats \
  -b cookies.txt
```

## Security Checklist

- [ ] All passwords hashed with bcrypt (min 10 rounds)
- [ ] JWT tokens stored in httpOnly cookies
- [ ] CORS configured to only allow your frontend domain
- [ ] Rate limiting on login endpoint (5 attempts per 15 min)
- [ ] Input validation with Zod on all endpoints
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (sanitize user inputs)
- [ ] Webhook signatures verified (Paystack, Flutterwave)
- [ ] File upload validation (type, size, malware scan)
- [ ] HTTPS enforced in production

## Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway/Render/Heroku)
```bash
# Set environment variables
DATABASE_URL=your_neon_db_url
JWT_SECRET=your_secret_key
PAYSTACK_SECRET=sk_live_xxx
# etc.

# Deploy
git push heroku main
```

## Support

For questions about the frontend setup, refer to:
- `/docs/API_ENDPOINTS.md` - Complete API specification
- `/lib/api/types.ts` - TypeScript interfaces
- `/lib/api/client.ts` - API client implementation

All mock data and TODO comments clearly mark integration points.
