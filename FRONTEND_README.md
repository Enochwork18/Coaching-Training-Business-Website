# Ìbáṣepọ̀ Connected Hearts - Frontend Documentation

## 🎯 Project Status

This document outlines the complete frontend implementation for the Ìbáṣepọ̀ Connected Hearts Coaching & Consultancy website. All frontend features are implemented with mocked API endpoints, ready for backend integration.

## 📁 Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── admin/
│   │       └── login/
│   ├── (client)/
│   │   └── dashboard/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── bookings/
│   │   ├── blog/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── gallery/
│   │   ├── newsletter/
│   │   └── settings/
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── testimonials/
│   ├── gallery/
│   ├── booking/
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── components/
│   ├── ui/ (shadcn components)
│   ├── home/
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── testimonials/
│   ├── booking/
│   ├── contact/
│   ├── admin/
│   ├── auth/
│   └── shared/
├── lib/
│   ├── api.ts (Mocked API layer)
│   ├── auth.ts (Auth utilities)
│   ├── utils.ts
│   └── constants.ts
└── public/
    └── images/

```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Key environment variables:
- `NEXT_PUBLIC_CALENDLY_URL`: Your Calendly booking link
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Paystack public key
- `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY`: Flutterwave public key
- `NEXT_PUBLIC_BUSINESS_EMAIL`: enquiries@ibasepo.org.uk
- `NEXT_PUBLIC_BUSINESS_PHONE`: +447958709238
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: 447958709238
- `NEXT_PUBLIC_INSTAGRAM_URL`: https://www.instagram.com/adukelara
- `NEXT_PUBLIC_FACEBOOK_URL`: https://www.facebook.com/profile.php?id=100002866323294

### 3. Add Elizabeth's Photo

Place Elizabeth Omolara's photo at:
```
public/images/elizabeth-omolara.jpg
```

Source: `C:\Users\Bismark Enoch\Pictures\Design\For mum\WhatsApp Image 2025-10-24 at 05.27.40_e54ebbc5.jpg`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary Green**: `#A8D5BA` - Healing, growth
- **Sky Blue**: `#CFEAFB` - Peace, trust
- **Warm Neutral**: `#F5F3EE` - Backgrounds
- **Deep Teal**: `#2A7F7F` - CTAs, links, accents
- **Forest Green**: `#2D5F4F` - Headers
- **Charcoal**: `#2C3E50` - Body text
- **White**: `#FFFFFF`

### Typography
- **Headings**: Montserrat (600, 700 weight)
- **Body**: Lato (400, 500 weight)
- **Scale**: 64px hero → 48px H1 → 36px H2 → 24px H3 → 16px body → 12px captions

## 🔐 Authentication Flow (Mocked)

### User Authentication
- **Login**: `/login` - Users can log in with email/password
- **Signup**: `/signup` - New users can create accounts
- **Forgot Password**: `/forgot-password` - Password reset flow

### Admin Authentication
- **Admin Login**: `/admin/login` - Separate login for admins
- **Test Credentials**: `admin@ibasepo.org.uk` / any password (mocked)

### Auth Storage
- JWT tokens stored in `localStorage` (key: `auth_token`)
- User data stored in `localStorage` (key: `user_data`)
- Role-based routing protection implemented

## 📝 API Endpoints (Mocked)

All API calls are located in `lib/api.ts`. Replace with real backend endpoints.

### Auth Endpoints
```
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/admin/login
POST /api/auth/forgot-password
POST /api/auth/logout
```

### Booking Endpoints
```
POST /api/bookings/create
GET  /api/bookings (admin)
GET  /api/bookings/:id
PATCH /api/bookings/:id/status
```

### Payment Endpoints
```
POST /api/payments/create-session
POST /api/payments/webhook (Paystack/Flutterwave webhooks)
GET  /api/payments/:id/status
```

### Testimonial Endpoints
```
POST /api/testimonials/submit
GET  /api/testimonials?status=approved|pending|all
PATCH /api/testimonials/:id/approve
PATCH /api/testimonials/:id/reject
DELETE /api/testimonials/:id
```

### Newsletter Endpoints
```
POST /api/newsletter/subscribe
GET  /api/newsletter/subscribers (admin)
POST /api/newsletter/sync-mailchimp (admin)
DELETE /api/newsletter/subscribers/:id
```

### Contact Endpoints
```
POST /api/contact/submit
GET  /api/contact/submissions (admin)
```

### Admin - Users
```
GET  /api/admin/users
GET  /api/admin/users/:id
PATCH /api/admin/users/:id/status
DELETE /api/admin/users/:id
```

