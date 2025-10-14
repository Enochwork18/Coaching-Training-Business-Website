import { NextResponse } from 'next/server'
import { mockBlogPosts } from '@/lib/mockData'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const posts = await prisma.blogPost.findMany()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newPost = await prisma.blogPost.create({ data })
    return NextResponse.json(newPost)
  } catch (error) {
    console.error("Failed to create post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}