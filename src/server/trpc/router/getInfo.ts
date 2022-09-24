import { t } from '../trpc';
import { z } from 'zod';

export const getInfoRouter = t.router({
  getProfileByID: t.procedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.player.findFirstOrThrow({
      where: { id: input.id },
      include: {
        combater: { select: { character: { select: { image: true } } } },
      },
    });
  }),
  getProfilesByName: t.procedure.input(z.object({ name: z.string().min(3).max(50) })).query(({ ctx, input }) => {
    return ctx.prisma.player.findMany({
      where: {
        name: { contains: input.name },
      },
    });
  }),
  getAllProfiles: t.procedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany({
      where: {
        NOT: { combater: null },
      },
      include: {
        combater: { select: { character: { select: { image: true } } } },
      },
    });
  }),
});
