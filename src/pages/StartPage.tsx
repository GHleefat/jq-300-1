import { useNavigate } from 'react-router-dom'
import { Ticket, Clock, UtensilsCrossed, Trophy, Sparkles } from 'lucide-react'
import { useGameStore } from '../store/useGameStore'
import type { Difficulty } from '../types/game'

const TICKET_PRICES = [168, 198, 298, 398, 498, 598]

const DIFFICULTIES: { value: Difficulty; label: string; desc: string; emoji: string }[] = [
  { value: 'easy', label: '轻松模式', desc: '3分钟，慢慢吃', emoji: '😌' },
  { value: 'normal', label: '普通模式', desc: '2分钟，刚刚好', emoji: '😊' },
  { value: 'hard', label: '挑战模式', desc: '90秒，手速要快', emoji: '🔥' },
]

export function StartPage() {
  const navigate = useNavigate()
  const { difficulty, ticketPrice, setDifficulty, setTicketPrice, startGame } = useGameStore()

  const handleStart = () => {
    startGame()
    navigate('/game')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-primary-600 text-shadow mb-2">
              🍽️ 自助餐大作战
            </h1>
            <Sparkles className="absolute -top-4 -right-8 w-8 h-8 text-yellow-500 animate-float" />
            <Sparkles className="absolute -bottom-2 -left-6 w-6 h-6 text-pink-500 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-600 text-lg">吃回本策略游戏 · 限时挑战</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Clock, text: '限时挑战', color: 'text-blue-600', bg: 'from-blue-50 to-blue-100' },
            { icon: UtensilsCrossed, text: '策略取餐', color: 'text-orange-600', bg: 'from-orange-50 to-orange-100' },
            { icon: Trophy, text: '吃回本赢', color: 'text-green-600', bg: 'from-green-50 to-green-100' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-gradient-to-br ${item.bg} text-center animate-pop-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
              <p className={`font-bold font-display ${item.color}`}>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Ticket className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold font-display text-gray-800">选择门票价格</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">门票价格越高，吃回本的难度越大，但成就感也越高！</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {TICKET_PRICES.map(price => (
              <button
                key={price}
                onClick={() => setTicketPrice(price)}
                className={`py-3 rounded-xl font-bold font-display transition-all duration-200
                  ${ticketPrice === price
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 hover:scale-102'
                  }`}
              >
                ¥{price}
              </button>
            ))}
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-bold font-display text-gray-800 mb-4">选择难度</h2>
          <div className="grid grid-cols-3 gap-3">
            {DIFFICULTIES.map(d => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={`p-4 rounded-2xl transition-all duration-200 text-center
                  ${difficulty === d.value
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <span className="text-3xl mb-2 block">{d.emoji}</span>
                <p className={`font-bold font-display ${difficulty === d.value ? 'text-white' : 'text-gray-800'}`}>
                  {d.label}
                </p>
                <p className={`text-xs ${difficulty === d.value ? 'text-white/80' : 'text-gray-500'}`}>
                  {d.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 to-orange-50 mb-8">
          <h3 className="font-bold font-display text-primary-700 mb-3 flex items-center gap-2">
            <span>📖</span> 游戏规则
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              <span>点击餐厅地图上的餐台移动，移动会消耗时间</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              <span>到达餐台后选择取餐，每道菜都有价格、饱腹值和取餐时间</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              <span>胃容量上限 100，吃得太饱会被扣分</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              <span>吃的总金额超过门票价格即为胜利！</span>
            </li>
          </ul>
        </div>

        <button onClick={handleStart} className="btn-primary w-full text-xl py-4">
          🎯 开始挑战！
        </button>
      </div>
    </div>
  )
}
