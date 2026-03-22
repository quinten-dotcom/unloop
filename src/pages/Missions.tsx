import { useEffect, useState, useCallback } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore, isMissionCompleted, TOTAL_MISSIONS } from '../store/useMissionStore'
import { useProStore } from '../store/useProStore'
import PaywallSheet from '../components/PaywallSheet'
import { useChallengeStore, getChallengeHour } from '../store/useChallengeStore'
import { getLevelFromXP } from '../data/levels'
import { getScienceCard, SCIENCE_CARDS } from '../data/scienceCards'
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
import { TWO_MINUTE_VERSIONS } from '../data/twoMinuteVersions'
import styles from './Missions.module.css'

// ── Daily context messages ────────────────────────────────────────────────────

const DAILY_CONTEXT = [
  "Today's practices are building your ability to choose instead of react.",
  "Small actions today, real brain changes this week.",
  "Each practice you complete makes the loop a little weaker.",
  "Your brain can't change in a day, but it can change one day at a time. Today counts.",
  "The difference between Level 1 and Level 7 is just a bunch of days like today.",
  "Consistency beats intensity every time. Showing up today is enough.",
  "Three small things done is better than ten big things planned.",
  "Every time you complete a practice, you're voting for who you want to be.",
  "Your future self is watching you make this choice right now.",
  "The urge to scroll is your brain's autopilot talking. You don't have to listen.",
  "Awareness is the first step. You're already doing the hard part by being here.",
  "Progress isn't always visible. Keep going anyway.",
  "You've got three practices standing between you and another day of intentional living.",
  "The science says this works. The only variable is showing up.",
  "Other people scroll away their evenings. You're doing something different.",
  "Two minutes of effort now, better brain chemistry all day.",
  "The loop gets quieter every time you don't feed it.",
  "Habits are built in the ordinary moments, not the dramatic ones. Like right now.",
  "Your streak exists because you keep showing up. Today is just one more.",
  "Small and consistent beats big and sporadic. You're on the right path.",
]

