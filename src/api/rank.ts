import { IRank } from "../types";

const toCamelCase = (str: string) =>
  str.toLowerCase().replace(/ ([a-z])/g, (_, char: string) => char.toUpperCase());

export async function getRankings() {
  const response = await fetch('/data/ranks.json')

  if (response.ok) {
    const data = (await response.json()) as any[]

    const newData = data.map((p, i) => {
      const newP = {} as any

      for (const key in p) {
        newP[toCamelCase(key)] = p[key]
      }

      return { rank: i + 1, ...newP }
    }) as any[]


    return newData as IRank[]
  }

  return []
}