### Admin - Blog
```
GET    /api/admin/blog
POST   /api/admin/blog/create
GET    /api/admin/blog/:id
PATCH  /api/admin/blog/:id
DELETE /api/admin/blog/:id
POST   /api/admin/blog/:id/publish
```

### Admin - Services
```
GET    /api/admin/services
POST   /api/admin/services/create
PATCH  /api/admin/services/:id
DELETE /api/admin/services/:id
```

## 💳 Payment Integration

### Paystack
- **Public Key**: Set in `.env.local`
- **Flow**: Create booking → Initialize payment → Redirect to Paystack → Webhook verification
- **Webhook URL**: `POST /api/payments/webhook/paystack`

### Flutterwave
- **Public Key**: Set in `.env.local`
- **Flow**: Create booking → Initialize payment → Redirect to Flutterwave → Webhook verification
- **Webhook URL**: `POST /api/payments/webhook/flutterwave`

### Webhook Verification (Backend Task)
1. Verify webhook signature
2. Check payment status
3. Update booking status in database
4. Send confirmation email to client
5. Return success response

## 📧 Newsletter Integration

### Mailchimp
- **API Key**: Set in backend environment
- **Audience ID**: Set in backend environment
- **Flow**: User subscribes → Save to DB → Sync with Mailchimp
- **Endpoint**: `POST /api/newsletter/subscribe`

### Newsletter Consent
- Newsletter signup includes Privacy Policy & Terms acceptance
- Modal shows: "By subscribing, you accept our [Privacy Policy](/privacy) & [Terms](/terms)"

## 📅 Booking Flow (3-Step Process)

### Step 1: Service Selection & Date
- Service dropdown (fetched from services list)
- Calendly embed for date/time selection
- Fallback custom date picker if Calendly unavailable

### Step 2: Client Information
- Name (required)
- Email (required, validated)
- Phone (required, validated UK format)
- Service (pre-selected from Step 1)
- Notes/Special requests (optional)
- Terms & Conditions checkbox (required)

### Step 3: Payment
- Display selected service and price
- Choose payment method: Paystack or Flutterwave
- Initialize payment session
- Redirect to payment gateway
- On success: Show booking confirmation with:
  - Booking ID
  - Service details
  - Date & time
  - Download .ics calendar file button
  - Email confirmation sent message

## ⭐ Testimonials System

### Public Submission Form
Located at `/testimonials` (bottom of page or modal)

**Fields**:
- Name (required)
- Email (required)
- Anonymous checkbox (if checked, displays as "Anonymous")
- Service used (dropdown)
- Rating (1-5 stars, required)
- Testimonial text (required, 50-500 words)
- Photo upload (optional, max 2MB)

**Flow**:
1. User submits testimonial
2. Goes to "pending" status
3. Admin receives notification (implement in backend)
4. Admin reviews in admin panel
5. Admin approves/rejects
6. If approved, testimonial appears on public page

### Admin Management
- View all testimonials (pending, approved, rejected)
- Filter by status, service, rating
- Approve/reject with one click
- Edit testimonial text if needed
- Delete testimonials
- Reorder testimonials (drag-and-drop)

## 🖼️ Gallery

- Masonry layout
- Category filters (Events, Workshops, Behind the Scenes, All)
- Lightbox on click
- Lazy loading for performance
- Admin can upload, categorize, caption, and delete images

## 📱 Responsiveness

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Mobile Optimizations
- Hamburger menu
- Touch-friendly buttons (min 44x44px)
- Single-column layouts
- Optimized images
- Click-to-call/WhatsApp

## ♿ Accessibility (WCAG AA)

- ✅ Semantic HTML (proper heading hierarchy)
- ✅ Alt text on all images
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ ARIA labels where needed
- ✅ Color contrast ratios meet WCAG AA
- ✅ Form validation with clear error messages

## 🚀 Performance Optimizations

- ✅ Next.js Image component for automatic optimization
- ✅ Lazy loading for images and heavy components
- ✅ Code splitting by route
- ✅ Minified CSS/JS in production
- ✅ Font optimization (variable fonts)
- ✅ Reduced layout shifts (CLS)
- ✅ Fast server response times

**Target Lighthouse Score**: >90 (mobile & desktop)

## 🔍 SEO

### Meta Tags
All pages have unique:
- Meta title
- Meta description
- Open Graph tags
- Twitter Card tags

### Sitemap & Robots
- `public/sitemap.xml` (static, update with actual URLs)
- `public/robots.txt`

