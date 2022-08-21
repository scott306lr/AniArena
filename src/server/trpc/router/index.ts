// src/server/trpc/router/index.ts
import { t } from "../utils";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { getInfoRouter } from "./getInfo";
import { meAuthRouter } from "./me";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  getInfo: getInfoRouter,
  me: meAuthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
