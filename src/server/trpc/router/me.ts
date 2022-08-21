import { z } from "zod";
import { t, authedProcedure } from "../utils";

export const meAuthRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getProfile: authedProcedure.query(({ ctx }) => {
    ctx.session.user.id
    return ctx.prisma.player.findFirstOrThrow({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        combater: {
          include: {
            character: true
          },
        }
      }
    })
  }),
  postName: authedProcedure.input(z.object({name: z.string()})).query(({ ctx, input }) => {
    return ctx.prisma.player.update({
      where: {
        userId: ctx.session.user.id,
      },
      data: {
        name: input.name,
      }
    })
  }),
  postDescription: authedProcedure.input(z.object({description: z.string()})).query(({ ctx, input }) => {
    return ctx.prisma.player.update({
      where: {
        userId: ctx.session.user.id,
      },
      data: {
        description: input.description,
      }
    })
  }),

});
