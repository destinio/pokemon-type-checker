import './App.css'
import NavBar from './components/NavBar'
import TypeChecker from './pages/TypeChecker'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <div className='max-w-lg m-auto p-4'>
        <TypeChecker />
      </div>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

export default App
