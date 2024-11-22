import TypeButtons from '../../components/TypeButtons'
import TypeInfo from '../../components/TypeInfo'
import { TypeCheckerProvider } from './context/TypeCheckerProvider'

export default function TypeChecker() {
  return (
    <TypeCheckerProvider>
      <div className='max-w-lg m-auto p-4'>
        <TypeButtons />
        <TypeInfo />
      </div>
    </TypeCheckerProvider>
  )
}
