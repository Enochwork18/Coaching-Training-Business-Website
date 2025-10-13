import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function GET() {
  try {
    const posts = await db.blog.getAll();
    const categories = posts.reduce((acc, post) => {
      if (acc[post.category]) {
        acc[post.category]++;
      } else {
        acc[post.category] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const categoryList = Object.entries(categories).map(([name, count]) => ({
      name,
      count,
    }));

    return apiResponse(200, categoryList);
  } catch (error) {
    return handleApiError(error);
  }
}