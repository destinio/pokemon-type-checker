import { createContext, useContext, useState } from "react";
import TypeButtonsV2 from "./TypeButtonsV2";

interface ITypeQuizValues {
  currentSelectedType: string;
  setCurrentSelectedType: (type: string) => void;
}

export const typeQuizContext = createContext<ITypeQuizValues>(null!);

export function useTypeQuiz() {
  return useContext(typeQuizContext);
}

export function TypeQuizApp({ children }: { children: React.ReactNode }) {
  const [currentSelectedType, setCurrentSelectedType] = useState<string>(null!);

  const returnValue = { currentSelectedType, setCurrentSelectedType };

  return (
    <typeQuizContext.Provider value={returnValue}>
      {children}
    </typeQuizContext.Provider>
  );
}

TypeQuizApp.Select = function () {
  const { currentSelectedType, setCurrentSelectedType } = useTypeQuiz();
  return (
    <TypeButtonsV2
      currentType={currentSelectedType}
      setCurrentType={setCurrentSelectedType}
    />
  );
};

TypeQuizApp.Results = function () {
  const { currentSelectedType } = useTypeQuiz();
  return (
    <div>
      {currentSelectedType ? (
        currentSelectedType
      ) : (
        <h2>Please select a type!</h2>
      )}
    </div>
  );
};
