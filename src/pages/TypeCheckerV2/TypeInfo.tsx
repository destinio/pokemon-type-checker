import { convertInfoHeader } from '@/poke-types/types-utils'
import { useTypeChecker } from './state/TypeCheckerProvider'
import TypeIcon from './TypeIcon'

export default function TypeInfo() {
  const { selectedTypes, relationships } = useTypeChecker()

  console.log('TypeInfo', selectedTypes, relationships)

  return (
    <div className='grid grid-cols-2 gap-4'>
      {relationships && Object.entries(relationships).map(([key, value], i) => (
        <div key={`${i}`}>
          <h3 className='text-xl mb-2'>{convertInfoHeader(key)}</h3>
          <div className='flex flex-wrap gap-4'>
            {value.map((v: string, i: number) => (
              <TypeIcon key={i} type={v} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/*
      {Object.entries(TypeInfo.damage_relations).map(([key, value], i) => (
        <div key={`${i}`}>
          <h3 className='text-xl mb-2'>{convertInfoHeader(key)}</h3>
          <div className='flex flex-wrap gap-4'>
            {value.map((v: Info, i: number) => (
              <TypeIcon key={i} type={v.name} />
                          ))}
          </div>
        </div>
      ))}

*/