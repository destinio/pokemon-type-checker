import { useState } from 'react'
import Loader from './Loader'

interface IDealayedLoaderProps {
  delay?: number
}

export default function DelayedLoader({ delay = 750 }: IDealayedLoaderProps) {
  const [showLoader, setShowLoader] = useState(false)

  setTimeout(() => {
    setShowLoader(true)
  }, delay)

  return (
    <div className='grid place-items-center text-6xl h-32'>
      {showLoader ? <Loader /> : null}
    </div>
  )
}
