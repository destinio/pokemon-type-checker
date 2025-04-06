import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { usePokemon } from '@/hooks/usePokemon'
import MainLayout from '@/layouts/MainLayout'
import { IPokemon } from '@/types'
import RangeInput from './RangeInput'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultRanges = {
  min: 60,
  max: 200,
}

export default function SizeChartPage() {
  const { data: pokemon } = usePokemon()

  const [localPokemon, setLocalPokemon] = useState<IPokemon[]>(null!)
  const [ranges, setRanges] = useState(defaultRanges)

  useEffect(() => {
    if (pokemon) {
      const sorted = pokemon
        .sort((a, b) => a.height - b.height)
        .filter(p => p.height >= ranges.min && p.height <= ranges.max)

      setLocalPokemon(sorted)
    }
  }, [pokemon])

  if (!pokemon || !localPokemon) {
    return <MainLayout>Loading...</MainLayout>
  }

  const labels = localPokemon.map(p => p.name)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Height',
        data: localPokemon.map(p => p.height),
        backgroundColor: 'rgba(7, 89, 133, 1)', // Tailwind sky-800
        borderColor: 'rgba(56, 189, 248, 1)', // Tailwind sky-400
        borderWidth: 1,
      },
    ],
  }

  function handleRangeChange(e: BaseSyntheticEvent) {
    const { name, value } = e.target

    setRanges(prev => ({
      ...prev,
      [name]: Number(value),
    }))

    if (!pokemon) return

    const filtered = pokemon.filter(
      p => p.height >= ranges.min && p.height <= ranges.max
    )

    setLocalPokemon(filtered)
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Pokemon by height',
        color: 'white',
        font: {
          size: 20,
        },
      },
      legend: {
        display: false,
      },
    },
  }

  return (
    <div>
      <Bar data={chartData} options={options} className="mb-8" />
      <div className="flex gap-8 justify-around">
        <div>
          <h3>min</h3>
          <RangeInput onChange={handleRangeChange} defaultValue={ranges.min} />
        </div>
        <div>
          <h3>max</h3>
          <RangeInput
            max
            onChange={handleRangeChange}
            defaultValue={ranges.max}
          />
        </div>
      </div>
    </div>
  )
}
