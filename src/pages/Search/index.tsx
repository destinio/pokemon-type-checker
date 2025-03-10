import { BaseSyntheticEvent, useState } from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { usePokemon } from '../../hooks/usePokemon'
import { IPokemon } from '../../types'

//TODO: Move to utils
/** Check if a string is an integer */
function isInt(value: string) {
  return !isNaN(Number(value)) && Number.isInteger(Number(value))
}

export default function Search() {
  const nav = useNavigate()

  const { data, isLoading, isFetching } = usePokemon()

  // const searchRef = useRef<HTMLInputElement>(null!)
  const searchRef = (element: HTMLInputElement | null) => {
    if (element) {
      element.focus()
    }
  }

  const [filtered, setFiltered] = useState<IPokemon[]>(null!)

  if (isLoading || isFetching) {
    return <div className="max-w-lg m-auto p-4">Loading...</div>
  }

  if (!data) {
    return <div className="max-w-lg m-auto p-4">No Data!</div>
  }

  const handleSearchChange = (e: BaseSyntheticEvent) => {
    const search = e.target.value.toLowerCase()

    if (isInt(search)) {
      const id = Number(search)
      const found = data.find(p => p.id === id)
      if (found) {
        setFiltered([found])
        return
      }
    }

    if (!search || search.length < 2) {
      setFiltered(null!)
      return
    }
    const filtered = data.filter(p => p.name.includes(search))
    setFiltered(filtered)
  }

  const handlePokemonClick = (id: number) => {
    nav(`/pokemon/${id}`)
  }

  return (
    <div className="py-8">
      <input
        type="text"
        ref={searchRef}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded bg-transparent mb-8"
        placeholder={data ? `pokemon name or id` : 'Loading...'}
        disabled={!data}
      />
      {filtered ? (
        <div
          className="flex flex-col gap-2 overflow-auto"
          style={{ height: 500 }}
        >
          {filtered.map(p => (
            <button
              key={p.id}
              className="flex justify-between items-center cursor-pointer hover:border-orange-400 focus:outline-orange-400 focus:outline-offset-1 pr-4 border-2 rounded-sm"
              onClick={() => handlePokemonClick(p.id)}
            >
              <div className="flex items-center ">
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ display: 'none' }}
                  onLoad={e => {
                    const target = e.currentTarget as HTMLImageElement

                    target.style.display = 'block'
                    target.nextSibling?.remove()
                  }}
                />
                <div className="loader h-28 w-28 grid place-content-center">
                  <MdCatchingPokemon className="text-4xl text-slate-400 animate-spin" />
                </div>
                <h3 className="text-3xl">{p.name}</h3>
              </div>
              <div className="text-slate-400 font-extrabold text-3xl">
                # {p.id}
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
