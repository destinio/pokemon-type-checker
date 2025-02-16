import { getTypeInfo } from '../data/types'
import TypeIconOld from './TypeIconOld'

interface ITypeButtonProps {
  type: string
}

export default function TypeButton({ type }: ITypeButtonProps) {
  const foundType = getTypeInfo(type)

  if (!foundType) return null

  return <TypeIconOld type={type} />
}
