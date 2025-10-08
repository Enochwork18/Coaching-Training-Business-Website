# Ìbáṣepọ̀ Connected Hearts - Frontend

> **Complete Next.js 14 frontend with mock data, ready for backend integration**

## ✅ Project Status: COMPLETE

A fully functional, production-ready frontend for a faith-based coaching and counseling platform. Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎯 What's Built

### ✨ All 11 Public Pages
1. **Homepage** - Hero, services preview, about, testimonials, blog, newsletter, CTA
2. **About** - Elizabeth Omolara's story, credentials, mission, values
3. **Services** - Filterable grid, search, all 6 service offerings
4. **Service Detail** - Rich content, pricing, booking CTA, FAQs, related testimonials
5. **Blog** - Category filters, search, pagination, article grid
6. **Blog Post** - Rich content, author bio, related posts, sharing
7. **Booking** - Service selection, Calendly placeholder, payment buttons (Paystack/Flutterwave)
8. **Testimonials** - Filterable by service/rating, masonry grid, statistics
9. **Gallery** - Category filters, masonry grid with beautiful images
10. **Contact** - Form validation, Google Map (14 Brunswick Street, Stretford), WhatsApp link
11. **Legal** - Privacy Policy & Terms pages with clean formatting

### 🛡️ Complete Admin Panel
- **Login Page** - localStorage-based auth for demo (ready for JWT)
- **Dashboard** - Stats cards, activity feed, quick actions
- **Services Management** - Create, edit, delete services with rich text editor
- **Blog Management** - Full CRUD, TipTap editor, scheduling, tags
- **Testimonials** - Approve/reject, edit, delete
- **Gallery** - Upload interface, grid view, edit/delete
- **Bookings Management** - Calendar and list views, status updates
- **Subscribers** - List, export CSV, manage subscriptions
- **Settings** - Profile management, integrations display

### 🎨 Design System
- **Colors**: Soft green (#A8D5BA), light blue (#CFEAFB), teal (#2A7F7F)
- **Typography**: Montserrat (headings) + Lato (body)
- **Components**: 40+ shadcn/ui components
- **Responsive**: Mobile, tablet, desktop breakpoints
- **Animations**: Framer Motion throughout

### 🔌 Backend Integration Ready
- **Mock Data**: Comprehensive mock data in `/lib/mockData/`
- **API Client**: Centralized in `/lib/api/client.ts` with TODO comments
- **TypeScript**: All interfaces defined in `/lib/api/types.ts`
- **Documentation**: Complete API spec in `/docs/API_ENDPOINTS.md`

## 📁 Project Structure

```
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Homepage
│   ├── about/page.tsx            # About page
│   ├── services/                 # Services pages
│   ├── blog/                     # Blog pages
│   ├── booking/page.tsx          # Booking page
│   ├── testimonials/page.tsx     # Testimonials page
│   ├── gallery/page.tsx          # Gallery page
│   ├── contact/page.tsx          # Contact page
│   ├── privacy/page.tsx          # Privacy Policy
│   ├── terms/page.tsx            # Terms & Conditions
│   └── admin/                    # Admin panel
│       ├── login/page.tsx        # Admin login
│       ├── dashboard/page.tsx    # Dashboard
│       ├── services/page.tsx     # Services management
│       ├── blog/page.tsx         # Blog management
│       ├── testimonials/page.tsx # Testimonials management
│       ├── gallery/page.tsx      # Gallery management
│       ├── bookings/page.tsx     # Bookings management
│       └── newsletter/page.tsx   # Subscribers management
├── components/
│   ├── Header.tsx                # Site header
│   ├── Footer.tsx                # Site footer
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── api/
│   │   ├── client.ts             # API client functions (mock → real)
│   │   └── types.ts              # TypeScript interfaces
│   ├── mockData/
│   │   └── index.ts              # All mock data
│   └── utils.ts                  # Utility functions
├── docs/
│   ├── API_ENDPOINTS.md          # Complete API specification
│   └── BACKEND_INTEGRATION.md    # Integration guide
├── .env.local                    # Environment variables
├── .env.example                  # Environment template
├── tailwind.config.ts            # Tailwind configuration
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 🔑 Key Features

### Mock Data Integration
- All pages use mock data from `/lib/mockData/index.ts`
- Simulated API delays for realistic UX
- Easy to replace with real API calls

### Search & Filtering
- **Services**: Search by keyword, filter by category
- **Blog**: Search posts, filter by category (Relationships, Parenting, Faith, etc.)
- **Testimonials**: Filter by service and rating
- **Gallery**: Filter by category (Events, Workshops, etc.)

### Forms with Validation
- React Hook Form + Zod validation
- **Booking Form**: Client info, service selection, notes
- **Contact Form**: Name, email, phone, subject, message
- **Newsletter Form**: Email subscription
- All forms show success/error messages

### Admin Features
- **Authentication**: localStorage-based (ready for JWT)
- **CRUD Operations**: Full create, read, update, delete for all content
- **Rich Text Editors**: For blog posts and service descriptions
- **Image Upload UI**: Placeholder for Cloudinary integration
- **Export Functions**: CSV export for bookings and subscribers

### Payment Integration Placeholders
- **Paystack**: Public key configuration ready
- **Flutterwave**: Public key configuration ready
- **Payment Buttons**: Console.log on click (ready for real integration)

### Third-Party Integrations
- **Calendly**: Iframe embed placeholder
- **Google Maps**: Real iframe showing location
- **WhatsApp**: Click-to-chat link (+447958709238)
- **Mailchimp**: API structure ready for subscriber sync

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_xxxxx
NEXT_PUBLIC_BUSINESS_EMAIL=info@ibasepo.org.uk
NEXT_PUBLIC_BUSINESS_PHONE=+447958709238
NEXT_PUBLIC_BUSINESS_ADDRESS=14 Brunswick Street, Stretford, M32 8NJ
```

## 🔌 Backend Integration

### Step 1: Set API URL
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Step 2: Replace Mock Functions
In `/lib/api/client.ts`, uncomment the API calls:

```typescript
// Before (Mock)
export async function getServices() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`).then(r => r.json())
  return mockServices.filter(s => s.published);
}

