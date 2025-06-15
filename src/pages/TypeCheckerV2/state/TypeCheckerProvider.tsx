import { ICompiledDamageRelations, IDamageRelationsSimplified, useTypeData } from '@/hooks/useTypeData';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type TypeCheckerContextType = {
  selectedTypes: string[];
  relationships: ICompiledDamageRelations | null;
  toggleType: (type: string) => void;
};

const TypeCheckerContext = createContext<TypeCheckerContextType | undefined>(undefined);

export const TypeCheckerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [relationships, setRelationships] = useState<ICompiledDamageRelations>(null!);

  const { data } = useTypeData(selectedTypes)

  useEffect(() => {
    if (data) {
      const { relationships } = data;

      setRelationships(relationships);
    }
  }, [data]);

  console.log(data);

  function toggleType(type: string) {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else if (prev.length < 2) {
        return [...prev, type];
      }
      return prev;
    });
  }

  const value = { selectedTypes, toggleType, relationships };

  return (
    <TypeCheckerContext.Provider value={value}>
      {children}
    </TypeCheckerContext.Provider>
  );
};

export const useTypeChecker = () => {
  const context = useContext(TypeCheckerContext);
  if (!context) {
    throw new Error('useTypeChecker must be used within a TypeCheckerProvider');
  }
  return context;
};