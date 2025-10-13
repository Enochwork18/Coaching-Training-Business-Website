import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";
import { BlogPost } from "@/lib/types";

// GET all posts for admin view
export async function GET() {
    try {
        const posts = await db.blog.getAll();
        return apiResponse(200, posts);
    } catch (error) {
        return handleApiError(error);
    }
}

// POST a new blog post
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newPost: Omit<BlogPost, "id"> = {
            ...body,
            publishedAt: new Date().toISOString(),
        };

        const post = await db.blog.create(newPost);
        return apiResponse(201, { success: true, post });
    } catch (error) {
        return handleApiError(error);
    }
}