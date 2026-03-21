import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProState {
  isPro: boolean
  setProStatus: (isPro: boolean) => void
}

export const useProStore = create<ProState>()(
  persist(
    (set) => ({
      isPro: false,
      setProStatus: (isPro) => set({ isPro }),
    }),
    { name: 'unloop-pro' }
  )
)
