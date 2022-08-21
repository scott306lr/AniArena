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
      }
    })
  }),

  // getCombater: authedProcedure.input(z.object({myname: z.string()})).query(({ ctx, input }) => {
  //   console.log("Loggin ctx.session, input, from getSecretTest")
  //   console.log(ctx.session, input)
  //   if (!input?.myname || input.myname == "") 
  //     return "hello, enter your name pls.";
  //   else
  //     return `hello ${input?.myname}`;
  // }),
});
