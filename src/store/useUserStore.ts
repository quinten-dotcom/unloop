import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getLevelFromXP } from '../data/levels'

export interface HumanHour {
  id: string
  start: string  // "HH:MM" 24-hour
  end: string    // "HH:MM" 24-hour
}

export interface EnvironmentDesign {
  chargingSpot: string
  workZone: string
  phoneFreeRooms: string[]
}

export type UserGoal =
  | 'better-focus'
  | 'better-sleep'
  | 'presence'
  | 'mental-clarity'
  | 'general'

export interface UserState {
  // Identity
  userId: string
  name: string
  goal: UserGoal

  // Onboarding
  onboardingComplete: boolean
  triggers: string[]           // e.g. ['social-media', 'gaming']

  // Progression
  xp: number
  level: number
  levelName: string

  // Streaks
  humanStreak: number
  bestStreak: number
  lastActiveDate: string | null

  // Preferences
  grayscaleEnabled: boolean
  notificationsEnabled: boolean
  pauseApps: string[]
  humanModeActive: boolean
  humanModeStartTime: string   // "HH:MM"
  humanModeEndTime: string     // "HH:MM"

  // Aggregate stats
  totalPausesTriggered: number
  totalIntentionalOpens: number
  totalMissionsCompleted: number

  // Weekly XP history — index 0 = 6 days ago, index 6 = today
  weeklyXP: number[]

  // Level history — level number → ISO date it was first reached
  levelHistory: Record<number, string>

  // Human Hours (scheduled phone-free windows)
  humanHours: HumanHour[]

  // Notification preferences
  notifyDailyReminder: boolean
  notifyDailyReminderTime: string
  notifyEveningReflection: boolean
  notifyStreakReminder: boolean

  // Earned milestones
  earnedMilestones: Array<{ id: string; earnedAt: string }>

  // Atomic Habits / identity features
  savedIntentions: string[]           // user's 3 custom intention texts (one per moment: morning/afternoon/evening)
  selectedDecisiveMomentIds: string[] // IDs from DECISIVE_MOMENTS the user selected
  personalIdentityStatement: string   // e.g. "I am someone who focuses deeply on what matters."
  acceptedHabitStacks: string[]       // mission IDs where user accepted the habit stack suggestion
  activeBundleIds: string[]           // IDs from TEMPTATION_BUNDLES the user activated
  environmentDesign: EnvironmentDesign

  // Re-engagement tracking
  lastOpenDate: string | null
  installDate: string
  whyLeftReason: string | null
  reengageNotificationsSent: string[]
  firstWeekMilestonesSent: string[]

  // Actions
  addXP: (amount: number) => void
  completeStreakDay: () => void
  resetStreak: () => void
  setGoal: (goal: UserGoal) => void
  setName: (name: string) => void
  setHumanMode: (value: boolean) => void
  setHumanModeSchedule: (start: string, end: string) => void
  setTriggers: (triggers: string[]) => void
  setOnboardingComplete: () => void
  resetOnboarding: () => void
  addHumanHour: (block: Omit<HumanHour, 'id'>) => void
  removeHumanHour: (id: string) => void
  setNotifyPref: (key: 'notifyDailyReminder' | 'notifyEveningReflection' | 'notifyStreakReminder', value: boolean) => void
  setNotifyTime: (time: string) => void
  earnMilestone: (id: string) => void
  updateStats: (stats: Partial<Pick<UserState,
    | 'totalPausesTriggered'
    | 'totalIntentionalOpens'
    | 'totalMissionsCompleted'
    | 'grayscaleEnabled'
    | 'notificationsEnabled'
    | 'pauseApps'
  >>) => void
  setLastOpenDate: (date: string) => void
  setInstallDate: (date: string) => void
  setWhyLeftReason: (reason: string | null) => void
  markReengageNotification: (key: string) => void
  markFirstWeekMilestone: (key: string) => void

