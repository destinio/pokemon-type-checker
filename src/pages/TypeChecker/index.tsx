import TypeButtons from '../../components/TypeButtons'
import TypeInfo from '../../components/TypeInfo'
import { TypeCheckerProvider } from './context/TypeCheckerProvider'

export default function TypeChecker() {
  return (
    <TypeCheckerProvider>
      <TypeButtons />
      <TypeInfo />
    </TypeCheckerProvider>
  )
}
