export type FoodCategory = 'seafood' | 'meat' | 'staple' | 'dessert' | 'drink' | 'vegetable'

export type Difficulty = 'easy' | 'normal' | 'hard'

export type RarityLevel = 'legendary' | 'rare' | 'uncommon' | 'common'

export interface Food {
  id: string
  name: string
  emoji: string
  category: FoodCategory
  price: number
  satiety: number
  stock: number
  timeCost: number
  rarity: RarityLevel
  consumptionRate: number
}

export interface Station {
  id: string
  name: string
  category: FoodCategory
  position: { x: number; y: number }
  foods: Food[]
}

export interface EatenRecord {
  foodId: string
  food: Food
  quantity: number
  timestamp: number
}

export interface GameResult {
  isWin: boolean
  totalScore: number
  breakdown: {
    baseScore: number
    valueBonus: number
    overeatPenalty: number
  }
  eatenRecords: EatenRecord[]
  totalValue: number
  ticketPrice: number
  finalStomach: number
}
