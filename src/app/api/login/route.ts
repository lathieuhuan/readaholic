import { NextRequest, NextResponse } from "next/server";
import { IssueData } from "zod";

import { setUserSession } from "@app/_utils/auth-utils";
import { loginSchema } from "@app/_validation-schemas/login-schema";
import { login } from "@services/auth-service";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const body = await request.json();
  const { success, data, error } = loginSchema.safeParse(body);

  if (success) {
    const user = await login(data);

    await setUserSession({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    return NextResponse.json({ message: "User signed in successfully" });
  }
  const issues: IssueData[] = JSON.parse(error.message);

  return NextResponse.json({ error: issues }, { status: 400 });
}
