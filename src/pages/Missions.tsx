import { useEffect, useState, useCallback } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted, TOTAL_MISSIONS } from '../store/useMissionStore'
import { useChallengeStore, getChallengeHour } from '../store/useChallengeStore'
import { getLevelFromXP } from '../data/levels'
import { getScienceCard } from '../data/scienceCards'
import { SURPRISE_MISSIONS } from '../data/missions'
import type { Mission } from '../data/missions'
import type { ScienceCard } from '../data/scienceCards'
import type { Level } from '../data/levels'
import EvidenceModal from '../components/EvidenceModal'
import ScienceCardModal from '../components/ScienceCardModal'
import LevelUpModal from '../components/LevelUpModal'
import UnlockRevealModal from '../components/UnlockRevealModal'
import { getUnlocksForLevel } from '../data/unlocks'
import { toastMissionComplete, toastLevelUp } from '../utils/toasts'
import { LEVELS } from '../data/levels'
import styles from './Missions.module.css'

// ── Helpers ──────────────────────────────────────────────────────────────────

function getTimeToMidnight(): string {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const diff = midnight.getTime() - now.getTime()
  const h = Math.floor(diff / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  return `${h}h ${m}m`
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
  })
}

const DIFF_LABELS: Record<string, string> = { easy: 'easy', medium: 'medium', hard: 'hard' }

// ── XP Fly element ───────────────────────────────────────────────────────────

interface XPFlyItem { id: number; amount: number; x: number; y: number }

// ── Flow state ───────────────────────────────────────────────────────────────

type FlowStep =
  | { step: 'idle' }
  | { step: 'evidence'; mission: Mission }
  | { step: 'science';  card: ScienceCard; xpEarned: number; prevLevel: number }
  | { step: 'levelup';  newLevel: Level }
  | { step: 'unlocks';  newLevel: Level }

// ── Surprise mystery card ─────────────────────────────────────────────────────

function SurpriseMysteryCard({ onReveal }: { onReveal: () => void }) {
  return (
    <div className={styles.mysteryCard} onClick={onReveal} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onReveal()}
      aria-label="Tap to reveal today's surprise practice"
    >
      <div className={styles.mysteryGiftBox}>🎁</div>
      <div className={styles.mysteryLabel}>Today's surprise practice</div>
      <div className={styles.mysteryHint}>Tap to reveal</div>
    </div>
  )
}

// ── Mission card ─────────────────────────────────────────────────────────────

