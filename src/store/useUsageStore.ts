import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PauseEntry {
  id: string
  timestamp: string        // ISO
  app: string              // which app they selected
  trigger: string          // why they were opening it
  outcome: 'skip' | 'proceed'
  durationMs: number       // how long they spent on the pause screen
}

interface UsageState {
  pauseLog: PauseEntry[]
  logPause: (entry: Omit<PauseEntry, 'id'>) => void
  clearLog: () => void
}

export const useUsageStore = create<UsageState>()(
  persist(
    (set) => ({
      pauseLog: [],

      logPause: (entry) => set((state) => ({
        pauseLog: [
          ...state.pauseLog,
          { ...entry, id: crypto.randomUUID() },
        ],
      })),

      clearLog: () => set({ pauseLog: [] }),
    }),
    { name: 'unloop-usage' }
  )
)
