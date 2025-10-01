import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BlogPostHero } from "@/components/blog/blog-post-hero"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogPostAuthor } from "@/components/blog/blog-post-author"
import { RelatedPosts } from "@/components/blog/related-posts"

// API Integration Point: GET /api/blog/posts
// This should fetch all blog posts for static generation
export async function generateStaticParams() {
  // In production, fetch from API
  // const posts = await fetch('/api/blog/posts').then(res => res.json())
  // return posts.map((post) => ({ slug: post.slug }))

  return [
    { slug: "5-keys-to-building-stronger-relationships" },
    { slug: "navigating-career-transitions-with-confidence" },
    { slug: "power-of-emotional-intelligence-in-leadership" },
    { slug: "mindfulness-practices-for-daily-life" },
    { slug: "creating-culture-of-continuous-learning" },
    { slug: "communication-strategies-for-couples" },
  ]
}

// API Integration Point: GET /api/blog/posts/:slug
// This should fetch a single blog post by slug
async function getBlogPost(slug: string) {
  // In production, fetch from API
  // const post = await fetch(`/api/blog/posts/${slug}`).then(res => res.json())
  // if (!post) return null
  // return post

  // Mock data for now
  const posts: Record<string, any> = {
    "5-keys-to-building-stronger-relationships": {
      id: "1",
      title: "5 Keys to Building Stronger Relationships",
      slug: "5-keys-to-building-stronger-relationships",
      excerpt:
        "Discover the essential elements that create lasting, meaningful connections with the people who matter most in your life.",
      content: `
# Introduction

Building strong, meaningful relationships is one of the most important aspects of a fulfilling life. Whether it's with a romantic partner, family member, friend, or colleague, the quality of our relationships directly impacts our happiness, health, and overall well-being.

In this article, we'll explore five essential keys that can help you build and maintain stronger, more authentic connections with the people who matter most.

## 1. Practice Active Listening

Active listening goes beyond simply hearing words—it's about fully engaging with what the other person is saying, both verbally and non-verbally. This means:

- Giving your full attention without distractions
- Making eye contact and using affirming body language
- Asking clarifying questions to ensure understanding
- Reflecting back what you've heard to show comprehension
- Avoiding the urge to interrupt or formulate your response while they're speaking

When people feel truly heard, they feel valued and understood, which strengthens the bond between you.

## 2. Cultivate Emotional Intelligence

Emotional intelligence (EQ) is the ability to recognize, understand, and manage your own emotions while also being attuned to the emotions of others. High EQ enables you to:

- Navigate conflicts with empathy and understanding
- Respond rather than react to challenging situations
- Express your feelings in healthy, constructive ways
- Recognize and validate the emotions of others
- Build trust through emotional authenticity

Developing your emotional intelligence is a lifelong journey that pays dividends in all your relationships.

## 3. Communicate with Honesty and Respect

Open, honest communication is the foundation of any strong relationship. This involves:

- Expressing your thoughts, feelings, and needs clearly
- Being vulnerable and authentic in your sharing
- Using "I" statements to take ownership of your feelings
- Addressing issues directly rather than letting them fester
- Maintaining respect even during disagreements

Remember, it's not just what you say but how you say it that matters.

## 4. Show Consistent Appreciation

Never underestimate the power of expressing gratitude and appreciation. Make it a habit to:

- Acknowledge the positive qualities you see in others
- Express thanks for both big gestures and small acts of kindness
- Celebrate achievements and milestones together
- Show affection through words, actions, and quality time
- Be specific in your appreciation rather than generic

Regular expressions of appreciation create a positive cycle that strengthens relationships over time.

## 5. Invest Time and Energy

Strong relationships don't happen by accident—they require intentional investment. This means:

- Prioritizing quality time together
- Being present and engaged when you're together
- Making an effort to understand their world and interests
- Supporting their goals and dreams
- Being there during both good times and challenges

The time and energy you invest in your relationships will be reflected in their depth and resilience.

## Conclusion

Building stronger relationships is an ongoing process that requires commitment, self-awareness, and practice. By focusing on these five keys—active listening, emotional intelligence, honest communication, consistent appreciation, and intentional investment—you can create deeper, more meaningful connections that enrich your life and the lives of those around you.

Remember, every relationship is unique, and what works in one may need to be adapted for another. The key is to approach each relationship with authenticity, compassion, and a genuine desire to connect.

What steps will you take today to strengthen your most important relationships?
      `,
      image: "/couple-having-meaningful-conversation.jpg",
      category: "Relationships",
      tags: ["relationships", "communication", "emotional intelligence", "personal growth"],
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      featured: true,
      author: {
        name: "Dr. Adebayo Okonkwo",
        avatar: "/professional-coach-headshot.jpg",
        bio: "Certified professional coach with 15+ years of experience in individual and organizational development.",
      },
    },
  }

  return posts[slug] || null
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Ìbáṣepọ̀",
    }
  }

  return {
    title: `${post.title} | Ìbáṣepọ̀ Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <BlogPostHero post={post} />
      <div className="py-20 md:py-32 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <BlogPostContent post={post} />
            <BlogPostAuthor author={post.author} />
          </div>
        </div>
      </div>
      <RelatedPosts currentPostId={post.id} category={post.category} />
      <SiteFooter />
    </main>
  )
}
