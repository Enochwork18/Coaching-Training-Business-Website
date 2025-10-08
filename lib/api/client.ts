// API Client - TODO: Replace mock data with real API calls
import { mockServices, mockBlogPosts, mockTestimonials, mockGalleryItems, mockBookings, mockSubscribers, mockAdminUser, mockDashboardStats, mockActivityLogs } from '../mockData';
import { ApiResponse } from './types';

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// PUBLIC API
export async function getServices() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`).then(r => r.json())
  return mockServices.filter(s => s.published);
}

export async function getServiceBySlug(slug: string) {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${slug}`).then(r => r.json())
  return mockServices.find(s => s.slug === slug && s.published) || null;
}

export async function getBlogPosts() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`).then(r => r.json())
  return mockBlogPosts.filter(p => p.published);
}

export async function getBlogPostBySlug(slug: string) {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`).then(r => r.json())
  return mockBlogPosts.find(p => p.slug === slug && p.published) || null;
}

export async function getTestimonials() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`).then(r => r.json())
  return mockTestimonials.filter(t => t.approved);
}

export async function getGalleryItems() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`).then(r => r.json())
  return mockGalleryItems.filter(g => g.published);
}

export async function submitBooking(data: any): Promise<ApiResponse<any>> {
  await delay(1000);
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, { method: 'POST', body: JSON.stringify(data) }).then(r => r.json())
  console.log('Booking submitted (mock):', data);
  return { success: true, message: 'Booking created successfully', data: { bookingId: 'IBS-2024-999', paymentUrl: '#' } };
}

export async function submitNewsletter(data: any): Promise<ApiResponse<void>> {
  await delay(1000);
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, { method: 'POST', body: JSON.stringify(data) }).then(r => r.json())
  console.log('Newsletter subscription (mock):', data);
  return { success: true, message: 'Successfully subscribed!' };
}

export async function submitContactForm(data: any): Promise<ApiResponse<void>> {
  await delay(1000);
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, { method: 'POST', body: JSON.stringify(data) }).then(r => r.json())
  console.log('Contact form submitted (mock):', data);
  return { success: true, message: 'Message sent successfully!' };
}

// ADMIN API (Protected)
export async function adminLogin(data: { email: string; password: string }): Promise<ApiResponse<any>> {
  await delay(1000);
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, { method: 'POST', body: JSON.stringify(data) }).then(r => r.json())
  console.log('Admin login (mock):', data);
  if (data.email && data.password) {
    localStorage.setItem('adminToken', 'mock-jwt-token');
    localStorage.setItem('adminUser', JSON.stringify(mockAdminUser));
    return { success: true, data: { token: 'mock-jwt-token', user: mockAdminUser }, message: 'Login successful' };
  }
  return { success: false, error: 'Invalid credentials' };
}

export async function adminLogout() {
  await delay(300);
  // TODO: Call API to clear httpOnly cookie
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
}

export function getAdminUser() {
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/me`).then(r => r.json())
  const userJson = localStorage.getItem('adminUser');
  return userJson ? JSON.parse(userJson) : null;
}

export function isAuthenticated() {
  // TODO: Verify JWT token with API
  return !!localStorage.getItem('adminToken');
}

export async function getDashboardStats() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/stats`).then(r => r.json())
  return mockDashboardStats;
}

export async function getActivityLogs(limit: number = 10) {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/activity?limit=${limit}`).then(r => r.json())
  return mockActivityLogs.slice(0, limit);
}

export async function getAllServices() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/services`).then(r => r.json())
  return mockServices;
}

export async function getAllBlogPosts() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blog`).then(r => r.json())
  return mockBlogPosts;
}

export async function getAllTestimonials() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/testimonials`).then(r => r.json())
  return mockTestimonials;
}

export async function getAllBookings() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings`).then(r => r.json())
  return mockBookings;
}

export async function getAllSubscribers() {
  await delay();
  // TODO: return fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscribers`).then(r => r.json())
  return mockSubscribers;
}
