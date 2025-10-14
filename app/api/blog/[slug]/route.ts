import { NextResponse } from 'next/server'
import { mockBlogPosts } from '@/lib/mockData'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  context: any
) {
  try {
    const { slug } = context.params;
    const post = await prisma.blogPost.findUnique({ where: { slug } })
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

export async function PUT(
  request: Request,
  context: any
) {
  try {
    const { slug } = context.params;
    const data = await request.json()
    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data,
    })
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Failed to update post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    const { slug } = context.params;
    await prisma.blogPost.delete({ where: { slug } })
    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Failed to delete post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}