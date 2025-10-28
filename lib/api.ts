/**
 * MOCKED API SERVICE LAYER
 * 
 * This file contains all API calls for the frontend.
 * All functions return mocked responses using Promises.
 * 
 * TO INTEGRATE WITH BACKEND:
 * 1. Replace mock implementations with actual fetch() calls
 * 2. Update endpoint URLs to match your backend API
 * 3. Add proper error handling and authentication headers
 * 4. Remove mock data and delays
 */

// Mock delay to simulate network requests
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

// ============================================================================
// AUTH API
// ============================================================================

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData extends LoginCredentials {
  name: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
  }
}

/**
 * TODO: POST /api/auth/login
 * Send credentials, receive JWT token
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  await mockDelay()
  
  // Mock authentication
  if (credentials.email && credentials.password) {
    return {
      success: true,
      message: 'Login successful',
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        role: 'user'
      }
    }
  }
  
  return {
    success: false,
    message: 'Invalid credentials'
  }
}

/**
 * TODO: POST /api/auth/admin/login
 */
export async function loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
  await mockDelay()
  
  if (credentials.email === 'admin@ibasepo.org.uk' && credentials.password) {
    return {
      success: true,
      message: 'Admin login successful',
      token: 'mock-admin-jwt-token-' + Date.now(),
      user: {
        id: 'admin-1',
        name: 'Admin User',
        email: credentials.email,
        role: 'admin'
      }
    }
  }
  
  return {
    success: false,
    message: 'Invalid admin credentials'
  }
}

/**
 * TODO: POST /api/auth/signup
 */
export async function signupUser(data: SignupData): Promise<AuthResponse> {
  await mockDelay()
  
  return {
    success: true,
    message: 'Account created successfully',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: 'user'
    }
  }
}

/**
 * TODO: POST /api/auth/forgot-password
 */
export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  await mockDelay()
  return {
    success: true,
    message: 'Password reset link sent to your email'
  }
}

// ============================================================================
// BOOKINGS API
// ============================================================================

export interface BookingData {
  serviceId: string
  serviceName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  preferredDate: string
  preferredTime: string
  notes?: string
  agreedToTerms: boolean
}

export interface PaymentSession {
  sessionId: string
  paymentUrl: string
  bookingId: string
}

/**
 * TODO: POST /api/bookings/create
 */
export async function createBooking(data: BookingData): Promise<{ success: boolean; bookingId: string; message: string }> {
  await mockDelay()
  
  const bookingId = 'BK-' + Date.now()
  
  return {
    success: true,
    bookingId,
    message: 'Booking created successfully'
  }
}

/**
 * TODO: POST /api/payments/create-session
 * Create payment session with Paystack or Flutterwave
 */
export async function createPaymentSession(bookingId: string, amount: number, provider: 'paystack' | 'flutterwave'): Promise<PaymentSession> {
  await mockDelay(800)
  
  return {
    sessionId: 'PAY-' + Date.now(),
    paymentUrl: `https://mock-payment-${provider}.com/pay/${bookingId}`,
    bookingId
  }
}

/**
 * TODO: GET /api/bookings
 * Admin only - fetch all bookings
 */
export async function fetchAllBookings(): Promise<any[]> {
  await mockDelay()
  
  return [
    {
      id: 'BK-001',
      serviceName: 'Marriage Counseling',
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah@example.com',
      clientPhone: '+447123456789',
      preferredDate: '2025-11-05',
      preferredTime: '14:00',
      status: 'confirmed',
      createdAt: '2025-10-20T10:30:00Z'
    },
    {
      id: 'BK-002',
      serviceName: 'Parenting Coaching',
      clientName: 'Michael Chen',
      clientEmail: 'michael@example.com',
      clientPhone: '+447987654321',
      preferredDate: '2025-11-08',
      preferredTime: '10:00',
      status: 'pending',
      createdAt: '2025-10-22T15:45:00Z'
    }
  ]
}

// ============================================================================
// TESTIMONIALS API
// ============================================================================

export interface TestimonialSubmission {
  clientName: string
  clientEmail: string
  serviceName: string
  rating: number
  testimonialText: string
  photoFile?: File
  isAnonymous: boolean
}

