import { pokemonTypesIcons } from "@/poke-types/types-data"

interface ITypeIconProps {
  type: string
}

export default function TypeIcon({ type }: ITypeIconProps) {
  const pokemonType = pokemonTypesIcons.find(t => t.type === type)

  if (!pokemonType) {
    return null
  }

  return (
    <div
      title={type}
      className="text-4xl cursor-pointer hover:scale-110"
      style={{ color: pokemonType.color }}
    >
      {pokemonType.icon}
    </div>
  )
}