import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t, authedProcedure } from "../trpc";
import { checkRequirement } from '../../../utils/AniClasses/utils';

export const meAuthRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => ctx.session),

  getUnlockedChar: authedProcedure.query(async ({ ctx }) => {
    const playerResponse = await ctx.prisma.player.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
      select: { unlockedChar: true },
    });
    return playerResponse.unlockedChar;
  }),

  getCombater: authedProcedure.query(async ({ ctx }) => {
    const playerResponse = await ctx.prisma.player.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
      select: { combater: { include: { character: true } } },
    });
    return playerResponse.combater;
  }),

  getProfile: authedProcedure.query(async ({ ctx }) => {
    ctx.session.user.id;
    const myProfile = await ctx.prisma.player.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
      include: {
        combater: {
          include: {
            character: { include: { skills: true } },
          },
        },
      },
    });

    if (myProfile == null) throw new TRPCError({ code: 'NOT_FOUND' });
    if (myProfile.combater != null) {
      myProfile.combater.character.skills = myProfile.combater.character.skills.filter((skill) => {
        const requirement = skill.requirement as Prisma.JsonObject;
        const attr = myProfile.combater?.attr as Prisma.JsonObject;
        return checkRequirement(requirement, attr);
      });
    }
    return myProfile;
  }),

  postName: authedProcedure.input(z.object({ name: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.player.update({
      where: { userId: ctx.session.user.id },
      data: { name: input.name },
    });
  }),

  postDescription: authedProcedure.input(z.object({ description: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.player.update({
      where: { userId: ctx.session.user.id },
      data: { description: input.description },
    });
  }),
  createProfile: authedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.player.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),
  reborn: authedProcedure
    .input(
      z.object({ characterId: z.number(), attr: z.object({ HP: z.number(), AP: z.number(), APRegen: z.number() }) })
    )
    .mutation(async ({ ctx, input }) => {
      const playerResponse = await ctx.prisma.player.findFirstOrThrow({
        where: { userId: ctx.session.user.id },
        select: { id: true },
      });

      return ctx.prisma.combater.update({
        where: { playerId: playerResponse.id },
        data: {
          characterId: input.characterId,
          attr: input.attr,
        },
      });
    }),
});
