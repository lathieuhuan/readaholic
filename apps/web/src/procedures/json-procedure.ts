import { ErrorResponse } from "@readaholic/service";
import { baseProcedure } from "./base-procedure";

export const jsonProcedure = baseProcedure.interceptRequest(async (request, ctx) => {
  const contentType = request.headers.get("Content-Type");

  if (contentType !== "application/json") {
    return new ErrorResponse(400, "BAD_REQUEST");
  }
  const body = await request.json();

  return {
    body,
    ...ctx,
  };
});
