import { useApp } from '../context/AppProvider'

export default function SettingsPopUp() {
  const { settings, toggleSettings, handleSetGeneration } = useApp()

  return (
    <div className='max-w-lg m-auto p-4'>
      <h2 className='font-bold text-2xl mb-4'>Settings</h2>
      <form>
        {settings.selectedGeneration ? (
          <div
            onClick={() => {
              handleSetGeneration(null!)
              toggleSettings()
            }}
          >
            change generation
          </div>
        ) : (
          <div>select gen</div>
        )}
      </form>
      <hr className='my-4 border-dashed border-slate-400' />
    </div>
  )
}
