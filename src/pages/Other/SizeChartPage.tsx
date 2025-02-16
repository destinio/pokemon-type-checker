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
import { useEffect } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
}

export default function SizeChartPage() {
  const { data: pokemon } = usePokemon()

  useEffect(() => {
    if (pokemon) {
    }
  }, [pokemon])

  return (
    <MainLayout>
      <h2>Pokemon by height</h2>
    </MainLayout>
  )
}
