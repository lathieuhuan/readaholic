import { baseProcedure } from "@procedures/base-procedure";
import { ErrorResponse, SuccessResponse, COMMON_ERRORS } from "@readaholic/service";
import { endUserSession } from "@utils/auth-utils";

export const POST = baseProcedure.createHandler(async () => {
  return endUserSession()
    .then(() => new SuccessResponse(null))
    .catch(() => new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR));
});
