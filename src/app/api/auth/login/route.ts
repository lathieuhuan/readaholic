import { NextResponse } from "next/server";
import { IssueData } from "zod";

import { setUserSession } from "@app/_utils/auth-utils";
import { loginSchema } from "@app/_validation-schemas/login-schema";
import { baseProcedure } from "@app/api/_procedure/base-procedure";
import { login } from "@services/auth-service";

export const POST = baseProcedure.createHandler(async (request, ctx) => {
  const { success, data, error } = loginSchema.safeParse(ctx.body);

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
});
