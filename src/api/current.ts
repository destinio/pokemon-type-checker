import { ICurrentRaid } from '../types'

export async function getCurrentRaids(): Promise<ICurrentRaid[]> {
  const response = await fetch('/data/current.json')

  if (response.ok) {
    const data = (await response.json()) as any[]

    return data
  }

  return []
}
