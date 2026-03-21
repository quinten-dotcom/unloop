// ── Toast queue system ────────────────────────────────────────────────────────
//
// Usage: showToast('message text', '🔥')
// Toasts appear one at a time, queue the rest.

export interface ToastItem {
  id: string
  message: string
  emoji: string
}

type Listener = (toasts: ToastItem[]) => void

let queue: ToastItem[] = []
let active: ToastItem | null = null
const listeners: Set<Listener> = new Set()

function notify() {
  listeners.forEach((l) => l(active ? [active] : []))
}

function processQueue() {
  if (active || queue.length === 0) return
  active = queue.shift()!
  notify()

  // Auto-dismiss after 4 seconds, then process next after 1 second gap
  setTimeout(() => {
    active = null
    notify()
    setTimeout(processQueue, 1000)
  }, 4000)
}

export function showToast(message: string, emoji = '💡') {
  queue.push({ id: crypto.randomUUID(), message, emoji })
  processQueue()
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener)
  listener(active ? [active] : [])
  return () => listeners.delete(listener)
}

// ── Per-day dedup helpers ─────────────────────────────────────────────────────

function todayKey(id: string) {
  return `toast_shown_${id}_${new Date().toISOString().slice(0, 10)}`
}

export function wasShownToday(id: string): boolean {
  return !!localStorage.getItem(todayKey(id))
}

export function markShownToday(id: string) {
  localStorage.setItem(todayKey(id), '1')
}

// ── Trigger helpers (call these from the relevant places) ─────────────────────

export function toastFirstOpenOfDay(streak: number, xp: number, nextLevelXP: number, currentLevelXP: number) {
  const id = 'first-open'
  if (wasShownToday(id)) return
  markShownToday(id)

  const progress = Math.round(((xp - currentLevelXP) / Math.max(1, nextLevelXP - currentLevelXP)) * 100)
  const msgs = [
    `Morning! You're on day ${streak} of your streak. Let's keep it going.`,
    'New day, 3 new practices waiting whenever you\'re ready.',
    `Welcome back. Your brain is ${progress}% through to the next level.`,
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '👋')
}

export function toastMissionComplete(xpEarned: number, doneCount: number, nextLevelName: string) {
  const remaining = 3 - doneCount
  if (doneCount === 3) {
    showToast('All 3 done! You just unlocked today\'s bonus practice.', '🎉')
  } else {
    const msgs = [
      `Nice, that's ${xpEarned} XP. You're getting closer to ${nextLevelName}.`,
      `${doneCount} out of 3 done today. ${remaining} left to go.`,
    ]
    showToast(msgs[Math.floor(Math.random() * msgs.length)], '✅')
  }
}

export function toastStreakMilestone(streak: number) {
  const id = `streak-${streak}`
  if (wasShownToday(id)) return
  markShownToday(id)

  const msgs: Record<number, string> = {
    3:  'Three days in a row. Your brain is starting to pick up on the pattern.',
    7:  'One full week. This is usually where people start noticing they feel different.',
    14: 'Two weeks of this. Your dopamine receptors are genuinely thanking you right now.',
    21: "21 days. You've officially been doing this longer than most people stick with anything.",
    30: 'You are genuinely not the same person who downloaded this app.',
    60: "60 days. At this point you're teaching your brain a whole new operating system.",
    100: "100 days. That's honestly kind of incredible.",
  }

  const msg = msgs[streak]
  if (msg) showToast(msg, '🔥')
}

export function toastIdleNudge(streak: number) {
  const id = 'idle-nudge'
  if (wasShownToday(id)) return
  const now = new Date()
  if (now.getHours() < 18) return  // only after 6pm
  markShownToday(id)

  const msgs = [
    `You haven't done any practices yet today and your streak is at ${streak} days. Two quick ones before midnight and you're good.`,
    "No pressure, but your streak is on the line and there's still time.",
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '⏰')
}

export function toastPauseUsed(app: string, totalPausesToday: number) {
  const msgs = [
    `You chose to pause instead of mindlessly opening ${app}. That's your brain getting stronger.`,
    `Another pause logged. That's ${totalPausesToday} today. Each one is literally rewiring your habits.`,
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '⏸️')
}

export function toastLevelUp(newLevel: number) {
  showToast(`Level ${newLevel} perks are active now. Check out what you unlocked.`, '⚡')
}

export function toastWeeklyRecap(practices: number, pauses: number, avgScore: number) {
  const id = 'weekly-recap'
  if (wasShownToday(id)) return
  const now = new Date()
  if (now.getDay() !== 0) return  // Sunday only
  markShownToday(id)

  showToast(
    `Weekly recap: ${practices} practices, ${pauses} pauses, average score of ${avgScore}. Not bad at all.`,
    '📊'
  )
}
