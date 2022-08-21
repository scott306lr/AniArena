export const getRandomElement = <T>(arr: T[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined