import { useState } from "react";
import TypeButtonsV2 from "../../components/TypeButtonsV2";
import { useTypeData } from "../../hooks/useTypeData";

export default function QuizPage() {
  const [selectedTypeOne, setSelectedTypeOne] = useState<string>(null!);

  const { data } = useTypeData(selectedTypeOne);

  console.log(data);
  return (
    <div className="max-w-lg m-auto p-4 flex flex-col gap-8">
      {!selectedTypeOne ? (
        <TypeButtonsV2
          setCurrentType={setSelectedTypeOne}
          currentType={selectedTypeOne}
        />
      ) : null}
      {selectedTypeOne ? (
        <div>
          <header className="flex gap-4">
            <button onClick={() => setSelectedTypeOne(null!)}>back</button>
            <h2>{selectedTypeOne}</h2>
          </header>
        </div>
      ) : null}
    </div>
  );
}
