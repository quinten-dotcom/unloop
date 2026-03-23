import { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import { getLevelFromXP, LEVELS } from '../data/levels'
import { toastFirstOpenOfDay, toastIdleNudge, toastStreakMilestone, toastFirstWeekMilestone } from '../utils/toasts'
import styles from './Today.module.css'

// ── Daily lines ──────────────────────────────────────────────────────────────

const DAILY_LINES = [
  "Every practice is a vote for the person you want to become.",
  "You're rewiring your brain, one choice at a time.",
  "Small daily choices create big changes over time.",
  "Your brain adapts to whatever you practice most.",
  "Awareness is the first step. You're already doing it.",
  "Each moment of choice is a moment of growth.",
  "The urge to scroll will pass. So does the urge not to.",
  "You don't have to be perfect. Just a little more intentional than yesterday.",
  "Your habits are a vote on who you're becoming.",
  "Dopamine resets slowly. Every day you choose differently, it gets easier.",
  "You're not fighting your phone. You're training your brain.",
  "The goal isn't less scrolling. It's more presence.",
  "Noticing the urge is already winning.",
  "The brain that got you here can also get you somewhere better.",
]

function GreetingSection({ name }: { name: string }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const displayName = name.trim() ? `, ${name.trim().split(' ')[0]}` : ''

  // Pick a line based on day of year (changes daily, same all day)
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const line = DAILY_LINES[dayOfYear % DAILY_LINES.length]

  return (
    <div className={styles.greetingSection}>
      <span className={styles.greetingText}>{greeting}{displayName}</span>
      <p className={styles.motivationLine}>{line}</p>
    </div>
  )
}

// ── Week view ─────────────────────────────────────────────────────────────────

function WeekView({ completed, missions, humanStreak, lastActiveDate }: {
  completed: import('../store/useMissionStore').CompletedMission[]
  missions: import('../data/missions').Mission[]
  humanStreak: number
  lastActiveDate: string | null
}) {
  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)
  const doneToday = missions.filter(m => completed.some(c => c.missionId === m.id)).length

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().slice(0, 10)
    const isToday = dateStr === todayStr
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)

    let state: 'done' | 'today' | 'missed' = 'missed'
    if (isToday) {
      state = 'today'
    } else if (lastActiveDate) {
      const msFromLast = new Date(lastActiveDate).getTime() - new Date(dateStr).getTime()
      const daysFromLast = Math.round(msFromLast / 86_400_000)
      if (daysFromLast >= 0 && daysFromLast < humanStreak) state = 'done'
    }

    return { dateStr, isToday, dayLabel, state, doneToday: isToday ? doneToday : 0 }
  })

  return (
    <div className={styles.weekView}>
      <span className={styles.weekViewTitle}>This week</span>
      <div className={styles.weekDays}>
        {days.map((d) => (
          <div key={d.dateStr} className={styles.weekDay}>
            <div className={`${styles.weekDot} ${styles[`weekDot_${d.state}`]} ${d.isToday ? styles.weekDotToday : ''}`} />
            <span className={styles.weekDayLabel}>{d.dayLabel}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Milestone card ────────────────────────────────────────────────────────────

const MILESTONES = [
  { days: 3,  label: 'Getting started',       icon: '🌱' },
  { days: 7,  label: 'Building momentum',     icon: '🔥' },
  { days: 14, label: 'New habits forming',    icon: '⚡' },
  { days: 30, label: 'Dopamine reset',        icon: '⭐' },
  { days: 60, label: 'Rewired',               icon: '🧠' },
  { days: 90, label: 'Unlooped',              icon: '🏆' },
]

function MilestoneCard({ streak }: { streak: number }) {
  const next = MILESTONES.find(m => m.days > streak) ?? MILESTONES[MILESTONES.length - 1]
  const prev = MILESTONES.filter(m => m.days <= streak).pop()
  const from = prev ? prev.days : 0
  const progress = Math.min(1, (streak - from) / (next.days - from))

  return (
    <div className={styles.milestoneCard}>
      <div className={styles.milestoneTop}>
        <span className={styles.milestoneIcon}>{next.icon}</span>
        <div className={styles.milestoneInfo}>
          <span className={styles.milestoneName}>{next.label}</span>
          <span className={styles.milestoneSub}>Day {streak} / {next.days}</span>
        </div>
      </div>
      <div className={styles.milestoneBar}>
        <div className={styles.milestoneBarFill} style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

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

// ── Explainer modal ───────────────────────────────────────────────────────────

function ExplainerModal({ title, body, onClose }: { title: string; body: string; onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalSheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHandle} />
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalBody}>{body}</p>
        <button className={styles.modalClose} onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Today() {
  const [hsModalOpen, setHsModalOpen] = useState(false)
  const [justCompleted, setJustCompleted] = useState<string | null>(null)

  const {
    xp,
    level,
    name,
    goal,
    triggers,
    humanStreak,
    lastActiveDate,
    totalMissionsCompleted,
    humanModeActive,
    humanModeStartTime,
    humanModeEndTime,
    pauseApps,
    setHumanMode,
    addXP,
    updateStats,
    completeStreakDay,
    installDate,
    firstWeekMilestonesSent,
    markFirstWeekMilestone,
  } = useUserStore()

  const { missions, completed, generateDailyMissions, completeMission } = useMissionStore()

  useEffect(() => {
    generateDailyMissions(goal, level, triggers)
  }, [goal, level, triggers, generateDailyMissions])

  // First-open-of-day toasts
  useEffect(() => {
    const currentLevel = getLevelFromXP(xp)
    const nextLvl = LEVELS.find((l) => l.minXP > xp)
    toastFirstOpenOfDay(humanStreak, xp, nextLvl?.minXP ?? xp, currentLevel.minXP)
    toastStreakMilestone(humanStreak)
    toastIdleNudge(humanStreak)
    toastFirstWeekMilestone(installDate, firstWeekMilestonesSent, markFirstWeekMilestone)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const doneCount = missions.filter((m) => isMissionCompleted(completed, m.id)).length
  const allDone = missions.length > 0 && doneCount >= 3
  const humanScore = computeHumanScore(humanStreak, totalMissionsCompleted, level)
  const color = scoreColor(humanScore)

  const pauseSchedule = humanModeStartTime && humanModeEndTime
    ? `${humanModeStartTime} – ${humanModeEndTime}`
    : null

  function handleComplete(missionId: string, xpReward: number) {
    completeMission(missionId, undefined)
    addXP(xpReward)
    updateStats({ totalMissionsCompleted: totalMissionsCompleted + 1 })
    completeStreakDay()
    setJustCompleted(missionId)
    setTimeout(() => setJustCompleted(null), 600)
  }

  return (
    <div className={styles.page}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.streak} data-tutorial="streak">
          <span className={styles.flameIcon}>🔥</span>
          <span className={styles.streakText}>Day {humanStreak || 0}</span>
        </div>
        <button
          className={styles.scorePillWrap}
          onClick={() => setHsModalOpen(true)}
          aria-label="What is Human Score?"
          data-tutorial="score-pill"
        >
          <span className={styles.scoreLabel}>Human Score</span>
          <div className={styles.scorePill} style={{ borderColor: `${color}40`, color }}>
            <span className={styles.scoreDot} style={{ background: color }} />
            <span>{humanScore}/100</span>
          </div>
        </button>
      </div>

      {/* ── Greeting ─────────────────────────────────────────────────────── */}
      <GreetingSection name={name} />

      {/* ── The Pause Card ───────────────────────────────────────────────── */}
      <div
        className={`${styles.pauseCard} ${humanModeActive ? styles.pauseCardOn : ''}`}
        data-tutorial="pause-card"
      >
        <div className={styles.pauseCardMain}>
          <div className={styles.pauseIconWrap} style={{ color: humanModeActive ? '#10B981' : '#94A3B8' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </div>
          <div className={styles.pauseInfo}>
            <span className={styles.pauseTitle}>The Pause</span>
            {humanModeActive ? (
              <span className={styles.pauseStatusOn}>
                Active — {pauseApps.length} app{pauseApps.length !== 1 ? 's' : ''} paused
                {pauseSchedule && ` · ${pauseSchedule}`}
              </span>
            ) : (
              <span className={styles.pauseStatusOff}>Inactive</span>
            )}
            <span className={styles.pauseStreak}>🔥 {humanStreak} day streak</span>
          </div>
          <button
            className={`${styles.pauseToggle} ${humanModeActive ? styles.pauseToggleOn : ''}`}
            onClick={() => setHumanMode(!humanModeActive)}
            aria-label={humanModeActive ? 'Turn off The Pause' : 'Turn on The Pause'}
          >
            <span className={styles.pauseToggleThumb} />
          </button>
        </div>
      </div>

      {/* ── Your 3 practices ─────────────────────────────────────────────── */}
      <div className={styles.practicesSection} data-tutorial="practices-section">
        <div className={styles.practicesHeader}>
          <span className={styles.practicesSectionTitle}>Your 3 practices</span>
          <span className={`${styles.practicesCounter} ${allDone ? styles.practicesCounterDone : ''}`}>
            {allDone ? '3/3 ✓' : `${doneCount}/3`}
          </span>
        </div>

        {allDone && (
          <div className={styles.allDoneBanner}>
            🎉 Nice work today!
          </div>
        )}

        <div className={styles.practiceList}>
          {missions.length === 0 ? (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.practiceCardSkeleton} aria-hidden="true" />
              ))}
            </>
          ) : (
            missions.slice(0, 3).map((m) => {
              const done = isMissionCompleted(completed, m.id)
              const popped = justCompleted === m.id
              return (
                <div
                  key={m.id}
                  className={`${styles.practiceCard} ${done ? styles.practiceCardDone : ''} ${popped ? styles.practiceCardPop : ''}`}
                >
                  <div className={styles.practiceLeft}>
                    <span className={styles.practiceEmoji}>{m.emoji}</span>
                    <div className={styles.practiceInfo}>
                      <span className={styles.practiceName}>{m.name}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`${styles.practiceCheckbox} ${done ? styles.practiceCheckboxDone : ''}`}
                    onClick={() => { if (!done) handleComplete(m.id, m.xpReward) }}
                    aria-label={done ? `${m.name} completed` : `Mark ${m.name} complete`}
                  >
                    {done && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* ── Week view ────────────────────────────────────────────────────── */}
      <WeekView completed={completed} missions={missions} humanStreak={humanStreak} lastActiveDate={lastActiveDate} />

      {/* ── Milestone ────────────────────────────────────────────────────── */}
      <MilestoneCard streak={humanStreak} />

      {/* ── Human Score explainer ────────────────────────────────────────── */}
      {hsModalOpen && (
        <ExplainerModal
          title="What is your Human Score?"
          body="Your Human Score measures how intentional you've been with your time and attention. It factors in your streak, how many practices you completed, and your Pause usage. Complete your practices daily and maintain your streak to watch it grow."
          onClose={() => setHsModalOpen(false)}
        />
      )}

    </div>
  )
}
