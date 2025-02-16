import { BaseSyntheticEvent } from 'react'

interface IRangeInputProps {
  onChange: (e: BaseSyntheticEvent) => void
  defaultValue: number
  max?: boolean
}

export default function RangeInput({
  onChange,
  defaultValue,
  max = false,
}: IRangeInputProps) {
  return (
    <input
      name={max ? 'max' : 'min'}
      max={max ? 200 : undefined}
      min="1"
      onChange={onChange}
      className="text-white p-2 bg-transparent border-b focus:outline-none border-white w-16"
      type="number"
      defaultValue={defaultValue}
    />
  )
}
