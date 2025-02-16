import { useTypeSelector } from '../../components/TypeSelector/context'

export default function Results() {
  const { currentTypes, setCurrentTypes } = useTypeSelector()

  return (
    <div>
      <h3>{currentTypes}</h3>
      <button onClick={() => setCurrentTypes(null!)}>reset</button>
    </div>
  )
}
