import classNames from 'classnames'
import { pokemonTypesIcons } from './TypeIcon'

export default function TypeButtons() {
  const shadow = '1px 1px 2px rgba(0,0,0,.7)'

  return (
    <div className="grid grid-cols-4 gap-2">
      {pokemonTypesIcons.map((p, i) => (
        <button
          key={`${p.type}-${i}`}
          className={classNames(
            'p-2 rounded-sm border border-black overflow-hidden text-xl hover:opacity-100 hover:scale-105'
          )}
          style={{ backgroundColor: p.color, textShadow: shadow }}
          name={p.type}
        >
          {p.type}
        </button>
      ))}
    </div>
  )
}
