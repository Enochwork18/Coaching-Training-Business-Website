# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

That's it! The frontend is fully functional with mock data.

## 🔍 What to Explore

### Public Pages
- **Homepage**: http://localhost:3000
- **Services**: http://localhost:3000/services
- **Blog**: http://localhost:3000/blog
- **Booking**: http://localhost:3000/booking
- **Contact**: http://localhost:3000/contact

### Admin Panel
- **Login**: http://localhost:3000/admin/login
  - Use ANY email and password (mock auth)
  - Example: `elizabeth@ibasepo.org.uk` / `password123`
- **Dashboard**: http://localhost:3000/admin/dashboard
- **Manage Content**: Services, Blog, Testimonials, Gallery, Bookings, Subscribers

## 🎯 Key Features to Test

### Public Features
1. **Browse Services** - Filter by category, search
2. **Read Blog** - Filter by category, read articles
3. **Book Appointment** - Fill form, see Calendly placeholder
4. **Submit Contact Form** - See validation and success message
5. **Subscribe Newsletter** - Enter email, see confirmation

### Admin Features
1. **Login** - Use any credentials (demo mode)
2. **View Dashboard** - See stats and activity
3. **Create Service** - Use rich text editor
4. **Write Blog Post** - Schedule, add tags, upload image
5. **Manage Testimonials** - Approve/reject
6. **View Bookings** - See booking list
7. **Export Subscribers** - Download CSV

## 📝 Mock Data Locations

All mock data is in `/lib/mockData/index.ts`:
- 6 Services
- 3 Blog Posts
- 10 Testimonials
- 12 Gallery Items
- 8 Bookings
- 12 Subscribers

## 🔌 Connect to Real Backend

### Step 1: Update Environment
```env
# .env.local
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

### Step 2: Replace Mock Functions
Edit `/lib/api/client.ts` and uncomment the real API calls:

```typescript
// Replace this:
return mockServices.filter(s => s.published);

// With this:
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
return response.json();
```

### Step 3: Deploy
```bash
# Build
npm run build

# Preview production build
npm run start

# Deploy to Vercel
vercel --prod
```

## 📚 Documentation

- **API Endpoints**: `/docs/API_ENDPOINTS.md`
- **Backend Integration**: `/docs/BACKEND_INTEGRATION.md`
- **Full README**: `/PROJECT_README.md`

## 🛠️ Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

## ✅ Everything Works!

- ✅ All pages load correctly
- ✅ Forms validate and submit
- ✅ Search and filtering work
- ✅ Admin panel fully functional
- ✅ Responsive on all devices
- ✅ Mock data displays correctly
- ✅ Build succeeds with no errors

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  teal: '#YOUR_COLOR',
}
```

### Add Mock Data
Edit `/lib/mockData/index.ts`:
```typescript
export const mockServices = [
  { /* your service */ }
];
```

### Modify API Calls
Edit `/lib/api/client.ts`:
```typescript
export async function yourFunction() {
  // Your custom logic
}
```

## 🆘 Need Help?

1. Check `/docs/BACKEND_INTEGRATION.md` for integration guide
2. Review `/docs/API_ENDPOINTS.md` for API specification
3. See `/lib/api/types.ts` for TypeScript interfaces
4. Look at existing components for examples

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Environment Variables (Vercel Dashboard)
```env
NEXT_PUBLIC_API_URL=https://api.ibasepo.org.uk/api
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxx
```

## ✨ You're All Set!

The frontend is complete and ready. Now you can:
1. **Use as-is** for demos with mock data
2. **Connect backend** when ready
3. **Customize** styling and content
4. **Deploy** to production

**Happy coding!** 🎉
