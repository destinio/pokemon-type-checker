import React, { useContext, useEffect } from 'react'
import { ITypeInfo, useTypesData } from '../../hooks/useTypesData'

interface ITypeSelectorValues {
  currentTypes: string[] | null
  setCurrentTypes: (types: string[]) => void
  typesData: ITypeInfo[] | undefined
  isLoading: boolean
}

const TypeSelectorContext = React.createContext<ITypeSelectorValues>(null!)

// eslint-disable-next-line react-refresh/only-export-components
export const useTypeSelector = () =>
  useContext<ITypeSelectorValues>(TypeSelectorContext)

interface ITypeSelectorProps {
  children: React.ReactNode
}

export function TypeSelectorProvider({ children }: ITypeSelectorProps) {
  const [currentTypes, setCurrentTypes] = React.useState<string[]>(null!)

  const [typesData, setTypesData] = React.useState<ITypeInfo[] | undefined>(
    null!
  )

  const { data, isFetching, isLoading } = useTypesData(currentTypes)

  useEffect(() => {
    if (data) {
      setTypesData(data)
    }
  }, [data])

  const value = {
    currentTypes: currentTypes,
    setCurrentTypes,
    typesData,
    isLoading: isFetching || isLoading,
  }

  return (
    <TypeSelectorContext.Provider value={value}>
      <div>{children}</div>
    </TypeSelectorContext.Provider>
  )
}
