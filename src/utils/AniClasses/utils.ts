import { Prisma } from "@prisma/client";

export const getRandomElement = <T>(arr: T[]) => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined);

export const checkRequirement = (requirement: Prisma.JsonObject, attr: Prisma.JsonObject) => {
  for (const key in requirement) {
    const a = requirement[key];
    const b = attr[key];
    if (a != null && b != null && a > b) {
      // should always be true
      return false;
    }
  }
  return true;
};
