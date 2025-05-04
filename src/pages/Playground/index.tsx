import { useState } from "react";
import { TypeIcon } from "@/components/TypeUtils/TypeIcon";
import { TypeIconButton } from "@/components/TypeUtils/TypeIconButton";
import TypeTextButton from "@/components/TypeUtils/TypeTextButton";
import { useTypesData } from "@/hooks/useTypesData";

export default function Playground() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const { data: typesData } = useTypesData(selectedTypes)

  console.log('tyeps', typesData)

  function handleTypeClick(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
    <div className="flex gap-10 flex-col items-center  h-screen">
      <h1>TCv2</h1>
      <div className="flex flex-row items-center justify-center">
        <TypeIcon type="normal" />
        <TypeIcon type="fighting" />
        <TypeIcon type="flying" />

      </div>
      <div className="">
        <h2>Type Icon Buttons</h2>
        <TypeIconButton type="normal" onClick={() => {}} />
        <TypeIconButton type="fighting" onClick={() => {}} />
      </div>

      <div className="">
        <h2>Type Text Buttons</h2>
        <TypeTextButton 
          inactive={selectedTypes.length > 0 && !selectedTypes.includes('normal')} 
          type="normal" 
          onClick={() => handleTypeClick('normal')} 
        />
        <TypeTextButton 
          inactive={selectedTypes.length > 0 && !selectedTypes.includes('fighting')} 
          type="fighting" 
          onClick={() => handleTypeClick('fighting')} 
        />
        <TypeTextButton 
          inactive={selectedTypes.length > 0 && !selectedTypes.includes('flying')} 
          type="flying" 
          onClick={() => handleTypeClick('flying')} 
        />
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
