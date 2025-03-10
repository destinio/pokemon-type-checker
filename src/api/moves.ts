import { IMove, IMoveWithTypes } from '../types'
import { toTrainCase } from '../utils'
import { getTypeByName } from '../utils/pokemonTypes'

export async function getMoves({
  fast,
  charged,
}: {
  fast: string
  charged: string
}): Promise<IMoveWithTypes[]> {
  const response = await fetch('/data/moves.json')

  const fastId = toTrainCase(fast)
  const chargedId = toTrainCase(charged)

  if (response.ok) {
    const data = (await response.json()) as IMove[]

    return data
      .filter(move => {
        return move.name === fastId || move.name === chargedId
      })
      .map(move => {
        const typeName = move.typeName
        const type = getTypeByName(typeName)

        return {
          ...move,
          type,
        }
      })
  }

  return []
}
