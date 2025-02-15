import { createContext, useState } from "react";
import TypeButtonsV2 from "../TypeButtonsV2";
import { useTypeSelect } from "../../hooks/useTypeSelect";

interface ITypeSelectValues {
  currentType: string;
}

export const typeSelectContext = createContext<ITypeSelectValues>(null!);

export function TypeSelect({ children }: { children?: React.ReactNode }) {
  const [currentType, setCurrentType] = useState<string>(null!);

  const returnValue = { currentType };

  return (
    <typeSelectContext.Provider value={returnValue}>
      <TypeButtonsV2
        currentType={currentType}
        setCurrentType={setCurrentType}
      />
      {children ? children : null}
    </typeSelectContext.Provider>
  );
}

TypeSelect.Title = function TypeSelectTitle() {
  const { currentType } = useTypeSelect();
  return (
    <div className="text-3xl text-sky-400 font-bold">
      {currentType ? currentType : "Select a type"}
    </div>
  );
};

TypeSelect.Content = function TypeSelectContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
};
