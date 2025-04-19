import { NextRequest, NextResponse } from "next/server";
import { IssueData } from "zod";

import { registerSchema } from "@/zod/register-schema";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const body = await request.json();
  const { success, data, error } = registerSchema.safeParse(body);

  if (success) {
    return NextResponse.json({ message: "Hello, world!" });
  }
  const issues: IssueData[] = JSON.parse(error.message);

  return NextResponse.json({ error: issues }, { status: 400 });
}
