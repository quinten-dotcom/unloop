import { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import { getLevelFromXP, LEVELS } from '../data/levels'
import { toastFirstOpenOfDay, toastIdleNudge, toastStreakMilestone, toastFirstWeekMilestone } from '../utils/toasts'
import styles from './Today.module.css'

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
    goal,
    triggers,
    humanStreak,
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

      {/* ── The Pause Card ───────────────────────────────────────────────── */}
      <div
        className={`${styles.pauseCard} ${humanModeActive ? styles.pauseCardOn : ''}`}
        data-tutorial="pause-card"
      >
        <div className={styles.pauseCardMain}>
          <div className={styles.pauseIconWrap}>
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
                      <span className={styles.practiceXP}>+{m.xpReward} XP</span>
                    </div>
                  </div>
                  <button
                    className={`${styles.practiceCheckbox} ${done ? styles.practiceCheckboxDone : ''}`}
                    onClick={() => !done && handleComplete(m.id, m.xpReward)}
                    disabled={done}
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

      {/* ── Human Score explainer ────────────────────────────────────────── */}
      {hsModalOpen && (
        <ExplainerModal
          title="What is your Human Score?"
          body="Your Human Score measures how intentional you were with your phone today, from 0 to 100. It factors in your streak, how many practices you completed, and your current progress level. Think of it as a daily report card for your phone habits."
          onClose={() => setHsModalOpen(false)}
        />
      )}

    </div>
  )
}
