import { NextResponse } from 'next/server'
import { mockBlogPosts } from '@/lib/mockData'

export async function GET() {
  return NextResponse.json(mockBlogPosts)
}