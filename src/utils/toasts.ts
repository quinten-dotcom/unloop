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
    `morning! you're on day ${streak} of your streak, let's keep it rolling`,
    'new day, 3 new practices waiting for you whenever you\'re ready',
    `welcome back. your brain is ${progress}% through to the next level`,
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '👋')
}

export function toastMissionComplete(xpEarned: number, doneCount: number, nextLevelName: string) {
  const remaining = 3 - doneCount
  if (doneCount === 3) {
    showToast('all 3 done! you just unlocked the bonus practice for today', '🎉')
  } else {
    const msgs = [
      `nice, that's ${xpEarned} XP. you're getting closer to ${nextLevelName}`,
      `${doneCount} out of 3 done today, ${remaining} left to go`,
    ]
    showToast(msgs[Math.floor(Math.random() * msgs.length)], '✅')
  }
}

export function toastStreakMilestone(streak: number) {
  const id = `streak-${streak}`
  if (wasShownToday(id)) return
  markShownToday(id)

  const msgs: Record<number, string> = {
    3:  '3 days in a row... your brain is starting to pick up on the pattern',
    7:  'one full week. this is usually where people start noticing they feel different',
    14: 'two weeks of this and honestly your dopamine receptors are thanking you right now',
    21: "21 days. you've officially been doing this longer than most people stick with anything",
    30: 'you are genuinely not the same person who downloaded this app',
    60: "60 days. at this point you're basically teaching your brain a whole new operating system",
    100: "100 days. that's... honestly kind of incredible",
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
    `hey so you haven't done any practices today and your streak is at ${streak} days... just two quick ones before midnight and you're good`,
    "no pressure but your streak is on the line and there's still time",
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '⏰')
}

export function toastPauseUsed(app: string, totalPausesToday: number) {
  const msgs = [
    `you just chose to pause instead of mindlessly opening ${app}. that's your brain getting stronger`,
    `another pause logged. that's ${totalPausesToday} today, each one is literally rewiring your habits`,
  ]
  showToast(msgs[Math.floor(Math.random() * msgs.length)], '⏸️')
}

export function toastLevelUp(newLevel: number) {
  showToast(`level ${newLevel} perks are active now, check out what you unlocked`, '⚡')
}

export function toastWeeklyRecap(practices: number, pauses: number, avgScore: number) {
  const id = 'weekly-recap'
  if (wasShownToday(id)) return
  const now = new Date()
  if (now.getDay() !== 0) return  // Sunday only
  markShownToday(id)

  showToast(
    `weekly recap: you did ${practices} practices, used the pause ${pauses} times, and your average score was ${avgScore}. not bad at all`,
    '📊'
  )
}
