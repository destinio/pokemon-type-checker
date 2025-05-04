import classNames from 'classnames'
import { getPokemonTypeUiInfo } from './utils'

interface TypeTextButtonProps {
  type: string
  onClick: () => void
  disabled?: boolean
  inactive?: boolean
}

export default function TypeTextButton({ type, onClick, disabled = false, inactive = false }: TypeTextButtonProps) {
  const shadow = '1px 1px 2px rgba(0,0,0,.7)'
  const { color } = getPokemonTypeUiInfo(type)

  return (
    <button
      className={classNames(
        'p-2 rounded-sm border border-black overflow-hidden text-xl hover:opacity-100 hover:scale-105 transition',
        {
          'opacity-50': inactive || disabled,
        }
      )}
      style={{ backgroundColor: color, textShadow: shadow }}
      onClick={onClick}
      name={type}
      type="button"
      disabled={disabled}
    >
      {type}
    </button>
  )
}
