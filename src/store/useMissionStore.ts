import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MISSIONS, SURPRISE_MISSIONS } from '../data/missions'
import type { Mission, MissionCategory, MissionDifficulty } from '../data/missions'
import type { UserGoal } from './useUserStore'

// ── Constants ────────────────────────────────────────────────────────────────

const RECENT_WINDOW = 12   // keep last ~3 days of mission IDs (4 per day × 3 days)
export const TOTAL_MISSIONS = MISSIONS.length  // 50

// ── Difficulty distribution by level ─────────────────────────────────────────

function difficultyDistribution(level: number): Record<MissionDifficulty, number> {
  if (level >= 5) return { easy: 0.20, medium: 0.40, hard: 0.40 }
  if (level >= 3) return { easy: 0.40, medium: 0.40, hard: 0.20 }
  return              { easy: 0.70, medium: 0.30, hard: 0.00 }
}

// ── Goal → guaranteed category ────────────────────────────────────────────────

const GOAL_CATEGORY: Record<UserGoal, MissionCategory[]> = {
  'better-focus':    ['focus'],
  'better-sleep':    ['environment'],
  'healthier-habits':['social'],
  'reduce-scrolling':['morning', 'focus'],
  'general':         ['morning', 'focus', 'environment', 'intentional', 'social'],
}

// ── ISO week helper ───────────────────────────────────────────────────────────

function getISOWeek(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

// ── Seeded PRNG ───────────────────────────────────────────────────────────────

function seededRandom(seed: string): () => number {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b)) | 0
    h ^= h >>> 16
    return (h >>> 0) / 0xffffffff
  }
}

// ── Pick one mission by difficulty distribution ───────────────────────────────

function pickOne(
  pool: Mission[],
  distrib: Record<MissionDifficulty, number>,
  rand: () => number
): Mission | null {
  if (pool.length === 0) return null

  const weighted = pool.map((m) => ({ mission: m, weight: distrib[m.difficulty] }))
  const nonZero  = weighted.filter((w) => w.weight > 0)
  const source   = nonZero.length > 0 ? nonZero : weighted

  const total = source.reduce((s, w) => s + w.weight, 0)
  let r = rand() * total
  for (const item of source) {
    r -= item.weight
    if (r <= 0) return item.mission
  }
  return source[source.length - 1].mission
}

// ── Core generation logic ─────────────────────────────────────────────────────

function generateMissionsForDate(
  date: string,
  goal: UserGoal,
  level: number,
  recentIds: string[],
  lastSurpriseWeek: string
): {
  missions: Mission[]
  bonusMission: Mission | null
  surpriseMissionId: string | null
  newLastSurpriseWeek: string
} {
  const rand    = seededRandom(date + goal + String(level))
  const distrib = difficultyDistribution(level)

  // Build pool excluding recently seen missions
  let pool = MISSIONS.filter((m) => !recentIds.includes(m.id))
  if (pool.length < 6) pool = [...MISSIONS]   // safety fallback

  // Ensure at least one mission from goal's preferred category
  const goalCats = GOAL_CATEGORY[goal]
  const goalPool = pool.filter((m) => goalCats.includes(m.category))
  const picked: Mission[] = []

  if (goalPool.length > 0) {
    const m = pickOne(goalPool, distrib, rand)
    if (m) {
      picked.push(m)
      pool = pool.filter((x) => x.id !== m.id)
    }
  }

  // Fill remaining 3 slots (total 4, last is bonus)
  while (picked.length < 4 && pool.length > 0) {
    const m = pickOne(pool, distrib, rand)
    if (!m) break
    picked.push(m)
    pool = pool.filter((x) => x.id !== m.id)
  }

  // Hard fallback if pool ran dry
  while (picked.length < 4) {
    const fallback = MISSIONS.find((m) => !picked.some((p) => p.id === m.id))
    if (fallback) picked.push(fallback)
    else break
  }

  // Surprise mission check — once per ISO week, on a seeded random day
  const thisWeek  = getISOWeek(date)
  const isNewWeek = thisWeek !== lastSurpriseWeek

  let surpriseMissionId: string | null = null
  let newLastSurpriseWeek = lastSurpriseWeek

  if (isNewWeek && SURPRISE_MISSIONS.length > 0) {
    const weekRand    = seededRandom(thisWeek)
    const surpriseDow = Math.floor(weekRand() * 7)
    const todayDow    = new Date(date + 'T00:00:00').getDay()

    if (surpriseDow === todayDow) {
      const si              = Math.floor(rand() * SURPRISE_MISSIONS.length)
      surpriseMissionId     = SURPRISE_MISSIONS[si].id
      newLastSurpriseWeek   = thisWeek
    }
  }

  return {
    missions:           picked.slice(0, 3),
    bonusMission:       picked[3] ?? null,
    surpriseMissionId,
    newLastSurpriseWeek,
  }
}

