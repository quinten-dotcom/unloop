import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { LEVELS, xpToNextLevel } from '../data/levels'
import { UNLOCKS_BY_LEVEL } from '../data/unlocks'
import ShareCardModal from '../components/ShareCardModal'
import { buildMilestoneData } from '../utils/shareCard'
import type { MilestoneData } from '../utils/shareCard'
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
  if (score >= 71) return '#10B981'
  if (score >= 41) return '#F59E0B'
  return '#EF4444'
}

function scoreLabel(score: number): string {
  if (score >= 71) return 'Your intentional practice is actually working. Keep it up.'
  if (score >= 41) return "You're building something real. Show up again tomorrow."
  if (score >= 1)  return 'Every practice is moving something. Seriously.'
  return "Complete today's practices to get your first score."
}

function getLast7DayNames(): string[] {
  const SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return SHORT[d.getDay()]
  })
}

function computeStreakDots(
  humanStreak: number,
  lastActiveDate: string | null
): Array<'complete' | 'today' | 'missed'> {
  const todayStr = new Date().toISOString().slice(0, 10)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dayStr = d.toISOString().slice(0, 10)

    if (dayStr === todayStr) {
      return lastActiveDate === todayStr ? 'complete' : 'today'
    }
    if (!lastActiveDate) return 'missed'

    const msAgo = new Date(lastActiveDate).getTime() - new Date(dayStr).getTime()
    const daysAgo = Math.round(msAgo / 86_400_000)
    return daysAgo >= 0 && daysAgo < humanStreak ? 'complete' : 'missed'
  })
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function reclaimedHours(missions: number, pauses: number): string {
  const hours = missions * 0.5 + pauses * (2 / 60)
  return hours < 1 ? `${Math.round(hours * 60)}m` : `${hours.toFixed(1)}h`
}

// ── What's Changing section ───────────────────────────────────────────────────

function getChangingMessage(streak: number): string {
  if (streak >= 30) {
    return "You've passed the threshold where most researchers see lasting behavioral change. The loop isn't gone forever, but you have the tools to catch it whenever it starts."
  }
  if (streak >= 14) {
    return "Real structural changes are happening. Your prefrontal cortex (that's the self-control part of your brain) is getting measurably stronger."
  }
  if (streak >= 7) {
    return "Your brain's dopamine receptors are starting to recalibrate. You might be noticing that everyday things like food, conversations, and being outside feel a little more enjoyable."
  }
  if (streak >= 4) {
    return "You're in the early stages of rewiring. The urges to scroll are still strong, but you're getting better at noticing them before you act."
  }
  return "You've just started building a new pattern. Your brain is beginning to register that something is different."
}

function WhatsChangingSection({ streak }: { streak: number }) {
  const message = getChangingMessage(streak)
  return (
    <div className={styles.changingCard}>
      <span className={styles.changingLabel}>What's changing in your brain</span>
      <p className={styles.changingBody}>{message}</p>
    </div>
  )
}

// ── Human Score Card ─────────────────────────────────────────────────────────

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

// ── Weekly XP Chart ──────────────────────────────────────────────────────────

