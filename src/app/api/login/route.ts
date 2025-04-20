import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/auth-service";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  return login(request);
}
