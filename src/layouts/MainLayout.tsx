import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="max-w-lg m-auto px-4 flex flex-col justify-between min-h-screen">
      <div className="flex-1">{children}</div>
      <div className="flex-0 py-4 text-center text-sm text-gray-400">
        This website is not produced, endorsed, supported, or affiliated with
        Nintendo or The Pokémon Company.
      </div>
    </div>
  )
}
