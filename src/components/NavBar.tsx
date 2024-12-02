import { FaGithub, FaSearch } from 'react-icons/fa'
import { FaCodeCompare } from 'react-icons/fa6'
import { Link } from 'react-router'

export default function NavBar() {
  return (
    <div className='max-w-lg m-auto p-4 flex justify-between items-center'>
      <Link to='/'>
        <h1 className='text-2xl font-bold'>Pokemon Utils</h1>
      </Link>
      <nav className='text-2xl flex gap-2'>
        <Link to='/typecheck'>
          <FaCodeCompare />
        </Link>
        <Link to='/search'>
          <FaSearch />
        </Link>
        <a href='https://github.com/destinio/pokemon-type-checker'>
          <FaGithub className='hover:scale-105 hover:text-sky-300' />
        </a>
      </nav>
    </div>
  )
}