function WeeklyChart({ weeklyXP }: { weeklyXP: number[] }) {
  const [animated, setAnimated] = useState(false)
  const dayNames  = getLast7DayNames()
  const maxVal    = Math.max(...weeklyXP, 1)
  const totalWeek = weeklyXP.reduce((a, b) => a + b, 0)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>This week</span>
        <span className={styles.chartTotal}>{totalWeek} XP</span>
      </div>

      <div className={styles.chartArea}>
        {weeklyXP.map((val, i) => {
          const heightPct = val > 0 ? Math.max(5, (val / maxVal) * 100) : 0
          const isToday   = i === 6
          return (
            <div key={i} className={styles.chartCol}>
              <div className={styles.barTrack}>
                {val > 0 && (
                  <span className={`${styles.barLabel} ${animated ? styles.barLabelVisible : ''}`}
                    style={{ transitionDelay: `${i * 60 + 400}ms` }}>
                    {val}
                  </span>
                )}
                <div
                  className={`${styles.bar} ${isToday ? styles.barToday : ''} ${animated ? styles.barAnimated : ''}`}
                  style={{
                    height: `${heightPct}%`,
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              </div>
              <span className={`${styles.dayName} ${isToday ? styles.dayNameToday : ''}`}>
                {dayNames[i]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Streak Section ───────────────────────────────────────────────────────────

function StreakSection({
  humanStreak,
  bestStreak,
  lastActiveDate,
}: {
  humanStreak: number
  bestStreak: number
  lastActiveDate: string | null
}) {
  const dots = computeStreakDots(humanStreak, lastActiveDate)

  return (
    <div className={styles.streakCard}>
      <div className={styles.streakTop}>
        <div className={styles.streakMain}>
          <span className={styles.flame}>🔥</span>
          <div>
            <span className={styles.streakCount}>{humanStreak}</span>
            <span className={styles.streakUnit}> day{humanStreak !== 1 ? 's' : ''}</span>
            <div className={styles.streakBest}>Best: {bestStreak} days</div>
          </div>
        </div>
        <div className={styles.streakDots}>
          {dots.map((state, i) => (
            <div
              key={i}
              className={`${styles.dot} ${styles[`dot_${state}`]}`}
              style={{ animationDelay: `${i * 60}ms` }}
              title={state}
            />
          ))}
        </div>
      </div>
      <div className={styles.dotLegend}>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendGreen}`}/>Done</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendBlue}`}/>Today</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendGray}`}/>Missed</span>
      </div>
    </div>
  )
}

// ── Level Timeline ───────────────────────────────────────────────────────────

function LevelTimeline({
  currentLevel,
  xp,
  levelHistory,
}: {
  currentLevel: number
  xp: number
  levelHistory: Record<number, string>
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to current level on mount
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const nodeWidth = 96
    const target = (currentLevel - 1) * nodeWidth - container.offsetWidth / 2 + nodeWidth / 2
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [currentLevel])

  return (
    <div className={styles.timelineCard}>
      <span className={styles.timelineTitle}>Your path</span>

      <div className={styles.timelineScroll} ref={scrollRef}>
        {LEVELS.map((lvl, i) => {
          const reached  = lvl.level <= currentLevel
          const isCurrent = lvl.level === currentLevel
          const xpNeeded  = lvl.level > currentLevel ? lvl.minXP - xp : 0
          const dateStr   = levelHistory[lvl.level]

          return (
            <div key={lvl.level} className={styles.timelineItem}>
              {/* Connector line (before every node except the first) */}
              {i > 0 && (
                <div className={`${styles.connector} ${LEVELS[i - 1].level <= currentLevel ? styles.connectorDone : ''}`} />
              )}

              {/* Node circle */}
              <div
                className={`
                  ${styles.node}
                  ${reached  ? styles.nodeReached  : ''}
                  ${isCurrent ? styles.nodeCurrent  : ''}
                  ${!reached  ? styles.nodeLocked   : ''}
                `}
              >
                {reached
                  ? <span className={styles.nodeNum}>{lvl.level}</span>
                  : <span className={styles.nodeLock}>🔒</span>
                }
              </div>

              {/* Labels */}
              <span className={`${styles.nodeName} ${isCurrent ? styles.nodeNameCurrent : ''}`}>
                {lvl.name}
              </span>
              <span className={styles.nodeSub}>
                {isCurrent
                  ? `${xpToNextLevel(xp) ?? 0} XP left`
                  : reached
                    ? (dateStr ? formatShortDate(dateStr) : 'reached')
                    : `${xpNeeded} XP`
                }
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Insights ─────────────────────────────────────────────────────────────────

function InsightsSection({
  pauses,
  missions,
}: {
  pauses: number
  missions: number
}) {
  const hours = reclaimedHours(missions, pauses)

  return (
    <div className={styles.insightsSection}>
      <span className={styles.insightsTitle}>Your stats</span>
      <div className={styles.insightGrid}>
        <div className={styles.insightCard}>
          <span className={styles.insightIcon}>⏸️</span>
          <span className={styles.insightNum}>{pauses}</span>
          <span className={styles.insightLabel}>intentional pauses</span>
        </div>
        <div className={styles.insightCard}>
          <span className={styles.insightIcon}>✅</span>
          <span className={styles.insightNum}>{missions}</span>
          <span className={styles.insightLabel}>practices done</span>
        </div>
      </div>
      <div className={styles.insightCardWide}>
        <div className={styles.insightWideLeft}>
          <span className={styles.insightIcon}>⏱️</span>
          <div>
            <span className={styles.insightLabel}>time back from mindless scrolling</span>
            <div className={styles.insightSubLabel}>roughly 30 min per practice · 2 min per pause</div>
          </div>
        </div>
        <span className={styles.insightNumLarge}>{hours}</span>
      </div>
    </div>
  )
}

// ── Milestones collection ─────────────────────────────────────────────────────

function MilestonesSection({
  earnedMilestones,
  levelHistory,
  levelName,
}: {
  earnedMilestones: Array<{ id: string; earnedAt: string }>
  levelHistory: Record<number, string>
  levelName: string
}) {
  const [selected, setSelected] = useState<MilestoneData | null>(null)

  if (earnedMilestones.length === 0) return null

  function buildFromId(id: string, earnedAt: string): MilestoneData | null {
    if (id === 'unlooped') {
      const start = Object.values(levelHistory).sort()[0]
      const days  = start
        ? Math.round((Date.parse(earnedAt) - Date.parse(start)) / 86_400_000)
        : undefined
      return buildMilestoneData('unlooped', { daysActive: days })
    }
    if (id === 'streak-7')  return buildMilestoneData('streak-7', {})
    if (id === 'streak-30') return buildMilestoneData('streak-30', {})
    if (id.startsWith('level-')) {
      const lvl = parseInt(id.replace('level-', ''), 10)
      return buildMilestoneData('level-up', { level: lvl, levelName })
    }
    if (id.startsWith('score-')) {
      const score = parseInt(id.replace('score-', ''), 10)
      return buildMilestoneData('human-score-90', { humanScore: score })
    }
    if (id.startsWith('challenge-')) {
      const name = id.replace('challenge-', '').replace(/-/g, ' ')
      return buildMilestoneData('challenge-complete', { challengeName: name })
    }
    return null
  }

  return (
    <div className={styles.milestonesCard}>
      <span className={styles.milestonesTitle}>Milestones</span>
      <div className={styles.milestonesGrid}>
        {earnedMilestones.map((m) => {
          const data = buildFromId(m.id, m.earnedAt)
          if (!data) return null
          return (
            <button
              key={m.id}
              className={styles.milestoneThumbnail}
              onClick={() => setSelected(data)}
              aria-label={`Share ${data.achievement}`}
            >
              <div className={styles.thumbnailInner}>
                <span className={styles.thumbnailText}>{data.achievement}</span>
                <span className={styles.thumbnailShare}>↗</span>
              </div>
            </button>
          )
        })}
      </div>
      {selected && (
        <ShareCardModal
          milestone={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

// ── Unlock Roadmap ────────────────────────────────────────────────────────────

function UnlockRoadmap({
  currentLevel,
  xp,
  levelHistory,
}: {
  currentLevel: number
  xp: number
  levelHistory: Record<number, string>
}) {
  return (
    <div className={styles.roadmapCard}>
      <span className={styles.roadmapTitle}>What's coming</span>
      <div className={styles.roadmapList}>
        {LEVELS.map((lvl) => {
          const reached   = lvl.level < currentLevel
          const isCurrent = lvl.level === currentLevel
          const locked    = lvl.level > currentLevel
          const unlocks   = UNLOCKS_BY_LEVEL[lvl.level] ?? []
          const dateStr   = levelHistory[lvl.level]
          const xpLeft    = locked ? lvl.minXP - xp : 0

          return (
            <div
              key={lvl.level}
              className={`${styles.roadmapRow} ${reached ? styles.roadmapReached : ''} ${isCurrent ? styles.roadmapCurrent : ''} ${locked ? styles.roadmapLocked : ''}`}
            >
              {/* Left connector line */}
              <div className={styles.roadmapLeft}>
                <div className={styles.roadmapDot}>
                  {reached   ? <span className={styles.roadmapDotCheck}>✓</span>   : null}
                  {isCurrent ? <span className={styles.roadmapDotNum}>{lvl.level}</span> : null}
                  {locked    ? <span className={styles.roadmapDotNum}>{lvl.level}</span> : null}
                </div>
                {lvl.level < LEVELS.length && <div className={styles.roadmapLine} />}
              </div>

              {/* Content */}
              <div className={`${styles.roadmapContent} ${locked ? styles.roadmapContentBlur : ''}`}>
                <div className={styles.roadmapMeta}>
                  <span className={styles.roadmapName}>Level {lvl.level}: {lvl.name}</span>
                  {reached   && dateStr && <span className={styles.roadmapDate}>{formatShortDate(dateStr)}</span>}
                  {isCurrent && <span className={styles.roadmapStatus}>{xpToNextLevel(xp) ?? 0} XP left</span>}
                  {locked    && <span className={styles.roadmapXPNeeded}>{xpLeft} XP away</span>}
                </div>

                {reached ? (
                  <span className={styles.roadmapUnlockCount}>
                    unlocked {unlocks.length} feature{unlocks.length !== 1 ? 's' : ''}
                  </span>
                ) : isCurrent ? (
                  <span className={styles.roadmapCurrentDesc}>{lvl.description}</span>
                ) : (
                  // Show just the first unlock as a teaser
                  unlocks[0] && (
                    <span className={styles.roadmapTeaser}>
                      {unlocks[0].icon} unlocks {unlocks[0].name}
                      {unlocks.length > 1 ? ` + ${unlocks.length - 1} more` : ''}
                    </span>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Progress() {
  const {
    xp,
    level,
    levelName,
    humanStreak,
    bestStreak,
    lastActiveDate,
    totalMissionsCompleted,
    totalPausesTriggered,
    weeklyXP,
    levelHistory,
    earnedMilestones,
  } = useUserStore()

  const humanScore = computeHumanScore(humanStreak, totalMissionsCompleted, level)

  return (
    <div className={styles.page}>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Your progress</h1>
        <div className={styles.levelBadge}>
          <span className={styles.levelDot} />
          Level {level}: {levelName}
        </div>
      </div>

      {/* ── What's Changing ───────────────────────────────────────────── */}
      <WhatsChangingSection streak={humanStreak} />

      {/* ── Score ─────────────────────────────────────────────────────── */}
      <HumanScoreCard score={humanScore} />

      {/* ── Milestones ────────────────────────────────────────────────── */}
      <MilestonesSection
        earnedMilestones={earnedMilestones}
        levelHistory={levelHistory}
        levelName={levelName}
      />

      {/* ── Weekly chart ──────────────────────────────────────────────── */}
      <WeeklyChart weeklyXP={weeklyXP} />

      {/* ── Streak ────────────────────────────────────────────────────── */}
      <StreakSection
        humanStreak={humanStreak}
        bestStreak={bestStreak}
        lastActiveDate={lastActiveDate}
      />

      {/* ── Level timeline ────────────────────────────────────────────── */}
      <LevelTimeline
        currentLevel={level}
        xp={xp}
        levelHistory={levelHistory}
      />

      {/* ── Unlock roadmap ────────────────────────────────────────────── */}
      <UnlockRoadmap
        currentLevel={level}
        xp={xp}
        levelHistory={levelHistory}
      />

      {/* ── Insights ──────────────────────────────────────────────────── */}
      <InsightsSection pauses={totalPausesTriggered} missions={totalMissionsCompleted} />
    </div>
  )
}
