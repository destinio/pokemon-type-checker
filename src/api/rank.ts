import { IRank } from '../types'
import { toCamelCase } from '../utils'

export async function getRankings() {
  const response = await fetch('/data/ranksV2.json')

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
