import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";

// GET a single post for editing
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const posts = await db.blog.getAll();
        const post = posts.find(p => p.id === params.id);

        if (!post) {
            return apiResponse(404, { success: false, error: "Post not found" });
        }
        return apiResponse(200, post);
    } catch (error) {
        return handleApiError(error);
    }
}

// PUT (update) a blog post
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedPost = await db.blog.update(params.id, body);

    if (!updatedPost) {
      return apiResponse(404, { success: false, error: "Post not found" });
    }

    return apiResponse(200, { success: true, post: updatedPost });
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE a blog post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await db.blog.delete(params.id);

    if (!success) {
      return apiResponse(404, { success: false, error: "Post not found" });
    }

    return apiResponse(200, { success: true });
  } catch (error) {
    return handleApiError(error);
  }
}