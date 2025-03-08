import { useRanks } from "../../hooks/useRanks";
import MainLayout from "../../layouts/MainLayout";

export default function RanksPage() {
  const { data } = useRanks()
  console.log(data)
  return (
    <MainLayout>
      <h1>Rankings</h1>
    </MainLayout>
  )
}