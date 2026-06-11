import type { Food, Station } from '../types/game'

export const FOODS: Food[] = [
  { id: 'lobster', name: '波士顿龙虾', emoji: '🦞', category: 'seafood', price: 188, satiety: 25, stock: 3, timeCost: 15 },
  { id: 'salmon', name: '三文鱼刺身', emoji: '🍣', category: 'seafood', price: 68, satiety: 15, stock: 8, timeCost: 8 },
  { id: 'oyster', name: '法国生蚝', emoji: '🦪', category: 'seafood', price: 48, satiety: 10, stock: 10, timeCost: 6 },
  { id: 'shrimp', name: '白灼大虾', emoji: '🍤', category: 'seafood', price: 38, satiety: 12, stock: 12, timeCost: 5 },
  { id: 'crab', name: '帝王蟹腿', emoji: '🦀', category: 'seafood', price: 128, satiety: 20, stock: 4, timeCost: 12 },

  { id: 'wagyu', name: '和牛牛排', emoji: '🥩', category: 'meat', price: 158, satiety: 35, stock: 3, timeCost: 18 },
  { id: 'lamb', name: '烤羊排', emoji: '🍖', category: 'meat', price: 88, satiety: 30, stock: 5, timeCost: 12 },
  { id: 'chicken', name: '脆皮烤鸡', emoji: '🍗', category: 'meat', price: 48, satiety: 28, stock: 8, timeCost: 8 },
  { id: 'bacon', name: '培根卷', emoji: '🥓', category: 'meat', price: 28, satiety: 18, stock: 10, timeCost: 5 },

  { id: 'rice', name: '鹅肝炒饭', emoji: '🍚', category: 'staple', price: 38, satiety: 45, stock: 15, timeCost: 6 },
  { id: 'noodle', name: '日式拉面', emoji: '🍜', category: 'staple', price: 32, satiety: 40, stock: 12, timeCost: 8 },
  { id: 'bread', name: '法式面包', emoji: '🥖', category: 'staple', price: 12, satiety: 30, stock: 20, timeCost: 3 },
  { id: 'sushi', name: '寿司拼盘', emoji: '🍱', category: 'staple', price: 58, satiety: 35, stock: 8, timeCost: 10 },

  { id: 'cake', name: '慕斯蛋糕', emoji: '🍰', category: 'dessert', price: 38, satiety: 18, stock: 10, timeCost: 6 },
  { id: 'icecream', name: '哈根达斯', emoji: '🍨', category: 'dessert', price: 48, satiety: 15, stock: 8, timeCost: 5 },
  { id: 'macaron', name: '马卡龙', emoji: '🧁', category: 'dessert', price: 28, satiety: 10, stock: 15, timeCost: 4 },
  { id: 'fruit', name: '鲜果拼盘', emoji: '🍓', category: 'dessert', price: 25, satiety: 12, stock: 15, timeCost: 4 },

  { id: 'wine', name: '红葡萄酒', emoji: '🍷', category: 'drink', price: 88, satiety: 5, stock: 6, timeCost: 6 },
  { id: 'juice', name: '鲜榨果汁', emoji: '🧃', category: 'drink', price: 18, satiety: 8, stock: 20, timeCost: 3 },
  { id: 'coffee', name: '手冲咖啡', emoji: '☕', category: 'drink', price: 28, satiety: 3, stock: 15, timeCost: 4 },
  { id: 'tea', name: '养生花茶', emoji: '🍵', category: 'drink', price: 15, satiety: 2, stock: 25, timeCost: 2 },

  { id: 'salad', name: '凯撒沙拉', emoji: '🥗', category: 'vegetable', price: 22, satiety: 12, stock: 15, timeCost: 4 },
  { id: 'broccoli', name: '蒜蓉西兰花', emoji: '🥦', category: 'vegetable', price: 18, satiety: 10, stock: 18, timeCost: 3 },
  { id: 'mushroom', name: '奶油蘑菇汤', emoji: '🍄', category: 'vegetable', price: 28, satiety: 15, stock: 10, timeCost: 5 },
]

export const STATIONS: Station[] = [
  {
    id: 'seafood-bar',
    name: '海鲜吧',
    category: 'seafood',
    position: { x: 0, y: 0 },
    foods: FOODS.filter(f => f.category === 'seafood'),
  },
  {
    id: 'meat-station',
    name: '烤肉台',
    category: 'meat',
    position: { x: 4, y: 0 },
    foods: FOODS.filter(f => f.category === 'meat'),
  },
  {
    id: 'staple-station',
    name: '主食区',
    category: 'staple',
    position: { x: 0, y: 3 },
    foods: FOODS.filter(f => f.category === 'staple'),
  },
  {
    id: 'dessert-bar',
    name: '甜品站',
    category: 'dessert',
    position: { x: 4, y: 3 },
    foods: FOODS.filter(f => f.category === 'dessert'),
  },
  {
    id: 'drink-bar',
    name: '饮料吧',
    category: 'drink',
    position: { x: 2, y: 0 },
    foods: FOODS.filter(f => f.category === 'drink'),
  },
  {
    id: 'salad-bar',
    name: '沙拉吧',
    category: 'vegetable',
    position: { x: 2, y: 3 },
    foods: FOODS.filter(f => f.category === 'vegetable'),
  },
]

export const GRID_SIZE = { cols: 5, rows: 4 }

export const START_POSITION = { x: 2, y: 1 }

export const GAME_DURATION: Record<string, number> = {
  easy: 180,
  normal: 120,
  hard: 90,
}

export const MAX_STOMACH = 100

export const MOVE_TIME_COST = 3

export const OVEREAT_THRESHOLD = 90

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  seafood: { bg: 'bg-seafood/20', border: 'border-seafood', text: 'text-seafood' },
  meat: { bg: 'bg-meat/20', border: 'border-meat', text: 'text-meat' },
  staple: { bg: 'bg-staple/20', border: 'border-staple', text: 'text-staple' },
  dessert: { bg: 'bg-dessert/20', border: 'border-dessert', text: 'text-dessert' },
  drink: { bg: 'bg-drink/20', border: 'border-drink', text: 'text-drink' },
  vegetable: { bg: 'bg-vegetable/20', border: 'border-vegetable', text: 'text-vegetable' },
}

export const CATEGORY_LABELS: Record<string, string> = {
  seafood: '海鲜',
  meat: '肉类',
  staple: '主食',
  dessert: '甜品',
  drink: '饮品',
  vegetable: '素菜',
}