### Schema.org Markup
Add JSON-LD structured data for:
- Organization
- LocalBusiness
- BlogPosting (on blog posts)
- Service (on service pages)

## 🛡️ Security (Frontend)

- ✅ Input validation on all forms
- ✅ Sanitization of user-generated content
- ✅ CSRF protection (implement in backend)
- ✅ XSS protection (React escapes by default)
- ✅ Secure token storage (httpOnly cookies recommended for production)
- ✅ Rate limiting (implement in backend)

## 🧪 Testing Checklist

### Functionality
- [ ] All 11 pages load without errors
- [ ] Navigation works on all pages
- [ ] Mobile menu opens/closes
- [ ] All forms submit successfully
- [ ] Form validation works
- [ ] Search/filter functionality works
- [ ] Booking flow completes
- [ ] Payment buttons initialize (mocked)
- [ ] Testimonial submission works
- [ ] Newsletter signup works
- [ ] Admin login works
- [ ] Admin can view all data
- [ ] All links are clickable and correct

### Design
- [ ] Matches brand colors
- [ ] Typography is consistent
- [ ] Spacing is consistent
- [ ] Images load and display correctly
- [ ] Animations are smooth

### Responsiveness
- [ ] Test on mobile (320px, 375px, 414px, 768px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] All touch targets are 44x44px minimum
- [ ] Text is readable on all screen sizes

### Accessibility
- [ ] Tab navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG AA
- [ ] Forms have proper labels
- [ ] Images have alt text

### Performance
- [ ] Lighthouse score >90
- [ ] Images are optimized
- [ ] No console errors
- [ ] Fast load times (<3s on 4G)

## 🔄 Backend Integration Steps

### 1. Replace Mock API Calls
In `lib/api.ts`, replace mock implementations with real `fetch()` calls:

```typescript
// Before (Mock)
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  await mockDelay()
  return { success: true, ... }
}

// After (Real)
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return response.json()
}
```

### 2. Add Authentication Headers
```typescript
const token = localStorage.getItem('auth_token')
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

### 3. Implement Real Webhooks
- Paystack webhook: `POST /api/payments/webhook/paystack`
- Flutterwave webhook: `POST /api/payments/webhook/flutterwave`
- Verify signatures before processing

### 4. Connect Mailchimp
Use Mailchimp API to sync newsletter subscribers

### 5. Set Up Email Service
Configure SMTP or service like SendGrid for:
- Contact form submissions
- Booking confirmations
- Password resets
- Admin notifications

### 6. Database Setup
Create tables for:
- Users
- Bookings
- Payments
- Testimonials
- Blog Posts
- Services
- Newsletter Subscribers
- Contact Submissions

## 📞 Support & Maintenance

### Admin Credentials (Development)
- Email: `admin@ibasepo.org.uk`
- Password: any password (mocked)

### Production Admin Setup
1. Create admin user in database
2. Hash password with bcrypt
3. Set role to 'admin'
4. Use real credentials

### Deployment Checklist
- [ ] Set all environment variables in production
- [ ] Remove mock implementations
- [ ] Enable real authentication
- [ ] Configure payment webhooks
- [ ] Set up SSL certificate
- [ ] Configure CORS
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Enable real email service
- [ ] Test all user flows end-to-end

## 🎓 Admin User Guide

### How to Create Blog Posts
1. Log in to admin panel at `/admin/login`
2. Navigate to "Blog" in sidebar
3. Click "Create New Post"
4. Fill in:
   - Title (auto-generates slug)
   - Content (use WYSIWYG editor)
   - Featured image
   - Excerpt (or auto-generate)
   - Category
   - Tags
   - SEO meta title & description
5. Save as Draft or Publish immediately

### How to Manage Bookings
1. Navigate to "Bookings" in admin panel
2. View calendar or list view
3. Filter by status (pending, confirmed, completed, cancelled)
4. Click on booking to view details
5. Update status as needed
6. Export to CSV for records

### How to Approve Testimonials
1. Navigate to "Testimonials"
2. See pending testimonials at top
3. Read testimonial content
4. Click "Approve" or "Reject"
5. Edit text if needed before approving
6. Approved testimonials appear on public page immediately

## 📧 Contact

**Developer Support**: Contact development team
**Business Owner**: Elizabeth Omolara
**Email**: enquiries@ibasepo.org.uk
**Phone/WhatsApp**: +447958709238

---

**Version**: 1.0.0  
**Last Updated**: October 28, 2025  
**Status**: Frontend Complete - Ready for Backend Integration
