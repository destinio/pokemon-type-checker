import { IRank } from '../types'
import { useMoves } from '../hooks/useMoves'
import { toTrainCase } from '../utils'

export default function Moves({ rank }: { rank: IRank }) {
  const { data: moves } = useMoves({
    fast: rank.fast,
    charged: rank.charged,
  })

  if (!moves) {
    return null
  }

  function getMove(name: string) {
    return moves?.find(move => move.name === toTrainCase(name))
  }

  return (
    <div>
      <div className="flex gap-2">
        <p className="flex gap-2 items-center">
          {/* <FaFastForward className="inline-block " />{' '} */}
          <span style={{ color: getMove(rank.fast)?.type.color }}>
            {getMove(rank.fast)?.type.icon}
          </span>
          <span>{rank.fast}</span>
        </p>
        <p className="flex gap-2 items-center">
          {/* <RiBattery2ChargeFill className="inline-block" />{' '} */}
          <span style={{ color: getMove(rank.charged)?.type.color }}>
            {getMove(rank.charged)?.type.icon}
          </span>
          <span>{rank.charged}</span>
        </p>
      </div>
    </div>
  )
}