function MissionCard({
  mission,
  index,
  done,
  isSurprise,
  onComplete,
  onViewScience,
}: {
  mission: Mission
  index: number
  done: boolean
  isSurprise?: boolean
  onComplete: (mission: Mission, e: React.MouseEvent) => void
  onViewScience: (id: string) => void
}) {
  return (
    <div
      className={`${styles.card} ${done ? styles.cardDone : ''} ${isSurprise ? styles.cardSurprise : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardLeft}>
          <span className={styles.cardEmoji}>{mission.emoji}</span>
          <span className={styles.cardName}>{mission.name}</span>
        </div>
        <div className={styles.cardBadges}>
          {isSurprise && <span className={styles.surpriseBadge}>🎁 Surprise</span>}
          <span className={styles.xpBadge}>+{mission.xpReward} XP</span>
          <span className={`${styles.diffBadge} ${styles[`diff_${mission.difficulty}`]}`}>
            {DIFF_LABELS[mission.difficulty]}
          </span>
        </div>
      </div>

      <p className={styles.cardDesc}>{mission.description}</p>

      <div className={styles.cardFooter}>
        <button
          className={done ? styles.completedBtn : styles.completeBtn}
          disabled={done}
          onClick={(e) => !done && onComplete(mission, e)}
        >
          {done ? '✓ Done' : 'Mark complete'}
        </button>
        <button
          className={styles.scienceLink}
          onClick={() => onViewScience(mission.scienceCardId)}
        >
          Why this works
        </button>
      </div>
    </div>
  )
}

// ── Bonus card ───────────────────────────────────────────────────────────────

function BonusCard({
  mission,
  unlocked,
  done,
  onComplete,
  onViewScience,
}: {
  mission: Mission | null
  unlocked: boolean
  done: boolean
  onComplete: (mission: Mission, e: React.MouseEvent) => void
  onViewScience: (id: string) => void
}) {
  return (
    <div className={`${styles.bonusWrap} ${unlocked ? styles.bonusActive : ''}`}>
      <div className={styles.bonusHeader}>
        <span className={styles.bonusLabel}>⚡ Bonus practice</span>
        {!unlocked && <span className={styles.bonusLockLabel}>Finish all 3 to unlock this</span>}
      </div>

      <div className={`${styles.bonusContent} ${!unlocked ? styles.bonusBlurred : ''}`}>
        {mission ? (
          <MissionCard
            mission={mission}
            index={3}
            done={done}
            onComplete={onComplete}
            onViewScience={onViewScience}
          />
        ) : (
          <div className={styles.bonusPlaceholder}>nothing extra today</div>
        )}
      </div>

      {!unlocked && (
        <div className={styles.bonusLockOverlay}>
          <span className={styles.lockIcon}>🔒</span>
          <span className={styles.lockText}>finish all 3 practices to unlock this</span>
        </div>
      )}
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function Missions() {
  const {
    xp, level, goal,
    addXP,
    updateStats,
    totalMissionsCompleted,
    completeStreakDay,
    earnMilestone,
  } = useUserStore()

  const {
    missions,
    bonusMission,
    bonusUnlocked,
    completed,
    generateDailyMissions,
    completeMission,
    surpriseMissionId,
    surpriseRevealed,
    revealSurprise,
  } = useMissionStore()

  // Surprise mission data lookup
  const surpriseMission = surpriseMissionId
    ? SURPRISE_MISSIONS.find((m) => m.id === surpriseMissionId) ?? null
    : null

  const { active: activeChallenge } = useChallengeStore()

  const [timeToReset, setTimeToReset]   = useState(getTimeToMidnight)
  const [xpFlies,     setXpFlies]       = useState<XPFlyItem[]>([])
  const [flow,        setFlow]          = useState<FlowStep>({ step: 'idle' })

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    generateDailyMissions(goal, level)
  }, [goal, level, generateDailyMissions])

  // ── Countdown ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setTimeToReset(getTimeToMidnight()), 60_000)
    return () => clearInterval(id)
  }, [])

  // ── Derived ───────────────────────────────────────────────────────────────
  const doneCount   = missions.filter((m) => isMissionCompleted(completed, m.id)).length
  const progressPct = (doneCount / 3) * 100

  const bonusDone = bonusMission
    ? isMissionCompleted(completed, bonusMission.id)
    : false

  // ── XP fly ───────────────────────────────────────────────────────────────
  function triggerXPFly(amount: number, e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const fly: XPFlyItem = {
      id: Date.now(),
      amount,
      x: rect.left + rect.width / 2,
      y: rect.top,
    }
    setXpFlies((prev) => [...prev, fly])
    setTimeout(() => setXpFlies((prev) => prev.filter((f) => f.id !== fly.id)), 1200)
  }

  // ── Completion logic ─────────────────────────────────────────────────────
  const processCompletion = useCallback(
    (mission: Mission, evidence: string | undefined, e?: React.MouseEvent) => {
      const prevLevel = level

      completeMission(mission.id, evidence)
      addXP(mission.xpReward)
      updateStats({ totalMissionsCompleted: totalMissionsCompleted + 1 })
      completeStreakDay()

      // Toast for mission completion
      const newDoneCount = doneCount + 1
      const nextLvl      = LEVELS.find((l) => l.minXP > xp + mission.xpReward)
      toastMissionComplete(mission.xpReward, newDoneCount, nextLvl?.name ?? 'max level')

      if (e) triggerXPFly(mission.xpReward, e)

      setFlow({ step: 'idle' })

      setTimeout(() => {
        const card = getScienceCard(mission.scienceCardId)
        if (card) {
          setFlow({ step: 'science', card, xpEarned: mission.xpReward, prevLevel })
        }
      }, 750)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, totalMissionsCompleted]
  )

  function handleCompleteClick(mission: Mission, e: React.MouseEvent) {
    if (mission.requiresEvidence) {
      setFlow({ step: 'evidence', mission })
    } else {
      processCompletion(mission, undefined, e)
    }
  }

  function handleEvidenceSubmit(text: string) {
    if (flow.step !== 'evidence') return
    processCompletion(flow.mission, text)
  }

  function handleScienceDismiss() {
    if (flow.step !== 'science') return
    const { prevLevel } = flow
    setFlow({ step: 'idle' })

    // Check for level-up (zustand state already updated by now)
    const newLevel = getLevelFromXP(xp)
    if (newLevel.level > prevLevel) {
      setTimeout(() => {
        setFlow({ step: 'levelup', newLevel })
      }, 100)
    }
  }

  function handleViewScience(scienceCardId: string) {
    const card = getScienceCard(scienceCardId)
    if (card) setFlow({ step: 'science', card, xpEarned: 0, prevLevel: level })
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const challengeHour = activeChallenge
    ? Math.min(getChallengeHour(activeChallenge.startedAt), activeChallenge.totalHours)
    : 0

  return (
    <div className={styles.page}>

      {/* ── Challenge banner ───────────────────────────────────────────── */}
      {activeChallenge && (
        <div className={styles.challengeBanner}>
          <span className={styles.pulseDot} />
          <span>
            ACTIVE: <strong>{activeChallenge.name}</strong>
            {' '}— Hour {challengeHour} of {activeChallenge.totalHours}
          </span>
        </div>
      )}

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Today's practices</h1>
          <span className={styles.resetLabel}>Resets in {timeToReset}</span>
        </div>
        <p className={styles.dateLabel}>{formatDate()}</p>
      </div>

      {/* ── Progress bar ──────────────────────────────────────────────── */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>{doneCount} of 3 done</span>
          {doneCount === 3 && (
            <span className={styles.progressComplete}>All done!</span>
          )}
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* ── Mission cards ─────────────────────────────────────────────── */}
      <div className={styles.missionList}>
        {missions.length === 0 ? (
          <div className={styles.loading}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.skeletonCard} aria-hidden="true">
                <div className={styles.skeletonRow}>
                  <div className={`${styles.skeletonCircle} skeleton`} />
                  <div className={`${styles.skeletonLine} skeleton`} />
                  <div className={`${styles.skeletonLineShort} skeleton`} />
                </div>
                <div className={`${styles.skeletonLine} skeleton`} style={{ width: '85%' }} />
                <div className={`${styles.skeletonLine} skeleton`} style={{ width: '65%' }} />
              </div>
            ))}
          </div>
        ) : (
          missions.map((m, i) => (
            <MissionCard
              key={m.id}
              mission={m}
              index={i}
              done={isMissionCompleted(completed, m.id)}
              onComplete={handleCompleteClick}
              onViewScience={handleViewScience}
            />
          ))
        )}

        {/* Surprise mission slot */}
        {surpriseMission && (
          surpriseRevealed ? (
            <MissionCard
              key={surpriseMission.id}
              mission={{
                ...surpriseMission,
                difficulty: 'medium',
                category: 'intentional',
              } as Mission}
              index={3}
              done={isMissionCompleted(completed, surpriseMission.id)}
              isSurprise
              onComplete={handleCompleteClick}
              onViewScience={handleViewScience}
            />
          ) : (
            <SurpriseMysteryCard key="mystery" onReveal={revealSurprise} />
          )
        )}
      </div>

      {/* ── Bonus card ────────────────────────────────────────────────── */}
      <BonusCard
        mission={bonusMission}
        unlocked={bonusUnlocked}
        done={bonusDone}
        onComplete={handleCompleteClick}
        onViewScience={handleViewScience}
      />

      {/* ── Tomorrow teaser (shown once all 3 core missions done) ──────── */}
      {doneCount >= 3 && (
        <div className={styles.tomorrowTeaser}>
          <span className={styles.teaserEmoji}>🌅</span>
          <p className={styles.teaserText}>
            tomorrow's practices are ready...<br />
            one of them might surprise you
          </p>
        </div>
      )}

      {/* ── Pool hint ─────────────────────────────────────────────────── */}
      <p className={styles.poolHint}>{TOTAL_MISSIONS} practices and counting</p>

      {/* ── XP fly elements ───────────────────────────────────────────── */}
      {xpFlies.map((fly) => (
        <div
          key={fly.id}
          className={styles.xpFly}
          style={{ left: fly.x, top: fly.y }}
        >
          +{fly.amount} XP
        </div>
      ))}

      {/* ── Modals ────────────────────────────────────────────────────── */}
      {flow.step === 'evidence' && (
        <EvidenceModal
          missionName={flow.mission.name}
          prompt={flow.mission.evidencePrompt ?? ''}
          onSubmit={handleEvidenceSubmit}
          onDismiss={() => setFlow({ step: 'idle' })}
        />
      )}

      {flow.step === 'science' && (
        <ScienceCardModal
          card={flow.card}
          xpEarned={flow.xpEarned}
          onDismiss={handleScienceDismiss}
        />
      )}

      {flow.step === 'levelup' && (
        <LevelUpModal
          newLevel={flow.newLevel}
          onClose={() => {
            // Earn level-up milestone
            earnMilestone(`level-${flow.newLevel.level}`)
            const unlocks = getUnlocksForLevel(flow.newLevel.level)
            if (unlocks.length > 0) {
              setFlow({ step: 'unlocks', newLevel: flow.newLevel })
            } else {
              setFlow({ step: 'idle' })
            }
          }}
        />
      )}

      {flow.step === 'unlocks' && (
        <UnlockRevealModal
          level={flow.newLevel.level}
          unlocks={getUnlocksForLevel(flow.newLevel.level)}
          onClose={() => {
            toastLevelUp(flow.newLevel.level)
            setFlow({ step: 'idle' })
          }}
        />
      )}

    </div>
  )
}
