import { TypeSelectorProvider } from './context'
import TypeButtons from './TypeButtons'
import TypeInfo from './TypeInfo'

export default function TypeSelector() {
  return (
    <TypeSelectorProvider>
      <div className="max-w-lg m-auto">
        <TypeButtons />
        <TypeInfo />
      </div>
    </TypeSelectorProvider>
  )
}
