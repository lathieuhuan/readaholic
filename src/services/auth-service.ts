import { NextRequest, NextResponse } from "next/server";
import { IssueData } from "zod";

import { addUser, getUserByEmail } from "@/repositories/user-repository";
import { hashPassword, setUserSession } from "@/utils/auth-utils";
import { loginSchema } from "@/zod/login-schema";
import { registerSchema } from "@/zod/register-schema";

export async function register(request: NextRequest) {
  const body = await request.json();
  const { success, data, error } = registerSchema.safeParse(body);

  if (success) {
    const user = await addUser({
      ...data,
      password: hashPassword(data.password),
    });
    console.log(user);
    return NextResponse.json({ message: "User created successfully" });
  }
  const issues: IssueData[] = JSON.parse(error.message);

  return NextResponse.json({ error: issues }, { status: 400 });
}

export async function login(request: NextRequest) {
  const body = await request.json();
  const { success, data, error } = loginSchema.safeParse(body);

  if (success) {
    const user = await getUserByEmail(data.email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    if (user.password !== hashPassword(data.password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

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