// ── Store types ───────────────────────────────────────────────────────────────

export interface CompletedMission {
  missionId: string
  completedAt: string
  evidenceText?: string
}

export interface MissionState {
  date: string
  missions: Mission[]
  bonusMission: Mission | null
  bonusUnlocked: boolean
  completed: CompletedMission[]

  // Surprise system
  surpriseMissionId: string | null
  surpriseRevealed: boolean
  lastSurpriseWeek: string

  // Dedup: recent mission IDs (last ~3 days)
  recentMissionIds: string[]

  // Actions
  generateDailyMissions: (goal: UserGoal, level?: number) => void
  completeMission: (missionId: string, evidenceText?: string) => void
  revealSurprise: () => void
  unlockBonus: () => void
  resetForNewDay: (goal: UserGoal, level?: number) => void
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      date: '',
      missions: [],
      bonusMission: null,
      bonusUnlocked: false,
      completed: [],
      surpriseMissionId: null,
      surpriseRevealed: false,
      lastSurpriseWeek: '',
      recentMissionIds: [],

      generateDailyMissions: (goal: UserGoal, level = 1) => {
        const today = todayISO()
        const state = get()

        if (state.date === today && state.missions.length === 3) return

        const { missions, bonusMission, surpriseMissionId, newLastSurpriseWeek } =
          generateMissionsForDate(today, goal, level, state.recentMissionIds, state.lastSurpriseWeek)

        const todayIds         = [...missions.map((m) => m.id), bonusMission?.id].filter(Boolean) as string[]
        const recentMissionIds = [...todayIds, ...state.recentMissionIds].slice(0, RECENT_WINDOW)

        set({
          date: today,
          missions,
          bonusMission,
          bonusUnlocked: false,
          completed: [],
          surpriseMissionId,
          surpriseRevealed: false,
          lastSurpriseWeek: newLastSurpriseWeek,
          recentMissionIds,
        })
      },

      completeMission: (missionId: string, evidenceText?: string) => {
        set((state) => {
          if (state.completed.some((c) => c.missionId === missionId)) return {}

          const entry: CompletedMission = {
            missionId,
            completedAt: new Date().toISOString(),
            ...(evidenceText ? { evidenceText } : {}),
          }

          const completed = [...state.completed, entry]
          const dailyIds  = state.missions.map((m) => m.id)
          const allDone   = dailyIds.every((id) => completed.some((c) => c.missionId === id))

          return { completed, bonusUnlocked: allDone ? true : state.bonusUnlocked }
        })
      },

      revealSurprise: () => set({ surpriseRevealed: true }),

      unlockBonus: () => set({ bonusUnlocked: true }),

      resetForNewDay: (goal: UserGoal, level = 1) => {
        const today = todayISO()
        const state = get()
        const { missions, bonusMission, surpriseMissionId, newLastSurpriseWeek } =
          generateMissionsForDate(today, goal, level, state.recentMissionIds, state.lastSurpriseWeek)

        const todayIds         = [...missions.map((m) => m.id), bonusMission?.id].filter(Boolean) as string[]
        const recentMissionIds = [...todayIds, ...state.recentMissionIds].slice(0, RECENT_WINDOW)

        set({
          date: today, missions, bonusMission,
          bonusUnlocked: false, completed: [],
          surpriseMissionId, surpriseRevealed: false,
          lastSurpriseWeek: newLastSurpriseWeek,
          recentMissionIds,
        })
      },
    }),
    { name: 'unloop-missions' }
  )
)

// ── Derived selectors ─────────────────────────────────────────────────────────

export function isMissionCompleted(completed: CompletedMission[], missionId: string): boolean {
  return completed.some((c) => c.missionId === missionId)
}

export function completedCount(completed: CompletedMission[], missions: Mission[]): number {
  return missions.filter((m) => completed.some((c) => c.missionId === m.id)).length
}
