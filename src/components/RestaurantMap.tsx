import { useGameStore } from '../store/useGameStore'
import { FoodStation } from './FoodStation'
import { Player } from './Player'
import { GRID_SIZE } from '../data/gameData'

export function RestaurantMap() {
  const { stations, currentPosition, activeStationId, isMoving } = useGameStore()

  const grid: (string | null)[][] = Array.from({ length: GRID_SIZE.rows }, () =>
    Array(GRID_SIZE.cols).fill(null)
  )

  stations.forEach(station => {
    grid[station.position.y][station.position.x] = station.id
  })

  return (
    <div className="w-full card mb-6">
      <h2 className="text-xl font-bold font-display text-primary-700 mb-4 flex items-center gap-2">
        <span>🗺️</span> 餐厅平面图
        <span className="text-sm font-normal text-gray-500 ml-auto">点击餐台移动取餐</span>
      </h2>

      <div
        className="relative grid gap-3 md:gap-4 p-4 rounded-3xl bg-gradient-to-br from-primary-50 to-orange-50 grid-pattern border-4 border-primary-100"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: GRID_SIZE.rows }).map((_, rowIdx) =>
          Array.from({ length: GRID_SIZE.cols }).map((__, colIdx) => {
            const stationId = grid[rowIdx][colIdx]
            const isPlayerHere = currentPosition.x === colIdx && currentPosition.y === rowIdx

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="relative aspect-square min-h-[80px] md:min-h-[100px]"
              >
                {stationId ? (
                  <FoodStation
                    stationId={stationId}
                    isActive={activeStationId === stationId}
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl border-2 border-dashed border-primary-200/50 bg-white/30" />
                )}

                {isPlayerHere && (
                  <div className={`absolute inset-0 z-10 transition-all duration-400 ${isMoving ? 'opacity-0' : 'opacity-100'}`}>
                    <Player />
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {[
          { name: '海鲜', color: 'bg-seafood', emoji: '🦐' },
          { name: '肉类', color: 'bg-meat', emoji: '🥩' },
          { name: '主食', color: 'bg-staple', emoji: '🍚' },
          { name: '甜品', color: 'bg-dessert', emoji: '🍰' },
          { name: '饮品', color: 'bg-drink', emoji: '🥤' },
          { name: '素菜', color: 'bg-vegetable', emoji: '🥗' },
        ].map(item => (
          <div key={item.name} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50">
            <span className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-gray-600">{item.emoji} {item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
