import classNames from 'classnames'
import { BaseSyntheticEvent } from 'react'
import { pokemonTypesIcons } from './TypeIcon'
import { useTypeSelector } from './context'

export default function TypeButtons() {
  const shadow = '1px 1px 2px rgba(0,0,0,.7)'

  const { currentType, setCurrentType } = useTypeSelector()

  function handleTypeClick(e: BaseSyntheticEvent) {
    e.stopPropagation()

    if (currentType === e.target.name) {
      setCurrentType(null!)
      return
    }

    setCurrentType(e.target.name)
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {pokemonTypesIcons.map((p, i) => (
        <button
          key={`${i}`}
          className={classNames(
            'p-2 rounded-sm border border-black overflow-hidden text-xl hover:opacity-100 hover:scale-105',
            {
              'opacity-100': !currentType || p.type === currentType,
              'opacity-50': currentType && p.type !== currentType,
            }
          )}
          style={{ backgroundColor: p.color, textShadow: shadow }}
          onClick={handleTypeClick}
          name={p.type}
        >
          {p.type}
        </button>
      ))}
    </div>
  )
}
