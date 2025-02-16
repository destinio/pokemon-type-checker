import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { ITypeInfo, useTypeData } from '../../hooks/useTypeData'

interface ITypeSelectorValues {
  currentType: string | null
  setCurrentType: (type: string) => void
  typeData: ITypeInfo | undefined
  isLoading: boolean
}

const TypeSelectorContext = React.createContext<ITypeSelectorValues>({
  currentType: null,
  setCurrentType: () => {},
  typeData: null!,
  isLoading: true,
})

// eslint-disable-next-line react-refresh/only-export-components
export const useTypeSelector = () =>
  useContext<ITypeSelectorValues>(TypeSelectorContext)

interface ITypeSelectorProps {
  children: React.ReactNode
}

export function TypeSelectorProvider({ children }: ITypeSelectorProps) {
  const { id } = useParams()
  const [currentType, setCurrentType] = React.useState<string>(null!)
  const [typeData, setTypeData] = React.useState<ITypeInfo | undefined>(null!)

  const { data, isFetching, isLoading } = useTypeData(currentType)

  useEffect(() => {
    if (id) {
      setCurrentType(id)
    }
  }, [id])

  useEffect(() => {
    setTypeData(data)
  }, [data])

  const value = {
    currentType,
    setCurrentType,
    typeData,
    isLoading: isFetching || isLoading,
  }

  return (
    <TypeSelectorContext.Provider value={value}>
      <div>{children}</div>
    </TypeSelectorContext.Provider>
  )
}
