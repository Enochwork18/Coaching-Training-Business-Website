export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  included: string[];
  faqs: FAQ[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  isAnonymous: boolean;
  service?: string;
  serviceId?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  image?: string;
  approved: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  published: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  reference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
  paymentAmount: string;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
  subscribedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN';
}

export interface DashboardStats {
  bookingsThisMonth: { count: number; trend: number };
  newSubscribersThisWeek: { count: number; trend: number };
  publishedBlogPosts: { count: number };
  pendingTestimonials: { count: number };
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  item: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
