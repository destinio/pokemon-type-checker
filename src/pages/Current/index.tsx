import { Link } from 'react-router'
import { useCurrentRaids } from '../../hooks/useCurrentRaids'
import { usePokemon } from '../../hooks/usePokemon'

export default function Current() {
  const { data: currentRaids } = useCurrentRaids()
  const { data: pokemon } = usePokemon()

  if (!currentRaids || !pokemon) {
    return <div className="max-w-lg m-auto p-4">Loading...</div>
  }

  console.log(currentRaids)

  const currentRaidsWithBosses = currentRaids.map(raid => ({
    ...raid,
    bosses: raid.bosses.map(boss => {
      const noMega = boss.name.replace(/mega/i, '').trim()
      const bossName = noMega.toLowerCase().replace(/\s+/g, '-')

      const found = pokemon.find(p => p.name.toLowerCase() === bossName)
      return {
        ...boss,
        info: found,
      }
    }),
  }))

  console.log('Current Raids:', currentRaidsWithBosses)

  return (
    <div>
      <div>
        {currentRaids
          ? currentRaidsWithBosses.map(raid => (
              <div key={raid.tier} className="p-4">
                <h2 className="text-2xl mb-4">{raid.tier}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {raid.bosses.map(boss => (
                    <Link to={`/pokemon/${boss.info?.id}`} key={boss.name}>
                      <div
                        key={boss.name}
                        style={{ backgroundImage: `url(${boss.info?.image})` }}
                        className="p-2 border-2 border-slate-700 rounded-sm bg-right-top bg-no-repeat"
                      >
                        <h3 className="pb-16">{boss.name}</h3>
                        <p>CP: {boss.mainCP}</p>
                        <p>Boosted CP: {boss.boostedCP}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
