import classNames from 'classnames'
import { pokemonTypes } from '../data/types'
import { BaseSyntheticEvent } from 'react'
import { useTypeChecker } from '../pages/TypeChecker/context/TypeCheckerProvider'

export default function TypeButtons() {
  const shadow = '1px 1px 2px rgba(0,0,0,.7)'

  const { currentType, setCurrentType } = useTypeChecker()

  function handleTypeClick(e: BaseSyntheticEvent) {
    e.stopPropagation()

    if (currentType === e.target.name) {
      setCurrentType(null!)
      return
    }

    setCurrentType(e.target.name)
  }

  return (
    <div className='grid grid-cols-4 gap-2 mt-4'>
      {pokemonTypes.map(p => (
        <button
          key={p.type}
          className={classNames(
            'p-2 rounded-sm border border-black overflow-hidden text-xl hover:opacity-100 hover:scale-105',
            {
              'opacity-100': !currentType || p.type === currentType,
              'opacity-50': currentType && p.type !== currentType,
            },
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
