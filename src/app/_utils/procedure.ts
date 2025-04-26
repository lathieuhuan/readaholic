import { NextRequest, NextResponse } from "next/server";

type Middleware<TContext = void, TPreContext = void> = (
  request: NextRequest,
  ctx: TPreContext,
) => Promise<TContext | NextResponse>;

type Handler<TContext = void, TResponse extends NextResponse = NextResponse> = (
  request: NextRequest,
  ctx: TContext,
) => Promise<TResponse>;

class InternalProcedure<TContext> {
  //
  constructor(public middleware: Middleware<TContext>) {}

  createHandler<TResponse extends NextResponse>(callback: Handler<TContext, TResponse>) {
    return async (request: NextRequest) => {
      const ctx = await this.middleware?.(request);
      return ctx instanceof NextResponse ? ctx : await callback(request, ctx);
    };
  }
}

type Procedure<TContext> = Pick<InternalProcedure<TContext>, "createHandler">;

type ProcedureCreator = {
  use<TContext>(middleware: Middleware<TContext>): Procedure<TContext>;
};

type ProcedureCreatorWithContext<TPreContext> = {
  use<TContext>(middleware: Middleware<TContext, TPreContext>): Procedure<TContext>;
};

export function createProcedure(): ProcedureCreator;

export function createProcedure<TPreContext>(
  preProcedure?: Procedure<TPreContext>,
): ProcedureCreatorWithContext<TPreContext>;

export function createProcedure<TPreContext>(
  preProcedure?: Procedure<TPreContext>,
): ProcedureCreator | ProcedureCreatorWithContext<TPreContext> {
  //
  if (preProcedure) {
    return {
      use<TContext>(middleware: Middleware<TContext, TPreContext>) {
        return new InternalProcedure(async (request, ctx) => {
          const preCtx = await (preProcedure as InternalProcedure<TPreContext>).middleware(
            request,
            ctx,
          );
          return preCtx instanceof NextResponse ? preCtx : middleware(request, preCtx);
        });
      },
    };
  }

  return {
    use<TContext>(middleware: Middleware<TContext>) {
      return new InternalProcedure(middleware);
    },
  };
}
