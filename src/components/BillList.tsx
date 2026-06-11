import { useGameStore } from '../store/useGameStore'

export function BillList() {
  const { eatenRecords, totalValue } = useGameStore()

  if (eatenRecords.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-bold font-display text-primary-700 mb-3 flex items-center gap-2">
          <span>📋</span> 已取餐记录
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-2">🍽️</p>
          <p>还没有取任何食物，快去餐厅拿点好吃的吧！</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold font-display text-primary-700 mb-3 flex items-center gap-2">
        <span>📋</span> 已取餐记录
        <span className="ml-auto text-sm font-normal text-gray-500">
          共 {eatenRecords.reduce((s, r) => s + r.quantity, 0)} 份
        </span>
      </h3>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {eatenRecords.map(record => (
          <div
            key={record.foodId}
            className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-primary-50 to-white animate-pop-in"
          >
            <span className="text-2xl">{record.food.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{record.food.name}</p>
              <p className="text-xs text-gray-500">
                饱腹 +{record.food.satiety * record.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">x{record.quantity}</p>
              <p className="font-bold text-success">¥{record.food.price * record.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-dashed border-primary-200 flex items-center justify-between">
        <span className="text-gray-600 font-medium">累计价值</span>
        <span className="text-2xl font-bold font-display text-success">¥{totalValue}</span>
      </div>
    </div>
  )
}
