import { X, Clock, UtensilsCrossed, Wallet, Package } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { CATEGORY_COLORS, MAX_STOMACH } from '../data/gameData'

export function FoodModal() {
  const { activeStationId, stations, pickFood, closeStation, stomachCapacity, timeRemaining } = useGameStore()

  if (!activeStationId) return null

  const station = stations.find(s => s.id === activeStationId)
  if (!station) return null

  const colors = CATEGORY_COLORS[station.category]

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeStation}
      />

      <div className="relative w-full md:max-w-2xl max-h-[85vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl animate-slide-up overflow-hidden flex flex-col">
        <div className={`p-5 ${colors.bg} border-b-4 ${colors.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {station.category === 'seafood' && '🦐'}
                {station.category === 'meat' && '🥩'}
                {station.category === 'staple' && '🍚'}
                {station.category === 'dessert' && '🍰'}
                {station.category === 'drink' && '🥤'}
                {station.category === 'vegetable' && '🥗'}
              </span>
              <div>
                <h3 className="text-2xl font-bold font-display text-gray-800">{station.name}</h3>
                <p className="text-sm text-gray-600">选择你想吃的美食</p>
              </div>
            </div>
            <button
              onClick={closeStation}
              className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {station.foods.map(food => {
              const isSoldOut = food.stock <= 0
              const willOverflow = stomachCapacity + food.satiety > MAX_STOMACH
              const noTime = food.timeCost >= timeRemaining
              const isDisabled = isSoldOut || willOverflow || noTime

              return (
                <div
                  key={food.id}
                  className={isDisabled ? 'food-card-soldout' : 'food-card'}
                  onClick={() => !isDisabled && pickFood(food.id, station.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-4xl">{food.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 truncate">{food.name}</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                          <Wallet className="w-3 h-3" /> ¥{food.price}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${willOverflow ? 'bg-danger/20 text-danger' : 'bg-orange-100 text-orange-700'}`}>
                          <UtensilsCrossed className="w-3 h-3" /> 饱腹+{food.satiety}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${noTime ? 'bg-danger/20 text-danger' : 'bg-blue-100 text-blue-700'}`}>
                          <Clock className="w-3 h-3" /> {food.timeCost}秒
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${isSoldOut ? 'bg-gray-200 text-gray-500' : 'bg-purple-100 text-purple-700'}`}>
                          <Package className="w-3 h-3" />
                          {isSoldOut ? '已售罄' : `剩余 ${food.stock} 份`}
                        </span>
                        {!isDisabled && (
                          <span className="text-xs font-bold text-primary-600">点击取餐 →</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {(willOverflow || noTime) && !isSoldOut && (
                    <div className="mt-2 p-2 rounded-lg bg-danger/10 text-danger text-xs">
                      {willOverflow && '⚠️ 胃容量不足'}
                      {noTime && '⚠️ 时间不够'}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button onClick={closeStation} className="btn-secondary w-full">
            继续探索餐厅
          </button>
        </div>
      </div>
    </div>
  )
}
