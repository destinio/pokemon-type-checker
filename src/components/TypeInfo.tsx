import { Info, convertInfoHeader } from '../data/types'
import { useTypeChecker } from '../pages/TypeChecker/context/TypeCheckerProvider'
import DelayedLoader from './DelayedLoader'
import TypeIcon from './TypeIcon'

export default function TypeInfo() {
  const { typeData: typeInfo, isLoading } = useTypeChecker()

  if (!typeInfo) return null

  if (isLoading)
    return (
      <div className='grid place-items-center text-6xl h-32'>
        <DelayedLoader />
      </div>
    )

  return (
    <div className='grid grid-cols-2 gap-4 p-6'>
      {Object.entries(typeInfo.damage_relations).map(([key, value], i) => (
        <div key={`${i}`}>
          <h3 className='text-xl mb-2'>{convertInfoHeader(key)}</h3>
          <div className='flex flex-wrap gap-4'>
            {value.map((v: Info, i: number) => (
              <TypeIcon key={i} type={v.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
