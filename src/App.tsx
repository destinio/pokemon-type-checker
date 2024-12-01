import { Route, Routes } from 'react-router'
import './App.css'
import NavBar from './components/NavBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TypeChecker from './pages/TypeChecker'
import Search from './pages/Search'
import PokemonInfo from './pages/Pokemon'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path='/' element={<TypeChecker />} />
        <Route path='/search' element={<Search />} />
        <Route path='/pokemon/:id' element={<PokemonInfo />} />
      </Routes>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default App
