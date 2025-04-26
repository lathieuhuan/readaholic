import { NextResponse } from "next/server";
import { createProcedure } from "@app/_utils/procedure";

export const baseProcedure = createProcedure().use(async (request) => {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const body = await request.json();

  return {
    body,
  };
});
