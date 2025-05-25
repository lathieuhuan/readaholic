import { ErrorResponse, COMMON_ERRORS } from "@readaholic/service";
import { NextRequest } from "next/server";
import { z } from "zod";

import { RequestInterceptor } from "../procedure";

function parseQueryParams(params: URLSearchParams) {
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    if (result.hasOwnProperty(key)) {
      // Convert to array if not already
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function validateQueryParams<TQueryParamsShape, TPreContext = void>(
  schema: z.ZodSchema<TQueryParamsShape>,
): RequestInterceptor<{ queryParams: TQueryParamsShape } & TPreContext, TPreContext> {
  //
  return async (request: NextRequest, ctx: TPreContext) => {
    const searchParams = request.nextUrl.searchParams;
    const { success, data, error } = schema.safeParse(parseQueryParams(searchParams));

    if (success) {
      return {
        ...ctx,
        queryParams: data,
      };
    }

    return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
  };
}
