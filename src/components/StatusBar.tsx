import { Clock, UtensilsCrossed, Wallet, Ticket } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { formatTime, getStomachLevel } from '../utils/gameUtils'
import { MAX_STOMACH } from '../data/gameData'

export function StatusBar() {
  const { timeRemaining, stomachCapacity, totalValue, ticketPrice } = useGameStore()

  const timeLow = timeRemaining <= 30
  const stomachLevel = getStomachLevel(stomachCapacity)
  const progressPercent = Math.min((stomachCapacity / MAX_STOMACH) * 100, 100)
  const isWinning = totalValue > ticketPrice

  const stomachColor =
    stomachLevel === 'low' ? 'from-green-400 to-green-500'
    : stomachLevel === 'medium' ? 'from-yellow-400 to-yellow-500'
    : stomachLevel === 'high' ? 'from-orange-400 to-orange-500'
    : 'from-red-500 to-red-600'

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-primary-200/50 p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <div className={`p-2 rounded-xl bg-white shadow-md ${timeLow ? 'animate-pulse-fast' : ''}`}>
            <Clock className={`w-6 h-6 ${timeLow ? 'text-danger' : 'text-blue-600'}`} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">剩余时间</p>
            <p className={`text-2xl font-bold font-display ${timeLow ? 'text-danger animate-pulse' : 'text-blue-700'}`}>
              {formatTime(timeRemaining)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="p-2 rounded-xl bg-white shadow-md">
            <UtensilsCrossed className={`w-6 h-6 ${stomachLevel === 'full' ? 'text-danger' : 'text-orange-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs text-gray-500 font-medium">胃容量</p>
              <p className={`text-sm font-bold ${stomachLevel === 'full' ? 'text-danger' : 'text-orange-700'}`}>
                {stomachCapacity}/{MAX_STOMACH}
              </p>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill bg-gradient-to-r ${stomachColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
          <div className="p-2 rounded-xl bg-white shadow-md">
            <Wallet className={`w-6 h-6 ${isWinning ? 'text-success' : 'text-green-600'}`} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">已吃金额</p>
            <p className={`text-2xl font-bold font-display ${isWinning ? 'text-success' : 'text-green-700'}`}>
              ¥{totalValue}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="p-2 rounded-xl bg-white shadow-md">
            <Ticket className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">门票价格</p>
            <p className="text-2xl font-bold font-display text-purple-700">¥{ticketPrice}</p>
          </div>
        </div>
      </div>

      {isWinning && (
        <div className="mt-3 p-2 rounded-xl bg-success/10 border border-success/30 text-center">
          <span className="text-success font-bold font-display">🎉 已吃回本！继续吃可以赚更多分！</span>
        </div>
      )}
    </div>
  )
}
