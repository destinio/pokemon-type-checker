import { FaFastForward } from 'react-icons/fa'
import { RiBattery2ChargeFill } from 'react-icons/ri'
import { IRank } from '../types'
import { useMoves } from '../hooks/useMoves'
import { toTrainCase } from '../utils'

export default function Moves({ rank }: { rank: IRank }) {
  const { data: moves } = useMoves({
    fast: rank.fastMove,
    charged: rank.chargedMove,
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
          <span style={{ color: getMove(rank.fastMove)?.type.color }}>
            {getMove(rank.fastMove)?.type.icon}
          </span>
          <span>{rank.fastMove}</span>
        </p>
        <p className="flex gap-2 items-center">
          {/* <RiBattery2ChargeFill className="inline-block" />{' '} */}
          <span style={{ color: getMove(rank.chargedMove)?.type.color }}>
            {getMove(rank.chargedMove)?.type.icon}
          </span>
          <span>{rank.chargedMove}</span>
        </p>
      </div>
    </div>
  )
}
