import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import superjson from 'superjson';
import { Prisma } from '@prisma/client';

export const t = initTRPC<{ ctx: Context }>()({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const authedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const checkRequirement = (requirement: Prisma.JsonObject, attr: Prisma.JsonObject) => {
  for (const key in requirement) {
    const a = requirement[key];
    const b = attr[key];
    if (a != null && b != null && a > b) {
      // should always be true
      return false;
    }
  }
  return true;
};