  setSavedIntentions: (intentions: string[]) => void
  setSelectedDecisiveMomentIds: (ids: string[]) => void
  setPersonalIdentityStatement: (statement: string) => void
  addAcceptedHabitStack: (missionId: string) => void
  setActiveBundleIds: (ids: string[]) => void
  setEnvironmentDesign: (design: EnvironmentDesign) => void
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function initialWeeklyXP(): number[] {
  return Array(7).fill(0)
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // ── Initial state ──────────────────────────────────────────────────────
      userId: crypto.randomUUID(),
      name: '',
      goal: 'general',
      onboardingComplete: false,
      triggers: [],

      xp: 0,
      level: 1,
      levelName: 'Autopilot',

      humanStreak: 0,
      bestStreak: 0,
      lastActiveDate: null,

      grayscaleEnabled: false,
      notificationsEnabled: true,
      pauseApps: [],
      humanModeActive: false,
      humanModeStartTime: '09:00',
      humanModeEndTime: '21:00',

      totalPausesTriggered: 0,
      totalIntentionalOpens: 0,
      totalMissionsCompleted: 0,

      weeklyXP: initialWeeklyXP(),
      levelHistory: { 1: todayISO() },

      humanHours: [],
      notifyDailyReminder: true,
      notifyDailyReminderTime: '08:00',
      notifyEveningReflection: true,
      notifyStreakReminder: true,
      earnedMilestones: [],

      lastOpenDate: null,
      installDate: '',
      whyLeftReason: null,
      reengageNotificationsSent: [],
      firstWeekMilestonesSent: [],

      savedIntentions: [],
      selectedDecisiveMomentIds: [],
      personalIdentityStatement: '',
      acceptedHabitStacks: [],
      activeBundleIds: [],
      environmentDesign: { chargingSpot: '', workZone: '', phoneFreeRooms: [] },

      // ── Actions ────────────────────────────────────────────────────────────

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount
          const lvl = getLevelFromXP(newXP)

          const weekly = [...state.weeklyXP]
          weekly[6] = (weekly[6] ?? 0) + amount

          const levelHistory = { ...state.levelHistory }
          if (lvl.level > state.level && !levelHistory[lvl.level]) {
            levelHistory[lvl.level] = todayISO()
          }

          return {
            xp: newXP,
            level: lvl.level,
            levelName: lvl.name,
            weeklyXP: weekly,
            levelHistory,
          }
        })
      },

      completeStreakDay: () => {
        set((state) => {
          const today = todayISO()
          if (state.lastActiveDate === today) return {}

          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayISO = yesterday.toISOString().slice(0, 10)

          const continued = state.lastActiveDate === yesterdayISO
          const newStreak = continued ? state.humanStreak + 1 : 1
          const bestStreak = Math.max(newStreak, state.bestStreak)

          return {
            humanStreak: newStreak,
            bestStreak,
            lastActiveDate: today,
          }
        })
      },

      resetStreak: () => set({ humanStreak: 0 }),
      setGoal: (goal) => set({ goal }),
      setName: (name) => set({ name }),
      setHumanMode: (value) => set({ humanModeActive: value }),
      setHumanModeSchedule: (start, end) => set({ humanModeStartTime: start, humanModeEndTime: end }),
      setTriggers: (triggers) => set({ triggers }),
      setOnboardingComplete: () => set({ onboardingComplete: true }),
      resetOnboarding: () => set({ onboardingComplete: false }),

      addHumanHour: (block) => {
        set((state) => ({
          humanHours: [...state.humanHours, { ...block, id: crypto.randomUUID() }],
        }))
      },

      removeHumanHour: (id) => {
        set((state) => ({
          humanHours: state.humanHours.filter((h) => h.id !== id),
        }))
      },

      setNotifyPref: (key, value) => set({ [key]: value }),
      setNotifyTime: (time) => set({ notifyDailyReminderTime: time }),

      earnMilestone: (id) => {
        set((state) => {
          if (state.earnedMilestones.some((m) => m.id === id)) return {}
          return {
            earnedMilestones: [
              ...state.earnedMilestones,
              { id, earnedAt: new Date().toISOString() },
            ],
          }
        })
      },

      updateStats: (stats) => set((state) => ({ ...state, ...stats })),

      setLastOpenDate: (date) => set({ lastOpenDate: date }),

      setInstallDate: (date) =>
        set((state) => state.installDate === '' ? { installDate: date } : {}),

      setWhyLeftReason: (reason) => set({ whyLeftReason: reason }),

      markReengageNotification: (key) =>
        set((state) => ({
          reengageNotificationsSent: state.reengageNotificationsSent.includes(key)
            ? state.reengageNotificationsSent
            : [...state.reengageNotificationsSent, key],
        })),

      markFirstWeekMilestone: (key) =>
        set((state) => ({
          firstWeekMilestonesSent: state.firstWeekMilestonesSent.includes(key)
            ? state.firstWeekMilestonesSent
            : [...state.firstWeekMilestonesSent, key],
        })),

      setSavedIntentions: (intentions) => set({ savedIntentions: intentions }),
      setSelectedDecisiveMomentIds: (ids) => set({ selectedDecisiveMomentIds: ids }),
      setPersonalIdentityStatement: (statement) => set({ personalIdentityStatement: statement }),
      addAcceptedHabitStack: (missionId) =>
        set((state) => ({
          acceptedHabitStacks: state.acceptedHabitStacks.includes(missionId)
            ? state.acceptedHabitStacks
            : [...state.acceptedHabitStacks, missionId],
        })),
      setActiveBundleIds: (ids) => set({ activeBundleIds: ids }),
      setEnvironmentDesign: (design) => set({ environmentDesign: design }),
    }),
    {
      name: 'unloop-user',
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const today = todayISO()
        if (state.lastActiveDate && state.lastActiveDate !== today) {
          const last = new Date(state.lastActiveDate)
          const now = new Date(today)
          const diff = Math.round((now.getTime() - last.getTime()) / 86_400_000)
          const weekly = [...state.weeklyXP]
          for (let i = 0; i < Math.min(diff, 7); i++) {
            weekly.shift()
            weekly.push(0)
          }
          state.weeklyXP = weekly
        }
      },
    }
  )
)
