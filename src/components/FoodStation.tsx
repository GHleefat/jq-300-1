import { useGameStore } from '../store/useGameStore'
import { CATEGORY_COLORS } from '../data/gameData'
import { calculateMoveTime, manhattanDistance } from '../utils/gameUtils'

interface FoodStationProps {
  stationId: string
  isActive: boolean
}

export function FoodStation({ stationId, isActive }: FoodStationProps) {
  const { stations, currentPosition, moveToStation, isMoving, timeRemaining } = useGameStore()
  const station = stations.find(s => s.id === stationId)
  if (!station) return null

  const colors = CATEGORY_COLORS[station.category]
  const distance = manhattanDistance(currentPosition, station.position)
  const moveTime = calculateMoveTime(currentPosition, station.position)
  const isCurrentLocation = distance === 0
  const canReach = moveTime < timeRemaining && !isMoving

  const availableFoods = station.foods.filter(f => f.stock > 0)
  const totalStock = availableFoods.length

  return (
    <button
      onClick={() => !isCurrentLocation && canReach && moveToStation(stationId)}
      disabled={isCurrentLocation || isMoving || !canReach}
      className={`station-tile ${colors.bg} ${colors.border}
        ${isCurrentLocation ? 'ring-4 ring-primary-400 ring-offset-2 scale-105' : ''}
        ${isActive ? 'animate-pulse-fast' : ''}
        ${!isCurrentLocation && canReach ? 'hover:scale-105 hover:shadow-lg' : ''}
        ${(!canReach && !isCurrentLocation) ? 'opacity-50 cursor-not-allowed' : ''}
        aspect-square`}
    >
      <span className="text-3xl md:text-4xl mb-1">
        {station.category === 'seafood' && '🦐'}
        {station.category === 'meat' && '🥩'}
        {station.category === 'staple' && '🍚'}
        {station.category === 'dessert' && '🍰'}
        {station.category === 'drink' && '🥤'}
        {station.category === 'vegetable' && '🥗'}
      </span>
      <span className={`text-xs md:text-sm font-bold ${colors.text} font-display`}>
        {station.name}
      </span>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[10px] text-gray-600 bg-white/60 px-1.5 py-0.5 rounded-full">
          {totalStock}种
        </span>
        {!isCurrentLocation && (
          <span className="text-[10px] text-gray-600 bg-white/60 px-1.5 py-0.5 rounded-full">
            {moveTime}s
          </span>
        )}
      </div>
    </button>
  )
}
