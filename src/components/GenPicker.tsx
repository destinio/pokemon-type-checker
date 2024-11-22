import { useApp } from '../context/AppProvider'
import { useGenerations } from '../hooks/useGenerations'

export default function GenPicker() {
  const { handleSetGeneration } = useApp()
  const { generations, isLoading } = useGenerations()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!generations) {
    return <p>Something went wrong</p>
  }

  return (
    <div className='max-w-lg m-auto p-4'>
      <h2>What Generation are you play?</h2>
      <div className='grid grid-cols-2 gap-2'>
        <button>all</button>
        {generations.map(gen => (
          <button key={gen.id} onClick={() => handleSetGeneration(gen.id)}>
            {gen.name}
          </button>
        ))}
      </div>
    </div>
  )
}
