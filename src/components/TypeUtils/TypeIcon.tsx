import { getPokemonTypeUiInfo } from './utils'

interface IPokemonIconProps {
  type: string
}

export function TypeIcon({ type }: IPokemonIconProps) {
  const typeData = getPokemonTypeUiInfo(type)

  return (
    <div
      title={type}
      className="text-4xl cursor-pointer hover:scale-110"
      style={{ color: typeData.color }}
    >
      {typeData.icon}
    </div>
  )
}
