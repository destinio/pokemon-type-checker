import { FaSearch } from 'react-icons/fa'
import { FaCodeCompare } from 'react-icons/fa6'
import { Link } from 'react-router'
import { pokemonTypesIcons } from '../../components/TypeIcon'
import { getTypeByName } from '../../utils/pokemonTypes'

const apps = [
  {
    title: 'Type Checker',
    icon: <FaCodeCompare />,
    description: 'Check the effectiveness of a type against another type',
    route: '/typecheck',
  },
  {
    title: 'Search',
    icon: <FaSearch />,
    description: 'Search for a Pokemon by name or ID',
    route: '/search',
  },
]

const { icon, color } = getTypeByName('electric')

export default function Home() {
  return (
    <div className='max-w-lg m-auto px-4'>
      <div className='m-auto px-8 pb-8 text-center flex flex-col items-center'>
        <img
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png'
          alt=''
          className='w-32 h-32 inline'
        />
        <h1 className='mb-4 text-lg font-bold'>Welcome to Pokemon Utils!</h1>
        <p className='mb-4'>
          This is a collection of tools to help you learn more about Pokemon and
          help with the various games.
        </p>
        <p style={{ color }} className='flex items-center gap-1'>
          {icon} <span>Powered by</span>
          <a
            className='text-lg underline hover:text-orange-300 decoration-dotted underline-offset-4 border-dotted'
            href='https://pokeapi.co/'
          >
            pokeapi.co
          </a>
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        {apps.map((app, i) => (
          <Link
            to={app.route}
            key={i}
            className='p-4 border-2 border-slate-700 rounded-md flex gap-4 items-center hover:border-orange-400 focus:border-orange-400'
          >
            {app.icon}
            <div>
              <h2 className='text-xl font-bold'>{app.title}</h2>
              <p>{app.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
