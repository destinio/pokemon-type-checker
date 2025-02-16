import MainLayout from '../../layouts/MainLayout'
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
import { usePokemon } from '../../hooks/usePokemon'
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {}

interface IChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
  }[]
}

export default function SizeChartPage() {
  const { data: pokemon } = usePokemon()
  const [chartData, setChartData] = useState<IChartData>(null!)

  useEffect(() => {
    if (pokemon) {
      const labels = pokemon.map(p => p.name)
      const height = pokemon
        .sort((a, b) => a.height - b.height)
        .map(p => p.height)
      const weight = pokemon
        .sort((a, b) => a.weight - b.weight)
        .map(p => p.weight)

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Height',
            data: height,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Weight',
            data: weight,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      }

      setChartData(chartData)
    }
  }, [pokemon])

  return (
    <MainLayout>
      <h2>Pokemon by height</h2>
      {chartData && <Bar data={chartData} options={options} />}
    </MainLayout>
  )
}
