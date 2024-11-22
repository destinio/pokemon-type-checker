import React, { useContext, useEffect, useState } from 'react'

export const LS_KEY = 'pokeGameSupport'

export interface IPokemon {
  id: number
  name: string
}

export interface INameUrl {
  name: string
  url: string
}

interface IName {
  name: string
  language: INameUrl
}

export interface IGeneration {
  abilities: INameUrl[]
  id: number
  main_region: INameUrl
  moves: INameUrl[]
  name: string
  names: IName[]
  pokemon_species: INameUrl[]
  types: INameUrl[]
  version_groups: INameUrl[]
}

// Start of the context : move the above interfaces to a separate file :point_up:

interface IAppValues {
  settings: ILocalStorageSettings
  handleSetGeneration: (id: number) => void
  appLoading: boolean
  isSettingsOpen?: boolean
  toggleSettings: () => void
}

const AppContext = React.createContext<IAppValues>(null!)

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)

interface IAppProps {
  children: React.ReactNode
}

export interface ILocalStorageSettings {
  pokeBox: IPokemon[]
  selectedGeneration: IGeneration | null
  lastUpdated: number
}

const SETTING_KEYS = {
  pokeBox: 'pokeBox',
  selectedGeneration: 'selectedGeneration',
}

export function AppProvider({ children }: IAppProps) {
  const [appLoading, setAppLoading] = useState(true)
  const [settings, setSettings] = useState<ILocalStorageSettings>(null!)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const localPokeSettings = localStorage.getItem(LS_KEY)

    if (!localPokeSettings) {
      const defaultSettings = {
        pokeBox: [],
        selectedGeneration: null,
        lastUpdated: Date.now(),
      } as ILocalStorageSettings

      localStorage.setItem(LS_KEY, JSON.stringify(defaultSettings))
      setSettings(defaultSettings)
    } else {
      setSettings(JSON.parse(localPokeSettings))
    }

    setAppLoading(false)
  }, [])

  function handleUpdateSettings({
    key,
    value,
  }: {
    key: string
    value: unknown
  }) {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value }
      localStorage.setItem(LS_KEY, JSON.stringify(newSettings))
      return newSettings
    })
  }

  async function handleSetGeneration(id?: number) {
    if (!id) {
      handleUpdateSettings({
        key: SETTING_KEYS.selectedGeneration,
        value: null,
      })
      return
    }

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/generation/${id}`)

      if (!res.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await res.json()

      handleUpdateSettings({
        key: SETTING_KEYS.selectedGeneration,
        value: data,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const value = {
    settings,
    handleSetGeneration,
    appLoading,
    isSettingsOpen,
    toggleSettings: () => setIsSettingsOpen(prev => !prev),
  } as IAppValues

  return (
    <AppContext.Provider value={value}>
      <div>{children}</div>
    </AppContext.Provider>
  )
}