// After (Real)
export async function getServices() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  return response.json();
}
```

### Step 3: Implement Authentication
Replace localStorage with httpOnly cookies:

```typescript
export async function adminLogin(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  return response.json();
}
```

See `/docs/BACKEND_INTEGRATION.md` for complete guide.

## 📚 Documentation

- **API Endpoints**: `/docs/API_ENDPOINTS.md` - Complete API specification with all endpoints, request/response formats
- **Backend Integration**: `/docs/BACKEND_INTEGRATION.md` - Step-by-step integration guide
- **TypeScript Types**: `/lib/api/types.ts` - All data model interfaces

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Dependencies

### Core
- `next` - Next.js framework
- `react` - React library
- `typescript` - TypeScript

### UI
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `lucide-react` - Icon library
- `framer-motion` - Animation library

### Forms
- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation resolvers

### Utilities
- `clsx` - Conditional classnames
- `tailwind-merge` - Merge Tailwind classes

## 🎨 Design Tokens

```typescript
// Primary Colors
primary: '#A8D5BA'      // Soft green
secondary: '#CFEAFB'    // Light blue
teal: '#2A7F7F'         // Teal accent

// Typography
font-montserrat: Montserrat (headings)
font-lato: Lato (body text)

// Spacing
8px grid system
```

## 📱 Responsive Breakpoints

```typescript
sm: '640px'   // Mobile
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
```

## ✅ Quality Checklist

- [x] All 11 public pages fully functional
- [x] Complete admin panel with all CRUD operations
- [x] Responsive design (mobile, tablet, desktop)
- [x] Form validation with error handling
- [x] Search and filtering functionality
- [x] Mock data integration ready for backend
- [x] TypeScript interfaces for all models
- [x] API client with clear TODO comments
- [x] Comprehensive documentation
- [x] Production build tested and working
- [x] Environment variables configured
- [x] Integration placeholders (Calendly, Paystack, etc.)

## 🚦 Next Steps (Backend Team)

1. **Set up Node.js + Express + Prisma + NeonDB**
2. **Implement all API endpoints** (see `/docs/API_ENDPOINTS.md`)
3. **Configure authentication** with JWT and httpOnly cookies
4. **Integrate payment gateways** (Paystack/Flutterwave webhooks)
5. **Set up Cloudinary** for image uploads
6. **Configure email** (Nodemailer/Resend) for notifications
7. **Update frontend** `.env.local` with backend API URL
8. **Replace mock functions** in `/lib/api/client.ts`
9. **Test integration** end-to-end
10. **Deploy both** frontend (Vercel) and backend (Railway/Render)

## 📞 Contact Information

**Business Details:**
- Address: 14 Brunswick Street, Stretford, Manchester, M32 8NJ
- Phone: +44 7958 709238
- Email: info@ibasepo.org.uk
- WhatsApp: +44 7958 709238

## 📄 License

Private project for Ìbáṣepọ̀ Connected Hearts

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

**Status**: ✅ Frontend Complete - Ready for Backend Integration
