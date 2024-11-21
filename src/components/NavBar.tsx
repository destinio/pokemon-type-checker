import { FaGithub } from 'react-icons/fa'

export default function NavBar() {
  return (
    <div className='max-w-lg m-auto p-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Pokemon Type Check</h1>
      <nav className='text-3xl'>
        <a href='https://github.com/destinio/pokemon-type-checker'>
          <FaGithub className='hover:scale-105 hover:text-sky-300' />
        </a>
      </nav>
    </div>
  )
}
