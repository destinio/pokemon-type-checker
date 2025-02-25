import { FaGithub, FaSearch } from 'react-icons/fa'
import { IoAppsSharp } from 'react-icons/io5'
import { FaCodeCompare } from 'react-icons/fa6'
import { Link, NavigateFunction, useNavigate } from 'react-router'
import { useEffect } from 'react'

function searchHandler(e: Event, nav: NavigateFunction) {
  const { key } = e as KeyboardEvent

  if (key === '/') {
    e.preventDefault()
    nav('/search')
  }
}

export default function NavBar() {
  const navigate = useNavigate()
  useEffect(() => {
    window.addEventListener('keyup', e => searchHandler(e, navigate))
    return () => {
      window.removeEventListener('keyup', e => searchHandler(e, navigate))
    }
  }, [])
  return (
    <div className="max-w-lg m-auto p-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-bold">Pokemon Utils</h1>
      </Link>
      <nav className="text-2xl flex gap-2">
        <Link to="/typecheck">
          <FaCodeCompare />
        </Link>
        <Link to="/search">
          <FaSearch />
        </Link>
        <Link to="/other">
          <IoAppsSharp />
        </Link>
        <a href="https://github.com/destinio/pokemon-type-checker">
          <FaGithub className="hover:scale-105 hover:text-sky-300" />
        </a>
      </nav>
    </div>
  )
}
