import { pokemonTypesIcons } from '@/poke-types/types-data'
import { TypeTextButton } from './TypeTextButton'
import { useTypeChecker } from './state/TypeCheckerProvider'
import cn from "classnames"

export default function TypeButtons() {
  const { toggleType, selectedTypes } = useTypeChecker()


  return (
    <div className="grid grid-cols-4 gap-2">
      {pokemonTypesIcons.map((p, i) => {
        const stateClassNames = cn({
          'opacity-100 cursor-pointer': selectedTypes.includes(p.type),
          'opacity-50 hover:opacity-100': !selectedTypes.includes(p.type) && selectedTypes.length >= 1,
          'cursor-not-allowed hover:opacity-50': !selectedTypes.includes(p.type) && selectedTypes.length >= 2,
        })
        return (<TypeTextButton classNames={stateClassNames} handleClick={toggleType} pokemonTypeInfo={p} key={`${p.type}-${i}`} />)
      })}
    </div>
  )
}