/**
 * TODO: POST /api/testimonials/submit
 */
export async function submitTestimonial(data: TestimonialSubmission): Promise<{ success: boolean; message: string }> {
  await mockDelay()
  
  return {
    success: true,
    message: 'Thank you! Your testimonial has been submitted and is pending approval.'
  }
}

/**
 * TODO: GET /api/testimonials
 */
export async function fetchTestimonials(status: 'approved' | 'pending' | 'all' = 'approved'): Promise<any[]> {
  await mockDelay()
  
  const mockTestimonials = [
    {
      id: '1',
      clientName: 'Sarah M.',
      serviceName: 'Marriage Counseling',
      rating: 5,
      testimonialText: 'Elizabeth helped us find our way back to each other...',
      status: 'approved',
      createdAt: '2025-09-15'
    },
    {
      id: '2',
      clientName: 'Anonymous',
      serviceName: 'Parenting Coaching',
      rating: 5,
      testimonialText: 'As a single parent struggling with my teenage daughter...',
      status: 'approved',
      createdAt: '2025-09-20'
    }
  ]
  
  return mockTestimonials
}

/**
 * TODO: PATCH /api/testimonials/:id/approve
 */
export async function approveTestimonial(id: string): Promise<{ success: boolean }> {
  await mockDelay()
  return { success: true }
}

/**
 * TODO: DELETE /api/testimonials/:id
 */
export async function deleteTestimonial(id: string): Promise<{ success: boolean }> {
  await mockDelay()
  return { success: true }
}

// ============================================================================
// NEWSLETTER API
// ============================================================================

/**
 * TODO: POST /api/newsletter/subscribe
 * Should also sync with Mailchimp if MAILCHIMP_API_KEY is set
 */
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  await mockDelay()
  
  return {
    success: true,
    message: 'Successfully subscribed to newsletter!'
  }
}

/**
 * TODO: GET /api/newsletter/subscribers
 * Admin only
 */
export async function fetchSubscribers(): Promise<any[]> {
  await mockDelay()
  
  return [
    { id: '1', email: 'sarah@example.com', subscribedAt: '2025-09-01', status: 'active' },
    { id: '2', email: 'john@example.com', subscribedAt: '2025-09-15', status: 'active' },
    { id: '3', email: 'lisa@example.com', subscribedAt: '2025-10-01', status: 'active' }
  ]
}

// ============================================================================
// CONTACT API
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

/**
 * TODO: POST /api/contact/submit
 * Should send email to BUSINESS_EMAIL
 */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  await mockDelay()
  
  return {
    success: true,
    message: 'Thank you! Your message has been sent. We\'ll get back to you soon.'
  }
}

// ============================================================================
// ADMIN - USERS API
// ============================================================================

/**
 * TODO: GET /api/admin/users
 */
export async function fetchUsers(): Promise<any[]> {
  await mockDelay()
  
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'user',
      status: 'active',
      joinedAt: '2025-08-15'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'user',
      status: 'active',
      joinedAt: '2025-09-01'
    }
  ]
}

/**
 * TODO: PATCH /api/admin/users/:id/status
 */
export async function updateUserStatus(userId: string, status: 'active' | 'inactive'): Promise<{ success: boolean }> {
  await mockDelay()
  return { success: true }
}

// ============================================================================
// ADMIN - BLOG/SERVICES MANAGEMENT
// ============================================================================

/**
 * TODO: POST /api/admin/blog/create
 * TODO: PATCH /api/admin/blog/:id
 * TODO: DELETE /api/admin/blog/:id
 * TODO: POST /api/admin/services/create
 * TODO: PATCH /api/admin/services/:id
 * TODO: DELETE /api/admin/services/:id
 */

export async function createBlogPost(data: any): Promise<{ success: boolean; id: string }> {
  await mockDelay()
  return { success: true, id: 'blog-' + Date.now() }
}

export async function updateBlogPost(id: string, data: any): Promise<{ success: boolean }> {
  await mockDelay()
  return { success: true }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean }> {
  await mockDelay()
  return { success: true }
}
