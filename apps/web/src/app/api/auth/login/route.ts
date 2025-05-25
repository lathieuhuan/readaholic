import { translateError, validateBody } from "@procedures/add-ons";
import { baseProcedure } from "@procedures/base-procedure";
import { SuccessResponse } from "@readaholic/service";
import { setUserSession } from "@utils/auth-utils";
import { loginSchema } from "@validation-schemas/auth-schemas";

export const POST = baseProcedure
  .interceptRequest(validateBody(loginSchema))
  .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.authService.login(ctx.body);

    if (response instanceof SuccessResponse) {
      const user = response.data;

      await setUserSession({
        userId: user.id,
        email: user.email,
        username: user.username,
      });
    }

    return response;
  });
