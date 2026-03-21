import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import { getLevelFromXP, levelProgress, LEVELS } from '../data/levels'
import LoopSpiral from '../components/LoopSpiral'
import TutorialOverlay from '../components/TutorialOverlay'
import PauseScreen from '../components/PauseScreen'
import { toastFirstOpenOfDay, toastIdleNudge, toastStreakMilestone } from '../utils/toasts'
import styles from './Home.module.css'

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

// ── Human Mode toggle ────────────────────────────────────────────────────────

function HumanModeToggle({
  active,
  onToggle,
}: {
  active: boolean
  onToggle: () => void
}) {
  return (
    <div className={styles.hmSection} data-tutorial="human-mode">
      <div className={styles.hmInfo}>
        <span className={styles.hmTitle}>Human Mode</span>
        <span className={styles.hmDesc}>
          {active ? 'on, you\'re here right now' : 'start a phone-free window'}
        </span>
      </div>
      <button
        className={`${styles.toggle} ${active ? styles.toggleOn : ''}`}
        onClick={onToggle}
        role="switch"
        aria-checked={active}
        aria-label="Toggle Human Mode"
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate()
  const [pauseOpen, setPauseOpen] = useState(false)

  const {
    xp,
    level,
    levelName,
    humanStreak,
    totalMissionsCompleted,
    totalPausesTriggered,
    humanModeActive,
    setHumanMode,
    goal,
  } = useUserStore()

  const { missions, completed, generateDailyMissions } = useMissionStore()

  // Generate today's missions if not already done
  useEffect(() => {
    generateDailyMissions(goal, level)
  }, [goal, level, generateDailyMissions])

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // XP bar values
  const progress      = levelProgress(xp)
  const currentLevel  = getLevelFromXP(xp)
  const nextLevel     = LEVELS.find((l) => l.minXP > xp)
  const xpBarWidth    = `${Math.round(progress * 100)}%`
  const xpLabel       = nextLevel ? `XP to ${nextLevel.name}` : 'Max Level Reached'
  const xpDisplay     = nextLevel
    ? `${xp - currentLevel.minXP} / ${nextLevel.minXP - currentLevel.minXP} XP`
    : `${xp} XP`

  // Human score
  const humanScore = computeHumanScore(humanStreak, totalMissionsCompleted, level)
  const color      = scoreColor(humanScore)

  // First incomplete mission
  const firstMission = missions.find((m) => !isMissionCompleted(completed, m.id))
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

  return (
    <div className={styles.page}>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.streak} data-tutorial="streak">
          <span className={styles.flameIcon}>🔥</span>
          <span className={styles.streakText}>Day {humanStreak || 0}</span>
        </div>
        <div className={styles.scorePill} data-tutorial="score-pill" style={{ borderColor: `${color}40`, color }}>
          <span className={styles.scoreDot} style={{ background: color }} />
          <span>{humanScore}/100</span>
        </div>
      </div>

      {/* ── Loop visual ──────────────────────────────────────────────────── */}
      <div className={styles.visualArea} data-tutorial="loop">
        <LoopSpiral level={level} size={210} />
      </div>

      {/* ── Level badge ──────────────────────────────────────────────────── */}
      <div className={styles.levelBadge}>
        <span className={styles.levelDot} />
        Level {level}: {levelName}
      </div>

      {/* ── XP bar ───────────────────────────────────────────────────────── */}
      <div className={styles.xpSection} data-tutorial="xp-bar">
        <div className={styles.xpHeader}>
          <span className={styles.xpLabel}>{xpLabel}</span>
          <span className={styles.xpNumbers}>{xpDisplay}</span>
        </div>
        <div className={styles.xpTrack}>
          <div ref={xpFillRef} className={styles.xpFill} />
        </div>
      </div>

      {/* ── Mission preview ──────────────────────────────────────────────── */}
      <div className={styles.missionCard} data-tutorial="mission-card" onClick={() => navigate('/missions')}>
        {firstMission ? (
          <>
            <div className={styles.missionLeft}>
              <span className={styles.missionEmoji}>{firstMission.emoji}</span>
              <div className={styles.missionInfo}>
                <span className={styles.missionName}>{firstMission.name}</span>
                <span className={styles.missionXP}>+{firstMission.xpReward} XP</span>
              </div>
            </div>
            <button
              className={styles.startBtn}
              onClick={(e) => {
                e.stopPropagation()
                navigate('/missions')
              }}
            >
              Start
            </button>
          </>
        ) : missions.length === 0 ? (
          <div className={styles.missionEmpty}>grabbing today's practices...</div>
        ) : (
          <div className={styles.missionAllDone}>
            <span>🎉</span>
            <span>all done for today, nice work</span>
          </div>
        )}
      </div>

      {/* ── Quick stats ──────────────────────────────────────────────────── */}
      <div className={styles.statsRow}>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{totalPausesTriggered}</span>
          <span className={styles.statLabel}>pauses today</span>
        </div>
        <div className={styles.statPill}>
          <span className={styles.statNum}>0h</span>
          <span className={styles.statLabel}>phone-free time</span>
        </div>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{missionsToday}/3</span>
          <span className={styles.statLabel}>practices done</span>
        </div>
      </div>

      {/* ── Human Mode toggle ────────────────────────────────────────────── */}
      <HumanModeToggle
        active={humanModeActive}
        onToggle={() => setHumanMode(!humanModeActive)}
      />

      {/* ── Pause FAB ────────────────────────────────────────────────────── */}
      <button
        className={styles.pauseFab}
        onClick={() => setPauseOpen(true)}
        aria-label="Take a pause"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      </button>

      {/* ── Tutorial (first-run only) ────────────────────────────────────── */}
      <TutorialOverlay />

      {/* ── Pause screen ─────────────────────────────────────────────────── */}
      {pauseOpen && <PauseScreen onClose={() => setPauseOpen(false)} />}
    </div>
  )
}
