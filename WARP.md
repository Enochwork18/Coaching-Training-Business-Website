# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

- Quickstart
  - Install deps: npm install
  - Dev server: npm run dev (Next.js, port 3000)
  - Build: npm run build
  - Start (prod): npm run start
  - Lint: npm run lint
  - Env: copy .env.example → .env.local and fill public keys/URLs. Do not commit secrets.
  - Tests: no test runner is configured (no test script in package.json).

- Project architecture (high level)
  - Framework: Next.js App Router (next ^15) with TypeScript and Tailwind CSS v4 via postcss plugin.
  - Fonts & metadata: app/layout.tsx loads Lato and Montserrat, defines site-wide metadata, and renders children inside <html>/<body> with globals.css.
  - Routing:
    - Public routes under app/: about, services, blog, booking, contact, gallery, testimonials, privacy, terms, login, signup, forgot-password, dashboard (client).
    - Admin area under app/admin/: dashboard, blog, services, testimonials, bookings, gallery, newsletter, login.
  - UI system:
    - Tailwind CSS v4 (postcss config: @tailwindcss/postcss). Global styles at app/globals.css.
    - shadcn/ui configured via components.json (style: new-york; aliases: ui, components, lib, hooks; CSS variables enabled; baseColor: neutral). Lucide icons.
    - Radix UI primitives via shadcn components in components/ui/ and feature folders (e.g., components/home/*).
  - Libs:
    - lib/api.ts: centralized mocked API layer for auth, bookings, payments (session creation), testimonials, newsletter, contact, admin (users/blog/services). All functions return mocked data with TODOs indicating real endpoints (e.g., /api/auth/login, /api/bookings/create, /api/payments/create-session, etc.).
    - lib/auth.ts: client-side auth utilities (localStorage-based token/user, isAdmin/isAuthenticated, requireAuth/requireAdmin, logout). Intended to be replaced by httpOnly cookies on backend integration.
    - lib/utils.ts: cn() classnames helper (clsx + tailwind-merge).
  - Conventions:
    - Path aliases via tsconfig: "@/*" → project root; shadcn aliases: "components", "ui", "lib", "hooks" per components.json.
    - Home page composition in app/page.tsx stitches header/sections/footer from components/*.

- Tooling and configs
  - package.json scripts: { dev: next dev, build: next build, start: next start, lint: next lint }.
  - next.config.mjs: images.unoptimized = true (static-friendly), and build ignores ESLint/TypeScript errors (eslint.ignoreDuringBuilds, typescript.ignoreBuildErrors).
    - Implication: run npm run lint locally to catch issues; type errors won’t fail builds until you re-enable checks.
  - tsconfig.json: strict mode on; moduleResolution bundler; JSX preserve; paths set for @/*.
  - postcss.config.mjs: uses @tailwindcss/postcss. No separate tailwind.config file (Tailwind v4 defaults).

- Environment and external integration (from .env.example and docs)
  - Public env vars consumed by the frontend (set in .env.local):
    - NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
    - NEXT_PUBLIC_CALENDLY_URL
    - NEXT_PUBLIC_MAILCHIMP_API_KEY, NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID
    - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, NEXT_PUBLIC_BUSINESS_ADDRESS
    - NEXT_PUBLIC_BUSINESS_EMAIL, NEXT_PUBLIC_BUSINESS_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER
    - NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SITE_NAME
  - Backend-only placeholders are present in .env.example for reference (JWT_SECRET, DATABASE_URL, SMTP_*); do not use them on the client.

- Development workflows (what matters for this repo)
  - Running locally: ensure .env.local exists with the required NEXT_PUBLIC_* keys; then npm run dev and open http://localhost:3000.
  - Mocked flows in UI rely on lib/api.ts (no real backend):
    - Auth: login/signup/forgot-password return mock tokens and user data; admin login accepts admin@ibasepo.org.uk with any password.
    - Booking & payments: createBooking + createPaymentSession simulate a 3-step flow; paymentUrl is a mock. Confirmation screens use returned IDs.
    - Testimonials/newsletter/contact: forms call mocked endpoints and display success messages; admin pages use mocked list endpoints.
  - Admin gating: client-side only via lib/auth.ts (requireAdmin). There is no server-side protection.

- Notes/limitations to be aware of
  - No automated tests configured; if you add a test runner, prefer keeping it in scripts as "test" and document single-test invocation.
  - Build ignores type and lint errors by config; prefer fixing issues before shipping or tighten next.config.mjs in CI.
  - images.unoptimized disables Next image optimization; suitable for static hosting but reduces runtime image features.

- Pointers to in-repo docs
  - FRONTEND_README.md: comprehensive feature brief, routes, mocked endpoints, design system, and integration guidance. Treat it as the product spec and integration plan.
  - .env.example: authoritative list of required public env vars for the frontend.
