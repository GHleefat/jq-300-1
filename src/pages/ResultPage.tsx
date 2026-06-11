import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, XCircle, RotateCcw, Home, TrendingUp, AlertTriangle } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import { calculateScore } from '../utils/gameUtils'

function Confetti() {
  const colors = ['#FF6B35', '#4ECDC4', '#F72585', '#80B918', '#4895EF', '#FFD93D']
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-sm animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.8}s`,
            animationDuration: `${1 + Math.random()}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export function ResultPage() {
  const navigate = useNavigate()
  const { eatenRecords, totalValue, ticketPrice, stomachCapacity, resetGame } = useGameStore()

  const result = useMemo(
    () => calculateScore(eatenRecords, ticketPrice, stomachCapacity),
    [eatenRecords, ticketPrice, stomachCapacity]
  )

  const handleReplay = () => {
    resetGame()
    navigate('/')
  }

  const handleTryAgain = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
      {result.isWin && <Confetti />}

      <div className="w-full max-w-xl relative z-10">
        <div className={`text-center mb-6 p-6 rounded-3xl animate-pop-in
          ${result.isWin
            ? 'bg-gradient-to-br from-success/20 to-green-100 border-4 border-success/30'
            : 'bg-gradient-to-br from-danger/10 to-red-50 border-4 border-danger/20'
          }`}>
          <div className="text-6xl mb-4">
            {result.isWin ? '🎉' : '😢'}
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold font-display mb-2
            ${result.isWin ? 'text-success' : 'text-danger'}`}>
            {result.isWin ? '吃回本了！' : '没吃回本…'}
          </h1>
          <p className="text-gray-600">
            {result.isWin
              ? '恭喜你成功给老板上了一课！'
              : '再接再厉，下次一定能吃回来！'}
          </p>
        </div>

        <div className="card mb-6 animate-slide-up">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">最终得分</p>
            <p className="text-5xl font-bold font-display text-primary-600">
              {result.totalScore}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-50">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <span className="font-medium text-gray-700">基础分（已吃金额）</span>
              </div>
              <span className="font-bold text-success">+{result.breakdown.baseScore}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">吃回本奖励</span>
              </div>
              <span className={`font-bold ${result.breakdown.valueBonus > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                +{result.breakdown.valueBonus}
              </span>
            </div>

            {result.breakdown.overeatPenalty > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 animate-shake">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-danger" />
                  <span className="font-medium text-gray-700">暴饮暴食扣分</span>
                </div>
                <span className="font-bold text-danger">-{result.breakdown.overeatPenalty}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">已吃金额</p>
              <p className="text-2xl font-bold font-display text-success">¥{result.totalValue}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">门票价格</p>
              <p className="text-2xl font-bold font-display text-purple-600">¥{result.ticketPrice}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">胃容量</p>
              <p className={`text-2xl font-bold font-display ${result.finalStomach >= 90 ? 'text-danger' : 'text-orange-600'}`}>
                {result.finalStomach}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">取餐份数</p>
              <p className="text-2xl font-bold font-display text-primary-600">
                {result.eatenRecords.reduce((s, r) => s + r.quantity, 0)}
              </p>
            </div>
          </div>
        </div>

        {result.eatenRecords.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-bold font-display text-gray-800 mb-4 flex items-center gap-2">
              <span>📋</span> 账单明细
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {result.eatenRecords.map(record => (
                <div key={record.foodId} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                  <span className="text-2xl">{record.food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{record.food.name}</p>
                    <p className="text-xs text-gray-500">¥{record.food.price} × {record.quantity}</p>
                  </div>
                  <p className="font-bold text-success">¥{record.food.price * record.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleTryAgain} className="btn-secondary flex items-center justify-center gap-2">
            <Home className="w-5 h-5" />
            返回首页
          </button>
          <button onClick={handleReplay} className="btn-primary flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5" />
            再来一局
          </button>
        </div>

        {result.isWin && (
          <div className="mt-6 text-center">
            <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2 animate-float" />
            <p className="text-sm text-gray-500">你是真正的自助餐王者！👑</p>
          </div>
        )}
      </div>
    </div>
  )
}
