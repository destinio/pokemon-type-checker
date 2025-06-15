import { useTypeData } from '@/hooks/useTypeData';
import { createContext, useContext, useState, ReactNode } from 'react';

type TypeCheckerContextType = {
  selectedTypes: string[];
  toggleType: (type: string) => void;
};

const TypeCheckerContext = createContext<TypeCheckerContextType | undefined>(undefined);

export const TypeCheckerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { data: dmgRealationships } = useTypeData(selectedTypes)

  console.log('response from useTypeData:', dmgRealationships);

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

  const value = { selectedTypes, toggleType }

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