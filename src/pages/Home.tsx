import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import { getLevelFromXP, levelProgress, LEVELS } from '../data/levels'
import TutorialOverlay from '../components/TutorialOverlay'
import { toastFirstOpenOfDay, toastIdleNudge, toastStreakMilestone, toastFirstWeekMilestone } from '../utils/toasts'
import styles from './Home.module.css'

// ── Explanation modals ────────────────────────────────────────────────────────

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

// ── Derived helpers ──────────────────────────────────────────────────────────

function computeHumanScore(streak: number, missions: number, level: number): number {
  const streakPts  = Math.min(40, streak * 5)
  const missionPts = Math.min(40, missions * 4)
  const levelPts   = Math.min(20, (level - 1) * 4)
  return Math.min(100, streakPts + missionPts + levelPts)
}

function scoreColor(score: number): string {
  if (score >= 80) return '#10B981'
  if (score >= 50) return '#F59E0B'
  return '#94A3B8'
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate()
  const [hsModalOpen, setHsModalOpen] = useState(false)

  const {
    xp,
    level,
    levelName,
    humanStreak,
    totalMissionsCompleted,
    goal,
    triggers,
    installDate,
    firstWeekMilestonesSent,
    markFirstWeekMilestone,
    personalIdentityStatement,
    humanModeActive,
    humanModeStartTime,
    humanModeEndTime,
    pauseApps,
    setHumanMode,
  } = useUserStore()

  const { missions, completed, generateDailyMissions } = useMissionStore()

  // Generate today's missions if not already done
  useEffect(() => {
    generateDailyMissions(goal, level, triggers)
  }, [goal, level, triggers, generateDailyMissions])

  // First-open-of-day toast + streak milestone + idle nudge
  useEffect(() => {
    const currentLevel = getLevelFromXP(xp)
    const nextLvl      = LEVELS.find((l) => l.minXP > xp)
    toastFirstOpenOfDay(
      humanStreak,
      xp,
      nextLvl?.minXP ?? xp,
      currentLevel.minXP,
    )
    toastStreakMilestone(humanStreak)
    toastIdleNudge(humanStreak)
    toastFirstWeekMilestone(installDate, firstWeekMilestonesSent, markFirstWeekMilestone)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // XP bar values
  const progress      = levelProgress(xp)
  const currentLevel  = getLevelFromXP(xp)
  const nextLevel     = LEVELS.find((l) => l.minXP > xp)
  const xpBarWidth    = `${Math.round(progress * 100)}%`
  const xpLabel       = nextLevel ? `XP to Level ${nextLevel.level}` : 'Max Level Reached'
  const xpLevelName   = nextLevel ? nextLevel.name : ''
  const xpDisplay     = nextLevel
    ? `${xp - currentLevel.minXP} / ${nextLevel.minXP - currentLevel.minXP} XP`
    : `${xp} XP`

  // Human score
  const humanScore = computeHumanScore(humanStreak, totalMissionsCompleted, level)
  const color      = scoreColor(humanScore)

  // Identity statement
  const identityText = personalIdentityStatement.trim() !== ''
    ? personalIdentityStatement
    : LEVELS.find(l => l.level === level)?.identityStatement ?? ''

  // Missions
  const missionsToday = missions.filter((m) => isMissionCompleted(completed, m.id)).length

  // Animate XP bar on mount/change
  const xpFillRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (xpFillRef.current) {
      xpFillRef.current.style.width = '0%'
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (xpFillRef.current) xpFillRef.current.style.width = xpBarWidth
        })
      })
      return () => cancelAnimationFrame(t)
    }
  }, [xp, xpBarWidth])

  // Pause schedule display
  const pauseSchedule = humanModeStartTime && humanModeEndTime
    ? `${humanModeStartTime} – ${humanModeEndTime}`
    : null

  return (
    <div className={styles.page}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.streak} data-tutorial="streak">
          <span className={styles.flameIcon}>🔥</span>
          <span className={styles.streakText}>Day {humanStreak || 0}</span>
        </div>
        <button className={styles.scorePillWrap} onClick={() => setHsModalOpen(true)} aria-label="What is Human Score?">
          <span className={styles.scoreLabel}>Human Score</span>
          <div className={styles.scorePill} data-tutorial="score-pill" style={{ borderColor: `${color}40`, color }}>
            <span className={styles.scoreDot} style={{ background: color }} />
            <span>{humanScore}/100</span>
          </div>
        </button>
      </div>

      {/* ── The Pause Status Card ─────────────────────────────────────────── */}
      <div className={`${styles.pauseCard} ${humanModeActive ? styles.pauseCardOn : ''}`}>
        <div className={styles.pauseCardTop}>
          <div className={styles.pauseCardInfo}>
            <span className={styles.pauseCardTitle}>
              {humanModeActive ? 'The Pause is on' : 'The Pause is off'}
            </span>
            {humanModeActive && pauseSchedule && (
              <span className={styles.pauseCardSub}>{pauseSchedule}</span>
            )}
            {!humanModeActive && (
              <span className={styles.pauseCardSub}>Turn on to add a pause before scroll apps</span>
            )}
          </div>
          <button
            className={`${styles.pauseToggle} ${humanModeActive ? styles.pauseToggleOn : ''}`}
            onClick={() => setHumanMode(!humanModeActive)}
            aria-label={humanModeActive ? 'Turn off The Pause' : 'Turn on The Pause'}
          >
            <span className={styles.pauseToggleThumb} />
          </button>
        </div>
        {humanModeActive && pauseApps.length > 0 && (
          <div className={styles.pauseApps}>
            {pauseApps.slice(0, 5).map((app) => (
              <span key={app} className={styles.pauseAppChip}>{app}</span>
            ))}
            {pauseApps.length > 5 && (
              <span className={styles.pauseAppChip}>+{pauseApps.length - 5}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Today's Practices ────────────────────────────────────────────── */}
      <div className={styles.practicesCard} data-tutorial="mission-card">
        <div className={styles.practicesHeader}>
          <div className={styles.practicesLeft}>
            <span className={styles.practicesSectionTitle}>Today's practices</span>
            <span className={styles.practicesCount}>{missionsToday} of 3 done</span>
          </div>
          <button className={styles.seeAllBtn} onClick={() => navigate('/missions')}>
            See all
          </button>
        </div>
        <div className={styles.practicesBar}>
          <div className={styles.practicesBarFill} style={{ width: `${(missionsToday / 3) * 100}%` }} />
        </div>
        {missions.length === 0 ? (
          <p className={styles.practicesEmpty}>Grabbing today's practices...</p>
        ) : (
          <div className={styles.practicesList}>
            {missions.slice(0, 3).map((m) => {
              const done = isMissionCompleted(completed, m.id)
              return (
                <div key={m.id} className={`${styles.practiceItem} ${done ? styles.practiceItemDone : ''}`}>
                  <span className={styles.practiceCheck}>{done ? '✓' : '○'}</span>
                  <span className={styles.practiceName}>{m.name}</span>
                  <span className={styles.practiceXP}>+{m.xpReward} XP</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Level Progress ───────────────────────────────────────────────── */}
      <div className={styles.levelCard} data-tutorial="xp-bar">
        <div className={styles.levelCardLeft}>
          <div className={styles.levelBadge}>
            <span className={styles.levelDot} />
            Level {level}
          </div>
          <div className={styles.levelNameGroup}>
            <span className={styles.levelNameText}>{levelName}</span>
            {xpLevelName && <span className={styles.levelNextName}>→ {xpLevelName}</span>}
          </div>
        </div>
        <div className={styles.levelCardRight}>
          <span className={styles.xpNumbers}>{xpDisplay}</span>
        </div>
        <div className={styles.xpTrackWide}>
          <div ref={xpFillRef} className={styles.xpFill} />
        </div>
        <span className={styles.xpLabelSmall}>{xpLabel}</span>
      </div>

      {/* ── Identity statement ──────────────────────────────────────────── */}
      <div className={styles.identityCard}>
        <span className={styles.identityQuote}>"</span>
        <p className={styles.identityText}>{identityText}</p>
        <span className={styles.identityQuote}>"</span>
      </div>

      {/* ── Tutorial (first-run only) ────────────────────────────────────── */}
      <TutorialOverlay />

      {/* ── Human Score explainer modal ──────────────────────────────────── */}
      {hsModalOpen && (
        <ExplainerModal
          title="What is your Human Score?"
          body="Your Human Score measures how intentional you were with your phone today, from 0 to 100. It factors in your streak, how many practices you completed, and your level. Think of it as a daily report card for your phone habits."
          onClose={() => setHsModalOpen(false)}
        />
      )}

    </div>
  )
}
