import { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import styles from './Progress.module.css'

// ── Helpers ──────────────────────────────────────────────────────────────────

function computeHumanScore(streak: number, missions: number, level: number): number {
  return Math.min(100,
    Math.min(40, streak * 5) +
    Math.min(40, missions * 4) +
    Math.min(20, (level - 1) * 4)
  )
}

function scoreColor(score: number): string {
  if (score >= 80) return '#10B981'
  if (score >= 50) return '#F59E0B'
  return '#94A3B8'
}

function scoreLabel(score: number): string {
  if (score >= 71) return 'Your intentional practice is actually working. Keep it up.'
  if (score >= 41) return "You're building something real. Show up again tomorrow."
  if (score >= 1)  return 'Every practice is moving something. Seriously.'
  return "Complete today's practices to get your first score."
}

function getChangingMessage(streak: number): string {
  if (streak >= 30) {
    return "You've passed the threshold where most researchers see lasting behavioral change. The loop isn't gone forever, but you have the tools to catch it whenever it starts."
  }
  if (streak >= 14) {
    return "Real structural changes are happening. Your prefrontal cortex — the self-control part of your brain — is getting measurably stronger."
  }
  if (streak >= 7) {
    return "Your brain's dopamine receptors are starting to recalibrate. You might be noticing that everyday things feel a little more enjoyable."
  }
  if (streak >= 4) {
    return "You're in the early stages of rewiring. The urges to scroll are still strong, but you're getting better at noticing them before you act."
  }
  return "You've just started building a new pattern. Your brain is beginning to register that something is different."
}

function reclaimedHours(missions: number, pauses: number): string {
  const hours = missions * 0.5 + pauses * (2 / 60)
  return hours < 1 ? `${Math.round(hours * 60)}m` : `${hours.toFixed(1)}h`
}

// ── 30-day calendar ───────────────────────────────────────────────────────────

type DayState = 'complete' | 'today' | 'missed'

function compute30DayCalendar(
  humanStreak: number,
  lastActiveDate: string | null
): DayState[] {
  const todayStr = new Date().toISOString().slice(0, 10)
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const dayStr = d.toISOString().slice(0, 10)

    if (dayStr === todayStr) {
      return lastActiveDate === todayStr ? 'complete' : 'today'
    }
    if (!lastActiveDate) return 'missed'
    const msFromLast = new Date(lastActiveDate).getTime() - new Date(dayStr).getTime()
    const daysFromLast = Math.round(msFromLast / 86_400_000)
    return daysFromLast >= 0 && daysFromLast < humanStreak ? 'complete' : 'missed'
  })
}

function getMonthLabels(): Array<{ label: string; col: number }> {
  const labels: Array<{ label: string; col: number }> = []
  let lastMonth = -1
  for (let i = 0; i < 30; i++) {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const month = d.getMonth()
    if (month !== lastMonth) {
      labels.push({
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        col: i,
      })
      lastMonth = month
    }
  }
  return labels
}

function CalendarGrid({ humanStreak, lastActiveDate }: { humanStreak: number; lastActiveDate: string | null }) {
  const days = compute30DayCalendar(humanStreak, lastActiveDate)
  const monthLabels = getMonthLabels()

  return (
    <div className={styles.calendarCard}>
      <span className={styles.calendarTitle}>Last 30 days</span>
      <div className={styles.calendarMonths}>
        {monthLabels.map(({ label, col }) => (
          <span
            key={col}
            className={styles.calendarMonth}
            style={{ gridColumnStart: col + 1 }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {days.map((state, i) => (
          <div
            key={i}
            className={`${styles.calendarCell} ${styles[`cell_${state}`]}`}
            title={state}
          />
        ))}
      </div>
      <div className={styles.calendarLegend}>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendGreen}`} />Done</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendBlue}`} />Today</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendGray}`} />Missed</span>
      </div>
    </div>
  )
}

// ── Human Score Card ──────────────────────────────────────────────────────────

function HumanScoreCard({ score }: { score: number }) {
  const color  = scoreColor(score)
  const label  = scoreLabel(score)
  const [anim, setAnim] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const raf = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 900, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setAnim(Math.round(eased * score))
      if (p < 1) requestAnimationFrame(raf)
    }
    const id = setTimeout(() => requestAnimationFrame(raf), 200)
    return () => clearTimeout(id)
  }, [score])

  return (
    <div className={styles.scoreCard} style={{ borderColor: `${color}30` }}>
      <div className={styles.scoreTop}>
        <span className={styles.scoreLabel}>Human Score</span>
        <span className={styles.scoreBar}>
          <span
            className={styles.scoreBarFill}
            style={{ width: `${score}%`, background: color }}
          />
        </span>
      </div>
      <div className={styles.scoreNumber} style={{ color }}>
        {anim}
        <span className={styles.scoreOutOf}>/100</span>
      </div>
      <p className={styles.scoreExplain}>{label}</p>
    </div>
  )
}

// ── What's Changing ───────────────────────────────────────────────────────────

function WhatsChangingSection({ streak }: { streak: number }) {
  return (
    <div className={styles.changingCard}>
      <span className={styles.changingLabel}>What is happening right now</span>
      <p className={styles.changingBody}>{getChangingMessage(streak)}</p>
    </div>
  )
}

// ── Stats grid ────────────────────────────────────────────────────────────────

function StatsGrid({
  humanStreak,
  bestStreak,
  totalMissionsCompleted,
  totalPausesTriggered,
}: {
  humanStreak: number
  bestStreak: number
  totalMissionsCompleted: number
  totalPausesTriggered: number
}) {
  const hours = reclaimedHours(totalMissionsCompleted, totalPausesTriggered)
  const stats = [
    { label: 'Current streak', value: `${humanStreak} day${humanStreak !== 1 ? 's' : ''}`, icon: '🔥' },
    { label: 'Best streak', value: `${bestStreak} day${bestStreak !== 1 ? 's' : ''}`, icon: '🏆' },
    { label: 'Practices done', value: String(totalMissionsCompleted), icon: '✅' },
    { label: 'Pause used', value: String(totalPausesTriggered), icon: '⏸️' },
  ]
  return (
    <div className={styles.statsSection}>
      <span className={styles.statsTitle}>Your stats</span>
      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statIcon}>{s.icon}</span>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.timeCard}>
        <div className={styles.timeCardLeft}>
          <span className={styles.statIcon}>⏱️</span>
          <div>
            <span className={styles.statLabel}>Time back from mindless scrolling</span>
            <div className={styles.timeCardSub}>~30 min per practice · 2 min per pause</div>
          </div>
        </div>
        <span className={styles.timeValue}>{hours}</span>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Progress() {
  const {
    xp,
    level,
    humanStreak,
    bestStreak,
    lastActiveDate,
    totalMissionsCompleted,
    totalPausesTriggered,
  } = useUserStore()

  const humanScore = computeHumanScore(humanStreak, totalMissionsCompleted, level)

  return (
    <div className={styles.page}>

      <h1 className={styles.title}>Your progress</h1>

      <WhatsChangingSection streak={humanStreak} />

      <HumanScoreCard score={humanScore} />

      <CalendarGrid humanStreak={humanStreak} lastActiveDate={lastActiveDate} />

      <StatsGrid
        humanStreak={humanStreak}
        bestStreak={bestStreak}
        totalMissionsCompleted={totalMissionsCompleted}
        totalPausesTriggered={totalPausesTriggered}
      />

    </div>
  )
}
