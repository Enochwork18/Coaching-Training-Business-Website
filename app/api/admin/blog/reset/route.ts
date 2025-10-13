import { db } from "@/lib/db";
import { apiResponse, handleApiError } from "@/lib/api-utils";

export async function POST() {
  try {
    await db.blog.reset();
    return apiResponse(200, { success: true });
  } catch (error) {
    return handleApiError(error);
  }
}