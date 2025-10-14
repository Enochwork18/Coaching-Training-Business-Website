// Type definitions for the application

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  longDescription: string
  image: string
  icon: string
  features: string[]
  duration?: string
  price?: string
  category: "individual" | "couples" | "corporate"
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  featured: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  image: string
  content: string
  rating: number
  serviceId?: string
  featured: boolean
  createdAt: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: string
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  provider: 'paystack' | 'flutterwave';
  providerTransactionId?: string;
  customerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  webhookData?: any;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  preferredDate: Date;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
  active: boolean
}
