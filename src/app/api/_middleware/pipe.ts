import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerActionProcedure } from "zsa";
import { createProcedure } from "../../_utils/procedure";

const authProcedure = createProcedure().use(async (_, ctx) => {
  throw new Error("Not implemented");

  return {
    user: {
      id: "123",
    },
  };
});

const POST = authProcedure.createHandler(async (request, ctx) => {
  console.log(ctx.user);
  return NextResponse.json({ message: "Hello, world!" });
});

const otherProcedure = createProcedure(authProcedure).use(async (_, ctx) => {
  return {
    ...ctx,
    name: "John Doe",
  };
});

const POST2 = createProcedure(authProcedure)
  .use(async (request, ctx) => {
    return {
      ...ctx,
      name: "John Doe",
    };
  })
  .createHandler(async (request, ctx) => {
    return NextResponse.json({ message: "Hello, world!" });
  });

//

const procedure = createServerActionProcedure()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .handler(async ({ ctx }) => {
    return NextResponse.json({ message: "Hello, world!" });
  });

async function fn() {
  await procedure
    .createServerAction()
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .handler(({ ctx }) => {
      return NextResponse.json({ message: "Hello, world!" });
    });
}

// export function pipe(middlewares: Middleware[], handler: Handler) {
//   return async (request: NextRequest) => {
//     let response: NextResponse | void;

//     for (let i = 0; i < middlewares.length; i++) {
//       response = await middlewares[i](request);

//       if (response) {
//         return response;
//       }
//     }

//     return await handler(request);
//   };
// }
