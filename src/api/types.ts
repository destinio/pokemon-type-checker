export async function getTypes(type: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await res.json()

  return data
}
