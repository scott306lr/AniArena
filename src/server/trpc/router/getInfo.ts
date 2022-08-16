import { t } from "../utils";
import { z } from "zod";

export const getInfoRouter = t.router({
  getProfilesByName: t.procedure
    .input(z.string().min(3).max(50))
    .query(({ ctx, input: name }) => {
      return ctx.prisma.player.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
    }),
  getAllProfiles: t.procedure.query(({ ctx }) => {
    return ctx.prisma.player.findMany({
      where: {
        NOT: {
          combater: null,
        },
      },
      include: {
        combater: {
          select: {
            character: {
              select: {
                image: true,
              }
            }
          },
        }
      }
    });
  }),
});
