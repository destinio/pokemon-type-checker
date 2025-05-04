import { Route, Routes } from 'react-router'
import './App.css'
import NavBar from './components/NavBar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TypeChecker from './pages/TypeChecker'
import Search from './pages/Search'
import PokemonInfo from './pages/Pokemon'
import Home from './pages/Home'
import OtherAppsPage from './pages/Other'
import SizeChartPage from './pages/Other/SizeChartPage'
import RanksPage from './pages/Ranks'
import MainLayout from './layouts/MainLayout'
import Current from './pages/Current'
import TypeCheckerV2 from './pages/TypeCheckerV2'

const queryClient = new QueryClient()

function App() {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typecheck/:id?" element={<TypeChecker />} />
          <Route path="/typecheckv2/:id?" element={<TypeCheckerV2 />} />
          <Route path="/search" element={<Search />} />
          <Route path="/other" element={<OtherAppsPage />} />
          <Route path="/ranks" element={<RanksPage />} />
          <Route path="/size-chart" element={<SizeChartPage />} />
          <Route path="/current-raids" element={<Current />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
        </Routes>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </MainLayout>
  )
}

export default App
