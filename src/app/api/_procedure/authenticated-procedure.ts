import { NextResponse } from "next/server";

import { getUserSession } from "@app/_utils/auth-utils";
import { createProcedure } from "@app/_utils/procedure";
import { baseProcedure } from "./base-procedure";

export const authenticatedProcedure = createProcedure(baseProcedure).use(async (request, ctx) => {
  const user = await getUserSession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return { ...ctx, user };
});
