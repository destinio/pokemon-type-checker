import { getTypeInfo } from '../data/types'
import TypeIcon from './TypeIcon'

interface ITypeButtonProps {
  type: string
}

export default function TypeButton({ type }: ITypeButtonProps) {
  const foundType = getTypeInfo(type)

  if (!foundType) return null

  return <TypeIcon type={type} />
}
