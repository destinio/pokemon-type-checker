import GenPicker from '../../components/GenPicker'
import NavBar from '../../components/NavBar'
import { useApp } from '../../context/AppProvider'
import TypeChecker from '../TypeChecker'
import SettingsPopUp from '../../components/SettingsPopUp'

export default function StartPage() {
  const { settings, appLoading, isSettingsOpen } = useApp()

  if (appLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <NavBar />
      {isSettingsOpen ? <SettingsPopUp /> : null}
      {!settings?.selectedGeneration ? <GenPicker /> : <TypeChecker />}
    </div>
  )
}
