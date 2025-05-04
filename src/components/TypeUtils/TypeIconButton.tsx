import { TypeIcon } from './TypeIcon'

interface TypeIconButtonProps {
  type: string
  onClick: () => void
}

export function TypeIconButton({ type, onClick }: TypeIconButtonProps) {
  return (
    <button type="button" onClick={onClick} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <TypeIcon type={type} />
    </button>
  )
}
