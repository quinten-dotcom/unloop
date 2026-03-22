import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import { getLevelFromXP, levelProgress, LEVELS } from '../data/levels'
import LoopSpiral from '../components/LoopSpiral'
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
    savedIntentions,
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
        <button className={styles.scorePillWrap} onClick={() => setHsModalOpen(true)} aria-label="What is Human Score?">
          <span className={styles.scoreLabel}>Human Score</span>
          <div className={styles.scorePill} data-tutorial="score-pill" style={{ borderColor: `${color}40`, color }}>
            <span className={styles.scoreDot} style={{ background: color }} />
            <span>{humanScore}/100</span>
          </div>
        </button>
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
          <div className={styles.xpLabelGroup}>
            <span className={styles.xpLabel}>{xpLabel}</span>
            {xpLevelName && <span className={styles.xpLevelName}>{xpLevelName}</span>}
          </div>
          <span className={styles.xpNumbers}>{xpDisplay}</span>
        </div>
        <div className={styles.xpTrack}>
          <div ref={xpFillRef} className={styles.xpFill} />
        </div>
      </div>

      {/* ── Identity statement ──────────────────────────────────────────────── */}
      <div className={styles.identityCard}>
        <span className={styles.identityQuote}>"</span>
        <p className={styles.identityText}>{identityText}</p>
        <span className={styles.identityQuote}>"</span>
      </div>

      {/* ── Your Plans for Today ─────────────────────────────────────────────── */}
      {savedIntentions.length > 0 && (
        <div className={styles.intentionsCard}>
          <span className={styles.intentionsLabel}>Your plans for today</span>
          <ul className={styles.intentionsList}>
            {savedIntentions.map((intention, i) => (
              <li key={i} className={styles.intentionItem}>
                <span className={styles.intentionBullet}>→</span>
                <span>{intention}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

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
          <div className={styles.missionEmpty}>Grabbing today's practices...</div>
        ) : (
          <div className={styles.missionAllDone}>
            <span>🎉</span>
            <span>All done for today. Nice work.</span>
          </div>
        )}
      </div>

      {/* ── Quick stats ──────────────────────────────────────────────────── */}
      <div className={styles.statsRow}>
        <div className={styles.statPill}>
          <span className={styles.statNum}>{missionsToday}/3</span>
          <span className={styles.statLabel}>practices done</span>
        </div>
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
