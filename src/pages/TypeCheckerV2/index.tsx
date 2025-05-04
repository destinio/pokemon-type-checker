import { useState } from "react";
import TypeTextButton from "@/components/TypeUtils/TypeTextButton";
import { getAllPokemonTypeUiInfo } from "@/components/TypeUtils/utils";
import { useTypesData } from "@/hooks/useTypesData";

export default function TypeCheckerV2() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const { data: typeData } = useTypesData(selectedTypes)
  const [combined, types] = typeData || [{}, []]

  console.log('combined', combined)
  console.log('types', types)

  function handleTypeClick(type: string) {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        // Deselect if already selected
        return prev.filter(t => t !== type);
      }
      if (prev.length < 2) {
        // Add if under limit
        return [...prev, type];
      }
      // Otherwise, do nothing
      return prev;
    });
  }

  const allTypes = getAllPokemonTypeUiInfo();

  return (
    <div className="">
      <h1>TCv2</h1>
    <div className="grid grid-cols-4 gap-2">
        {allTypes.map(({ type }) => (
          <TypeTextButton
            key={type}
            inactive={selectedTypes.length > 0 && !selectedTypes.includes(type)}
            disabled={selectedTypes.length >= 2 && !selectedTypes.includes(type)}
            type={type}
            onClick={() => handleTypeClick(type)}
          />
        ))}
      </div>
      <div>
        <h2>Results</h2>
        <div>
          {selectedTypes.map((type) => (
            <div key={type}>
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
