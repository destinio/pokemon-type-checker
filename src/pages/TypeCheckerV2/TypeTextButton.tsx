import { type TPokemonTypeInfo } from "@/poke-types/types-data"
import cn from "classnames"

interface TypeTextButtonProps {
  pokemonTypeInfo: TPokemonTypeInfo
  handleClick: (type: string) => void
  classNames?: string
}

function TypeTextButton({ pokemonTypeInfo, classNames = '', handleClick = () => { } }: TypeTextButtonProps) {
  const { type, color } = pokemonTypeInfo

  const shadow = '1px 1px 2px rgba(0,0,0,.7)'

  return (<button
    className={cn(
      'p-2 rounded-sm border border-black overflow-hidden text-xl hover:scale-105',
      classNames
    )}
    onClick={() => handleClick(type)}
    style={{ backgroundColor: color, textShadow: shadow }}
    name={type}
  >
    {type}
  </button>
  )
}

export { TypeTextButton }