import { TypeSelectorProvider } from '../../components/TypeSelector/context'
import TypeButtons from '../../components/TypeSelector/TypeButtons'
import MainLayout from '../../layouts/MainLayout'
import Results from './Results'

export default function TypeQuizApp() {
  return (
    <MainLayout>
      <TypeSelectorProvider>
        <TypeButtons />
        <Results />
      </TypeSelectorProvider>
    </MainLayout>
  )
}
