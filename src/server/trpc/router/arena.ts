import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { JSONValue } from "superjson/dist/types";
import { undefined, z } from "zod";
import { Arena } from "../../../utils/AniClasses/Arena";
import { t, authedProcedure } from "../utils";

export const arenaAuthRouter = t.router({
  battle: authedProcedure.input(z.object({with_id: z.string()})).query(async ({ ctx, input }) => {
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
                skills: true
              },
            },
          },
        },
      },
    }) 

    const player2 = await ctx.prisma.player.findFirstOrThrow({
      where: {
        userId: input.with_id,
      },
      include: {
        combater: {
          include: {
            character: {
              include: {
                skills: true
              },
            },
          },
        }
      }
    })

    if ( !player1 || !player1.combater || !player2 || !player2.combater) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    
    const p1_skills = player1.combater.character.skills.filter((skill) => {
      const requirement = skill.requirement as Prisma.JsonObject;
      const attr = player1.combater?.attr as Prisma.JsonObject;
      return checkRequirement(requirement, attr)
    });

    const p2_skills = player2.combater.character.skills.filter((skill) => {
      const requirement = skill.requirement as Prisma.JsonObject;
      const attr = player2.combater?.attr as Prisma.JsonObject;
      return checkRequirement(requirement, attr)
    });

    player1.combater.character.skills = p1_skills;
    player2.combater.character.skills = p2_skills;
    // const arena = new Arena(player1, player2)
    // arena.start();
    return {player1, player2}
  }),
  check_p1: authedProcedure.input(z.object({with_id: z.string()})).query(async ({ ctx, input }) => {
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
                skills: true
              },
            },
          },
        },
      },
    }) 

    if ( !player1 || !player1.combater) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    
    const attr = player1.combater?.attr as Prisma.JsonObject;
    const p1_skills = player1.combater.character.skills.filter((skill) => {
      const requirement = skill.requirement as Prisma.JsonObject;
      return checkRequirement(requirement, attr)
    });

    player1.combater.character.skills = p1_skills;
    return player1
  }),
});

const checkRequirement = (requirement: Prisma.JsonObject, attr: Prisma.JsonObject) => {
  for (const key in requirement) {
    const a = requirement[key] 
    const b = attr[key]
    if (a != null && b != null && a > b){// should always be true
      return false;
    }
  }
  return true;
}