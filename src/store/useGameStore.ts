import { create } from 'zustand'
import type { Difficulty, EatenRecord, Station } from '../types/game'
import {
  STATIONS,
  START_POSITION,
  GAME_DURATION,
  MAX_STOMACH,
} from '../data/gameData'
import { calculateMoveTime } from '../utils/gameUtils'

interface GameStore {
  difficulty: Difficulty
  ticketPrice: number
  timeRemaining: number
  stomachCapacity: number
  totalValue: number
  currentPosition: { x: number; y: number }
  eatenRecords: EatenRecord[]
  stations: Station[]
  isMoving: boolean
  activeStationId: string | null
  isGameEnded: boolean

  setDifficulty: (d: Difficulty) => void
  setTicketPrice: (p: number) => void
  startGame: () => void
  endGame: () => void
  resetGame: () => void
  moveToStation: (stationId: string) => void
  tick: () => void
  pickFood: (foodId: string, stationId: string) => void
  closeStation: () => void
}

function deepCloneStations(): Station[] {
  return STATIONS.map(s => ({
    ...s,
    foods: s.foods.map(f => ({ ...f })),
  }))
}

export const useGameStore = create<GameStore>((set, get) => ({
  difficulty: 'normal',
  ticketPrice: 298,
  timeRemaining: GAME_DURATION.normal,
  stomachCapacity: 0,
  totalValue: 0,
  currentPosition: { ...START_POSITION },
  eatenRecords: [],
  stations: deepCloneStations(),
  isMoving: false,
  activeStationId: null,
  isGameEnded: false,

  setDifficulty: (d) => set({ difficulty: d }),
  setTicketPrice: (p) => set({ ticketPrice: p }),

  startGame: () => {
    const { difficulty } = get()
    set({
      timeRemaining: GAME_DURATION[difficulty],
      stomachCapacity: 0,
      totalValue: 0,
      currentPosition: { ...START_POSITION },
      eatenRecords: [],
      stations: deepCloneStations(),
      isMoving: false,
      activeStationId: null,
      isGameEnded: false,
    })
  },

  endGame: () => set({ isGameEnded: true }),

  resetGame: () => set({
    difficulty: 'normal',
    ticketPrice: 298,
    timeRemaining: GAME_DURATION.normal,
    stomachCapacity: 0,
    totalValue: 0,
    currentPosition: { ...START_POSITION },
    eatenRecords: [],
    stations: deepCloneStations(),
    isMoving: false,
    activeStationId: null,
    isGameEnded: false,
  }),

  tick: () => {
    const { timeRemaining, isGameEnded } = get()
    if (isGameEnded) return
    if (timeRemaining <= 1) {
      set({ timeRemaining: 0, isGameEnded: true })
    } else {
      set({ timeRemaining: timeRemaining - 1 })
    }
  },

  moveToStation: (stationId) => {
    const { stations, currentPosition, timeRemaining, isMoving, isGameEnded } = get()
    if (isMoving || isGameEnded) return

    const station = stations.find(s => s.id === stationId)
    if (!station) return

    const moveTime = calculateMoveTime(currentPosition, station.position)
    if (moveTime >= timeRemaining) {
      set({ timeRemaining: 0, isGameEnded: true })
      return
    }

    set({ isMoving: true, activeStationId: null })

    setTimeout(() => {
      set(state => ({
        currentPosition: station.position,
        timeRemaining: state.timeRemaining - moveTime,
        isMoving: false,
        activeStationId: stationId,
      }))
    }, 400)
  },

  pickFood: (foodId, stationId) => {
    const { stations, stomachCapacity, timeRemaining, eatenRecords, totalValue, isGameEnded } = get()
    if (isGameEnded) return

    const station = stations.find(s => s.id === stationId)
    if (!station) return

    const food = station.foods.find(f => f.id === foodId)
    if (!food || food.stock <= 0) return

    const newSatiety = stomachCapacity + food.satiety
    if (newSatiety > MAX_STOMACH) return
    if (food.timeCost >= timeRemaining) return

    const newStations = stations.map(s => {
      if (s.id !== stationId) return s
      return {
        ...s,
        foods: s.foods.map(f =>
          f.id === foodId ? { ...f, stock: f.stock - 1 } : f
        ),
      }
    })

    const existingRecord = eatenRecords.find(r => r.foodId === foodId)
    let newRecords: EatenRecord[]
    if (existingRecord) {
      newRecords = eatenRecords.map(r =>
        r.foodId === foodId ? { ...r, quantity: r.quantity + 1 } : r
      )
    } else {
      newRecords = [
        ...eatenRecords,
        { foodId, food: { ...food }, quantity: 1, timestamp: Date.now() },
      ]
    }

    const newTime = timeRemaining - food.timeCost
    set({
      stations: newStations,
      stomachCapacity: newSatiety,
      totalValue: totalValue + food.price,
      eatenRecords: newRecords,
      timeRemaining: newTime,
      isGameEnded: newTime <= 0,
    })
  },

  closeStation: () => set({ activeStationId: null }),
}))
