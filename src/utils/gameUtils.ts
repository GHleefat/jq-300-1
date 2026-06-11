import { MOVE_TIME_COST } from '../data/gameData'
import type { EatenRecord, GameResult } from '../types/game'
import { MAX_STOMACH, OVEREAT_THRESHOLD } from '../data/gameData'

export function manhattanDistance(
  from: { x: number; y: number },
  to: { x: number; y: number }
): number {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y)
}

export function calculateMoveTime(
  from: { x: number; y: number },
  to: { x: number; y: number }
): number {
  return manhattanDistance(from, to) * MOVE_TIME_COST
}

export function calculateScore(
  records: EatenRecord[],
  ticketPrice: number,
  finalStomach: number
): GameResult {
  const totalValue = records.reduce((sum, r) => sum + r.food.price * r.quantity, 0)
  const totalSatiety = records.reduce((sum, r) => sum + r.food.satiety * r.quantity, 0)

  const baseScore = Math.floor(totalValue)
  const isWin = totalValue > ticketPrice
  const valueBonus = isWin ? Math.floor((totalValue - ticketPrice) * 2) : 0
  const overeatPenalty = finalStomach > OVEREAT_THRESHOLD
    ? Math.floor((finalStomach - OVEREAT_THRESHOLD) * 10)
    : 0

  const totalScore = baseScore + valueBonus - overeatPenalty

  return {
    isWin,
    totalScore: Math.max(0, totalScore),
    breakdown: {
      baseScore,
      valueBonus,
      overeatPenalty,
    },
    eatenRecords: records,
    totalValue,
    ticketPrice,
    finalStomach: Math.min(finalStomach, MAX_STOMACH),
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function getStomachLevel(stomach: number): 'low' | 'medium' | 'high' | 'full' {
  if (stomach < 30) return 'low'
  if (stomach < 60) return 'medium'
  if (stomach < 90) return 'high'
  return 'full'
}
