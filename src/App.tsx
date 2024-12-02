import { Route, Routes } from 'react-router'
import './App.css'
import NavBar from './components/NavBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TypeChecker from './pages/TypeChecker'
import Search from './pages/Search'
import PokemonInfo from './pages/Pokemon'
import Home from './pages/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen flex flex-col'>
        <NavBar />
        <div className='flex-1 overflow-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/typecheck/:id?' element={<TypeChecker />} />
            <Route path='/search' element={<Search />} />
            <Route path='/pokemon/:id' element={<PokemonInfo />} />
          </Routes>
        </div>
        <footer className='max-w-lg m-auto text-xs p-4 px-16 pt-2 pb-8 text-center'>
          This website is not produced, endorsed, supported, or affiliated with
          Nintendo or The Pokémon Company.
        </footer>
      </div>
    </QueryClientProvider>
  )
}

export default App
