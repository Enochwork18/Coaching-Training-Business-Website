// Mock data exports - TODO: Replace with API calls to backend

export const mockServices = [
  { id: '1', slug: 'marriage-counseling', title: 'Marriage & Relationship Counseling', category: 'Marriage & Relationships', excerpt: 'Strengthen your bond through faith-based guidance.', description: '<p>Professional counseling for couples.</p>', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', duration: '60 min', price: '£85', included: ['One-on-one sessions', 'Action plan'], faqs: [], published: true, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z' },
  { id: '2', slug: 'parenting-coaching', title: 'Parenting Coaching', category: 'Parenting & Family', excerpt: 'Build confident, emotionally intelligent children.', description: '<p>Expert parenting guidance.</p>', image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=1200', duration: '45 min', price: '£75', included: ['Personalized strategies'], faqs: [], published: true, createdAt: '2024-01-16T10:00:00Z', updatedAt: '2024-01-16T10:00:00Z' },
  { id: '3', slug: 'pre-marital-coaching', title: 'Pre-Marital Coaching', category: 'Marriage & Relationships', excerpt: 'Start your marriage with wisdom.', description: '<p>Pre-marital preparation.</p>', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200', duration: '90 min', price: 'Available upon request', included: ['Assessment', 'Workbook'], faqs: [], published: true, createdAt: '2024-01-17T10:00:00Z', updatedAt: '2024-01-17T10:00:00Z' }
];

export const mockBlogPosts = [
  { id: '1', slug: 'five-pillars-healthy-marriage', title: '5 Pillars of a Healthy Marriage', category: 'Relationships', excerpt: 'Discover the foundational elements that create lasting intimacy.', content: '<p>After years of working with couples...</p>', image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200', author: 'Elizabeth Omolara', published: true, featured: true, tags: ['marriage', 'relationships'], readTime: 8, createdAt: '2024-02-10T09:00:00Z', updatedAt: '2024-02-10T09:00:00Z' },
  { id: '2', slug: 'raising-emotionally-intelligent-children', title: 'Raising Emotionally Intelligent Children', category: 'Parenting', excerpt: 'Practical strategies to help your children manage emotions.', content: '<p>In today\'s world...</p>', image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=1200', author: 'Elizabeth Omolara', published: true, featured: true, tags: ['parenting', 'children'], readTime: 12, createdAt: '2024-02-15T10:00:00Z', updatedAt: '2024-02-15T10:00:00Z' }
];

export const mockTestimonials = [
  { id: '1', name: 'Sarah M.', isAnonymous: false, service: 'Marriage Counseling', serviceId: '1', rating: 5, quote: 'Elizabeth helped us find our way back to each other. Six months later, we\'re stronger than ever!', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', approved: true, createdAt: '2024-01-20T10:00:00Z' },
  { id: '2', name: 'Anonymous', isAnonymous: true, service: 'Parenting Coaching', serviceId: '2', rating: 5, quote: 'I finally feel confident as a parent. The strategies actually work!', approved: true, createdAt: '2024-01-25T10:00:00Z' },
  { id: '3', name: 'David and Grace T.', isAnonymous: false, service: 'Pre-Marital Coaching', serviceId: '3', rating: 5, quote: 'Best decision we made before marriage. We feel so prepared!', approved: true, createdAt: '2024-02-01T10:00:00Z' }
];

export const mockGalleryItems = [
  { id: '1', title: 'Family Retreat 2024', description: 'Annual wellness retreat', image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=1200', category: 'Events', published: true, createdAt: '2024-03-01T10:00:00Z' },
  { id: '2', title: 'Parenting Workshop', description: 'Building resilient kids', image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=1200', category: 'Workshops', published: true, createdAt: '2024-02-25T10:00:00Z' }
];

export const mockBookings = [
  { id: '1', reference: 'IBS-2024-001', clientName: 'John Smith', clientEmail: 'john@example.com', clientPhone: '+447712345678', serviceId: '1', serviceName: 'Marriage Counseling', date: '2024-03-15', time: '10:00', status: 'CONFIRMED', paymentStatus: 'SUCCESS', paymentAmount: '£85.00', createdAt: '2024-03-01T09:00:00Z' }
];

export const mockSubscribers = [
  { id: '1', email: 'sarah@example.com', name: 'Sarah Miller', status: 'ACTIVE', subscribedAt: '2024-01-15T10:30:00Z' },
  { id: '2', email: 'john@example.com', name: 'John Williams', status: 'ACTIVE', subscribedAt: '2024-01-18T14:20:00Z' }
];

export const mockAdminUser = {
  id: '1',
  email: 'elizabeth@ibasepo.org.uk',
  name: 'Elizabeth Omolara',
  role: 'ADMIN' as const
};

export const mockDashboardStats = {
  bookingsThisMonth: { count: 8, trend: 25 },
  newSubscribersThisWeek: { count: 4, trend: 33 },
  publishedBlogPosts: { count: 3 },
  pendingTestimonials: { count: 2 }
};

export const mockActivityLogs = [
  { id: '1', user: 'Elizabeth Omolara', action: 'approved', item: 'testimonial from Sarah M.', timestamp: '2024-03-06T10:30:00Z' },
  { id: '2', user: 'Elizabeth Omolara', action: 'published', item: 'blog post "5 Pillars"', timestamp: '2024-03-05T14:20:00Z' }
];