function getDailyContextMessage(): string {
  const today = new Date().toISOString().slice(0, 10)
  let hash = 0
  for (let i = 0; i < today.length; i++) {
    hash = (Math.imul(31, hash) + today.charCodeAt(i)) | 0
  }
  return DAILY_CONTEXT[Math.abs(hash) % DAILY_CONTEXT.length]
}

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
  | { step: 'science';  card: ScienceCard; xpEarned: number; prevLevel: number; completedMissionId: string }
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
  onCompleteTwoMin,
  onViewScience,
}: {
  mission: Mission
  index: number
  done: boolean
  isSurprise?: boolean
  onComplete: (mission: Mission, e: React.MouseEvent) => void
  onCompleteTwoMin: (mission: Mission, xp: number, e: React.MouseEvent) => void
  onViewScience: (id: string) => void
}) {
  const [showTwoMin, setShowTwoMin] = useState(false)
  const twoMin = TWO_MINUTE_VERSIONS.find((v) => v.missionId === mission.id)

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

      {/* Two-minute version */}
      {twoMin && !done && (
        <div className={styles.twoMinWrap}>
          <button
            className={styles.twoMinToggle}
            onClick={() => setShowTwoMin((s) => !s)}
            aria-expanded={showTwoMin}
          >
            {showTwoMin ? '▲' : '▼'} Too much? Try the 2-minute version
          </button>
          {showTwoMin && (
            <div className={styles.twoMinContent}>
              <p className={styles.twoMinDesc}>{twoMin.description}</p>
              <button
                className={styles.twoMinBtn}
                onClick={(e) => onCompleteTwoMin(mission, twoMin.xpReward, e)}
              >
                Done (2-min) · +{twoMin.xpReward} XP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


// ── Bonus card ───────────────────────────────────────────────────────────────

function BonusCard({
  mission,
  unlocked,
  done,
  isPro,
  onComplete,
  onViewScience,
  onPaywall,
}: {
  mission: Mission | null
  unlocked: boolean
  done: boolean
  isPro: boolean
  onComplete: (mission: Mission, e: React.MouseEvent) => void
  onViewScience: (id: string) => void
  onPaywall: () => void
}) {
  if (!isPro) {
    return (
      <div className={`${styles.bonusWrap}`}>
        <div className={styles.bonusHeader}>
          <span className={styles.bonusLabel}>⚡ Bonus practice</span>
          <span className={styles.bonusLockLabel}>Pro feature</span>
        </div>
        <div className={`${styles.bonusContent} ${styles.bonusBlurred}`}>
          {mission ? (
            <MissionCard
              mission={mission}
              index={3}
              done={false}
              onComplete={() => {}}
              onCompleteTwoMin={() => {}}
              onViewScience={() => {}}
            />
          ) : (
            <div className={styles.bonusPlaceholder}>bonus practice</div>
          )}
        </div>
        <div className={styles.bonusLockOverlay} onClick={onPaywall} role="button">
          <span className={styles.lockIcon}>✨</span>
          <span className={styles.lockText}>Upgrade to Pro to unlock a bonus practice every day</span>
        </div>
      </div>
    )
  }

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
            onCompleteTwoMin={() => {}}
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

  const { isPro } = useProStore()
  const [showBonusPaywall, setShowBonusPaywall] = useState(false)

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
    returnDayNote,
  } = useMissionStore()

  // Surprise mission data lookup
  const surpriseMission = surpriseMissionId
    ? SURPRISE_MISSIONS.find((m) => m.id === surpriseMissionId) ?? null
    : null

  const { active: activeChallenge } = useChallengeStore()

  const [timeToReset,    setTimeToReset]    = useState(getTimeToMidnight)
  const [xpFlies,        setXpFlies]        = useState<XPFlyItem[]>([])
  const [flow,           setFlow]           = useState<FlowStep>({ step: 'idle' })
  const [lastCardId,     setLastCardId]     = useState<string | null>(null)

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
    (mission: Mission, evidence: string | undefined, e?: React.MouseEvent, overrideXP?: number) => {
      const prevLevel = level
      const xpEarned = overrideXP ?? mission.xpReward

      completeMission(mission.id, evidence)
      addXP(xpEarned)
      updateStats({ totalMissionsCompleted: totalMissionsCompleted + 1 })
      completeStreakDay()

      // Toast for mission completion
      const newDoneCount = doneCount + 1
      const nextLvl      = LEVELS.find((l) => l.minXP > xp + xpEarned)
      toastMissionComplete(xpEarned, newDoneCount, nextLvl?.name ?? 'max level')

      if (e) triggerXPFly(xpEarned, e)

      setFlow({ step: 'idle' })

      setTimeout(() => {
        const card = getScienceCard(mission.scienceCardId)
        if (card) {
          let cardToShow = card
          if (card.id === lastCardId) {
            const alternate = SCIENCE_CARDS.find(
              (c) => c.category === card.category && c.id !== card.id,
            )
            if (alternate) cardToShow = alternate
          }
          setLastCardId(cardToShow.id)
          setFlow({ step: 'science', card: cardToShow, xpEarned, prevLevel, completedMissionId: mission.id })
        }
      }, 750)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, totalMissionsCompleted]
  )

  function handleCompleteTwoMin(mission: Mission, xp: number, e: React.MouseEvent) {
    if (mission.requiresEvidence) {
      // For two-min, skip evidence even if mission normally requires it
    }
    processCompletion(mission, undefined, e, xp)
  }

  function handleCompleteClick(mission: Mission, e: React.MouseEvent) {
    if (mission.requiresEvidence) {
      setFlow({ step: 'evidence', mission })
    } else {
      processCompletion(mission, undefined, e)
    }
  }

  function handleEvidenceSubmit(text: string) {
    if (flow.step !== 'evidence') return
    if (!text.trim()) return
    processCompletion(flow.mission, text.trim())
  }

  function handleScienceDismiss() {
    if (flow.step !== 'science') return
    proceedAfterStack(flow.prevLevel)
  }

  function proceedAfterStack(prevLevel: number) {
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
    if (card) {
      setLastCardId(card.id)
      setFlow({ step: 'science', card, xpEarned: 0, prevLevel: level, completedMissionId: '' })
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const challengeHour = activeChallenge
    ? Math.min(getChallengeHour(activeChallenge.startedAt), activeChallenge.totalHours)
    : 0

  return (
    <div className={styles.page}>

      {/* ── Return-day banner ──────────────────────────────────────────── */}
      {returnDayNote && (
        <div className={styles.returnDayBanner}>
          We picked some easy ones to start you back. Tomorrow's will be more your speed.
        </div>
      )}

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

      {/* ── Daily context ─────────────────────────────────────────────── */}
      <p className={styles.dailyContext}>{getDailyContextMessage()}</p>

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
              onCompleteTwoMin={handleCompleteTwoMin}
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
              onCompleteTwoMin={handleCompleteTwoMin}
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
        isPro={isPro}
        onComplete={handleCompleteClick}
        onViewScience={handleViewScience}
        onPaywall={() => setShowBonusPaywall(true)}
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

      {showBonusPaywall && (
        <PaywallSheet
          title="Bonus Practice"
          body="Nice work finishing all 3. Upgrade to Pro to unlock a bonus practice every day."
          onClose={() => setShowBonusPaywall(false)}
        />
      )}

    </div>
  )
}
