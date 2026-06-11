import { useGameStore } from '../store/useGameStore'
import { CATEGORY_COLORS, RARITY_INFO } from '../data/gameData'
import { calculateMoveTime, manhattanDistance } from '../utils/gameUtils'

interface FoodStationProps {
  stationId: string
  isActive: boolean
}

export function FoodStation({ stationId, isActive }: FoodStationProps) {
  const { stations, currentPosition, moveToStation, isMoving, timeRemaining, recentStockChanges } = useGameStore()
  const station = stations.find(s => s.id === stationId)
  if (!station) return null

  const colors = CATEGORY_COLORS[station.category]
  const distance = manhattanDistance(currentPosition, station.position)
  const moveTime = calculateMoveTime(currentPosition, station.position)
  const isCurrentLocation = distance === 0
  const canReach = moveTime < timeRemaining && !isMoving

  const availableFoods = station.foods.filter(f => f.stock > 0)
  const totalStock = availableFoods.length

  const hasLegendary = station.foods.some(f => f.rarity === 'legendary' && f.stock > 0)
  const hasRare = station.foods.some(f => f.rarity === 'rare' && f.stock > 0)
  const stationChanges = recentStockChanges.filter(c => c.stationId === stationId)
  const hasRecentChange = stationChanges.length > 0

  const lowStockWarning = availableFoods.length <= 2 && station.foods.length > 2

  return (
    <button
      onClick={() => !isCurrentLocation && canReach && moveToStation(stationId)}
      disabled={isCurrentLocation || isMoving || !canReach}
      className={`station-tile ${colors.bg} ${colors.border} relative overflow-hidden
        ${isCurrentLocation ? 'ring-4 ring-primary-400 ring-offset-2 scale-105' : ''}
        ${isActive ? 'animate-pulse-fast' : ''}
        ${!isCurrentLocation && canReach ? 'hover:scale-105 hover:shadow-lg' : ''}
        ${(!canReach && !isCurrentLocation) ? 'opacity-50 cursor-not-allowed' : ''}
        ${lowStockWarning && canReach ? 'animate-shake' : ''}
        aspect-square`}
    >
      {hasLegendary && (
        <div className="absolute -top-1 -right-1 text-lg animate-bounce-slow z-10">
          🔥
        </div>
      )}

      {hasRecentChange && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-danger/20 animate-pulse-fast pointer-events-none" />
      )}

      <span className="text-3xl md:text-4xl mb-1 relative z-0">
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

      {hasRare && !hasLegendary && (
        <div className="absolute bottom-1 right-1 text-xs">
          ⭐
        </div>
      )}

      {lowStockWarning && (
        <div className="absolute top-1 left-1 text-[10px] bg-danger text-white px-1.5 py-0.5 rounded-full font-bold">
          快抢!
        </div>
      )}
    </button>
  )
}
