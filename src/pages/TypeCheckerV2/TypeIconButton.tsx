import { getTypeInfo } from '@/poke-types/types-utils'
import TypeIcon from './TypeIcon'

interface ITypeButtonProps {
  type: string
}

export default function TypeIconButton({ type }: ITypeButtonProps) {
  const foundType = getTypeInfo(type)

  if (!foundType) return null

  return <TypeIcon type={type} />
}