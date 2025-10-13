import { NextResponse } from "next/server";

export function apiResponse(status: number, data: unknown) {
  return NextResponse.json(data, { status });
}

export function handleApiError(error: unknown) {
    console.error(error);

    if (error instanceof Error) {
        return apiResponse(500, {
            success: false,
            error: error.message,
            code: "INTERNAL_SERVER_ERROR",
        });
    }

    return apiResponse(500, {
        success: false,
        error: "An unknown error occurred.",
        code: "UNKNOWN_ERROR",
    });
}