import { useTypeChecker } from './state/TypeCheckerProvider'

export default function TypeInfo() {
  const { selectedTypes } = useTypeChecker()


  return (
    <div className='grid grid-cols-2 gap-4 p-6'>
      {JSON.stringify(selectedTypes)}
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