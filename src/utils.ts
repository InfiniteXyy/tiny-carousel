export function peek<T>(array: T[], indexes: number[]): T[] {
  return indexes.map<T>(i => array[i]);
}

export const mod = (base: number) => (num: number) =>
  ((num % base) + base) % base;
