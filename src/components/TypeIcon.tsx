import {
  FaFistRaised,
  FaMountain,
  FaMoon,
  FaDragon,
  FaBug,
  FaGhost,
  FaFireAlt,
  FaEye,
  FaSnowflake,
} from 'react-icons/fa'
import {
  GiLibertyWing,
  GiFairy,
  GiSpill,
  GiStoneBlock,
  GiMetalBar,
  GiWaterDrop,
  GiHighGrass,
  GiElectric,
} from 'react-icons/gi'
import { MdStars } from 'react-icons/md'
import { useTypeChecker } from '../pages/TypeChecker/context/TypeCheckerProvider'

// eslint-disable-next-line react-refresh/only-export-components
export const pokemonTypesIcons = [
  {
    type: 'normal',
    color: '#CC9',
    icon: <MdStars />,
  },
  {
    type: 'fighting',
    color: '#BB5544',
    icon: <FaFistRaised />,
  },
  {
    type: 'flying',
    color: '#8899FF',
    icon: <GiLibertyWing />,
  },
  {
    type: 'poison',
    color: '#CD66B8',
    icon: <GiSpill />,
  },
  {
    type: 'ground',
    color: '#DDBB54',
    icon: <FaMountain />,
  },
  {
    type: 'rock',
    color: '#BBAA66',
    icon: <GiStoneBlock />,
  },
  {
    type: 'bug',
    color: '#AABB22',
    icon: <FaBug />,
  },
  {
    type: 'ghost',
    color: '#7575D6',
    icon: <FaGhost />,
  },
  {
    type: 'steel',
    color: '#AAAABB',
    icon: <GiMetalBar />,
  },
  {
    type: 'fire',
    color: '#FF4522',
    icon: <FaFireAlt />,
  },
  {
    type: 'water',
    color: '#3399FF',
    icon: <GiWaterDrop />,
  },
  {
    type: 'grass',
    color: '#77CC55',
    icon: <GiHighGrass />,
  },
  {
    type: 'electric',
    color: '#FFCC33',
    icon: <GiElectric />,
  },
  {
    type: 'psychic',
    color: '#FF5599',
    icon: <FaEye />,
  },
  {
    type: 'ice',
    color: '#66CCFF',
    icon: <FaSnowflake />,
  },
  {
    type: 'dragon',
    color: '#7766EE',
    icon: <FaDragon />,
  },
  {
    type: 'dark',
    color: '#C58D70',
    icon: <FaMoon />,
  },
  {
    type: 'fairy',
    color: '#EE99EE',
    icon: <GiFairy />,
  },
]

export const getTypeByName = (name: string) => {
  return pokemonTypesIcons.find(t => t.type === name) || pokemonTypesIcons[0]
}

interface ITypeIconProps {
  type: string
}

export default function TypeIcon({ type }: ITypeIconProps) {
  const pokemonType = pokemonTypesIcons.find(t => t.type === type)

  const { setCurrentType } = useTypeChecker()

  if (!pokemonType) {
    return null
  }

  return (
    <div
      title={type}
      className='text-4xl cursor-pointer hover:scale-110'
      style={{ color: pokemonType.color }}
      onClick={() => setCurrentType(type)}
    >
      {pokemonType.icon}
    </div>
  )
}
