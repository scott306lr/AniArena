// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { getInfoRouter } from "./getInfo";
import { meAuthRouter } from "./me";
import { arenaAuthRouter } from "./arena";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  getInfo: getInfoRouter,
  me: meAuthRouter,
  arena: arenaAuthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
