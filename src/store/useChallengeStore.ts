import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ActiveChallenge {
  challengeId: string
  name: string
  startedAt: string      // ISO timestamp
  totalHours: number
}

interface ChallengeState {
  active: ActiveChallenge | null
  startChallenge: (challenge: ActiveChallenge) => void
  stopChallenge: () => void
}

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set) => ({
      active: null,
      startChallenge: (challenge) => set({ active: challenge }),
      stopChallenge: () => set({ active: null }),
    }),
    { name: 'unloop-challenges' }
  )
)

export function getChallengeHour(startedAt: string): number {
  return Math.floor((Date.now() - new Date(startedAt).getTime()) / 3_600_000) + 1
}
