import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { JSONValue } from 'superjson/dist/types';
import { undefined, z } from 'zod';
import { Arena } from '../../../utils/AniClasses/Arena';
import { t, authedProcedure } from '../trpc';
import { checkRequirement } from '../../../utils/AniClasses/utils';

export const arenaAuthRouter = t.router({
  getBattleLogs: t.procedure.query(({ ctx }) => {
    return ctx.prisma.battleLog.findMany({
      select: {
        id: true,
        // creator: {
        //   select: {
        //     name: true,
        //     combater: { select: { character: { select: { image: true } } } },
        //   },
        // },
        won: true,
        // opponent: {
        //   select: {
        //     name: true,
        //     combater: { select: { character: { select: { image: true } } } },
        //   },
        // },
        content: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }),

  getBattleLog: t.procedure.input(z.object({ id: z.number().int() })).query(({ ctx, input }) => {
    return ctx.prisma.battleLog.findFirstOrThrow({
      where: { id: input.id },
    });
  }),

  battle: authedProcedure.input(z.object({ with_id: z.string() })).mutation(async ({ ctx, input }) => {
    //player.combater.character.skills
    const player1 = await ctx.prisma.player.findFirstOrThrow({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        combater: {
          include: {
            character: {
              include: {
                skills: true,
              },
            },
          },
        },
      },
    });

    const player2 = await ctx.prisma.player.findFirstOrThrow({
      where: {
        id: input.with_id,
      },
      include: {
        combater: {
          include: {
            character: {
              include: {
                skills: true,
              },
            },
          },
        },
      },
    });

    if (!player1 || !player1.combater || !player2 || !player2.combater) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    player1.combater.character.skills = player1.combater.character.skills.filter((skill) => {
      const requirement = skill.requirement as Prisma.JsonObject;
      const attr = player1.combater?.attr as Prisma.JsonObject;
      return checkRequirement(requirement, attr);
    });

    player2.combater.character.skills = player2.combater.character.skills.filter((skill) => {
      const requirement = skill.requirement as Prisma.JsonObject;
      const attr = player2.combater?.attr as Prisma.JsonObject;
      return checkRequirement(requirement, attr);
    });

    const arena = new Arena(player1, player2, 200);
    arena.start();

    // return arena.getLog();
    const log = arena.getLog();
    return ctx.prisma.battleLog.create({
      data: {
        creator: { connect: { id: player1.id } },
        opponent: { connect: { id: player2.id } },
        won: log ? log.winner?.id === player1.id : false,
        content: JSON.parse(JSON.stringify(log)) as Prisma.JsonObject,
      },
    });
  }),
});
