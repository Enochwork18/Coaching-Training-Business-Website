import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = await db.blog.getBySlug(slug);

    if (!post) {
      return apiResponse(404, {
        success: false,
        error: "Post not found",
        code: "NOT_FOUND",
      });
    }

    return apiResponse(200, post);
  } catch (error) {
    return handleApiError(error);
  }
}