import { ITypeInfo } from "@/hooks/useTypeData"

export async function getTypes(types: string[]) {
  const responses = await Promise.all(
    types.map(type =>
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
    )
  )

  responses.forEach(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
  })

  const data = await Promise.all(responses.map(res => res.json()))

  return data as ITypeInfo[]
}