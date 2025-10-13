import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let posts = await db.blog.getAll();

    if (category) {
      posts = posts.filter((post) => post.category === category);
    }

    if (search) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    const total = posts.length;
    const paginatedPosts = posts.slice((page - 1) * limit, page * limit);

    return apiResponse(200, {
      posts: paginatedPosts,
      total,
      page,
      limit,
    });
  } catch (error) {
    return handleApiError(error);
  }
}