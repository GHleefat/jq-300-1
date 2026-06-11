import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flag } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { StatusBar } from '../components/StatusBar'
import { RestaurantMap } from '../components/RestaurantMap'
import { FoodModal } from '../components/FoodModal'
import { BillList } from '../components/BillList'

export function GamePage() {
  const navigate = useNavigate()
  const { tick, isGameEnded, endGame } = useGameStore()

  useEffect(() => {
    const timer = setInterval(() => {
      tick()
    }, 1000)
    return () => clearInterval(timer)
  }, [tick])

  useEffect(() => {
    if (isGameEnded) {
      navigate('/result')
    }
  }, [isGameEnded, navigate])

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold font-display text-primary-600">
          🍽️ 自助餐大作战
        </h1>
        <button
          onClick={endGame}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-danger hover:text-danger transition-all"
        >
          <Flag className="w-5 h-5" />
          <span className="font-bold">结束用餐</span>
        </button>
      </div>

      <StatusBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RestaurantMap />
        </div>
        <div>
          <BillList />
        </div>
      </div>

      <FoodModal />
    </div>
  )
}
