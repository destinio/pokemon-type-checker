import React, { useContext, useEffect } from 'react'
import { ITypeInfo, useTypeData } from '../../../hooks/useTypeData'
import { useParams } from 'react-router'

interface ITypeCheckerValues {
  currentType: string | null
  setCurrentType: (type: string) => void
  typeData: ITypeInfo | undefined
  isLoading: boolean
}

const TypeCheckerContext = React.createContext<ITypeCheckerValues>({
  currentType: null,
  setCurrentType: () => {},
  typeData: null!,
  isLoading: true,
})

// eslint-disable-next-line react-refresh/only-export-components
export const useTypeChecker = () =>
  useContext<ITypeCheckerValues>(TypeCheckerContext)

interface ITypeCheckerProps {
  children: React.ReactNode
}

export function TypeCheckerProvider({ children }: ITypeCheckerProps) {
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
    <TypeCheckerContext.Provider value={value}>
      <div>{children}</div>
    </TypeCheckerContext.Provider>
  )
}
