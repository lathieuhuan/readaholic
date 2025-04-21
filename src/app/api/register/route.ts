import { IssueData } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@app/_validation-schemas/register-schema";
import { register } from "@services/auth-service";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const body = await request.json();
  const { success, data, error } = registerSchema.safeParse(body);

  if (success) {
    await register(data);
    return NextResponse.json({ message: "User created successfully" });
  }
  const issues: IssueData[] = JSON.parse(error.message);

  return NextResponse.json({ error: issues }, { status: 400 });
}
