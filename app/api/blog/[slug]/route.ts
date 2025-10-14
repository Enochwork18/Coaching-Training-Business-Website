import { NextResponse } from 'next/server'
import { mockBlogPosts } from '@/lib/mockData'

export async function GET(
  request: Request,
  context: any
) {
  try {
    const { slug } = context.params;
    const post = mockBlogPosts.find(p => p.slug === slug)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to retrieve post:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve post', details: String(error) },
      { status: 500 }
    )
  }
}