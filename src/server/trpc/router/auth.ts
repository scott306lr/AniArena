import { z } from 'zod';
import { t, authedProcedure } from '../trpc';

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
  getSecretTest: authedProcedure.input(z.object({ myname: z.string() })).query(({ ctx, input }) => {
    console.log('Loggin ctx.session, input, from getSecretTest');
    console.log(ctx.session, input);
    if (!input?.myname || input.myname == '') return 'hello, enter your name pls.';
    else return `hello ${input?.myname}`;
  }),
});
