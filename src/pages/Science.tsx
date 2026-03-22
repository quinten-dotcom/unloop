import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SCIENCE_CARDS } from '../data/scienceCards'
import type { ScienceCard, ScienceCategory } from '../data/scienceCards'
import { MISSIONS } from '../data/missions'
import { useProStore } from '../store/useProStore'
import PaywallSheet from '../components/PaywallSheet'
import styles from './Science.module.css'

// ── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Brain', 'Habits', 'Body', 'Relationships', 'Focus', 'Behavior', 'Environment', 'Recovery'] as const
type FilterCategory = typeof CATEGORIES[number]

const CATEGORY_META: Record<ScienceCategory, { color: string; bg: string; icon: string }> = {
  Brain:         { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',   icon: '🧠' },
  Behavior:      { color: '#FB923C', bg: 'rgba(251,146,60,0.12)',   icon: '🔄' },
  Environment:   { color: '#34D399', bg: 'rgba(52,211,153,0.12)',   icon: '🌿' },
  Recovery:      { color: '#A78BFA', bg: 'rgba(167,139,250,0.12)',  icon: '⚡' },
  Habits:        { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',   icon: '🔁' },
  Body:          { color: '#EC4899', bg: 'rgba(236,72,153,0.12)',   icon: '💪' },
  Relationships: { color: '#10B981', bg: 'rgba(16,185,129,0.12)',   icon: '🤝' },
  Focus:         { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)',   icon: '🎯' },
}

/** Split a 2-sentence body into two paragraphs at the first period. */
function splitBody(body: string): [string, string] {
  const idx = body.indexOf('. ')
  if (idx === -1) return [body, '']
  return [body.slice(0, idx + 1), body.slice(idx + 2)]
}

// ── useInView hook ────────────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible] as const
}

// ── Science Card component ───────────────────────────────────────────────────

function ScienceCardItem({ card, index }: { card: ScienceCard; index: number }) {
  const navigate = useNavigate()
  const [ref, visible] = useInView()
  const [showSource, setShowSource] = useState(false)
  const [para1, para2] = splitBody(card.body)
  const meta = CATEGORY_META[card.category]

  // Find missions that reference this science card
  const relatedMissions = MISSIONS.filter((m) => m.scienceCardId === card.id)
  const primaryMission  = relatedMissions[0]

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${Math.min(index, 3) * 60}ms` }}
    >
      {/* Category badge */}
      <div
        className={styles.categoryBadge}
        style={{ color: meta.color, background: meta.bg }}
      >
        <span>{meta.icon}</span>
        <span>{card.category}</span>
      </div>

      {/* Title */}
      <h2 className={styles.cardTitle}>{card.title}</h2>

      {/* Key stat */}
      <div className={styles.keyStatBox}>
        <p className={styles.keyStat}>{card.keyStat}</p>
      </div>

      {/* Body paragraphs */}
      <div className={styles.bodyText}>
        <p>{para1}</p>
        {para2 && <p>{para2}</p>}
      </div>

      {/* Source — expandable */}
      <div className={styles.sourceRow}>
        <button
          className={styles.viewSourceBtn}
          onClick={() => setShowSource((s) => !s)}
          aria-expanded={showSource}
        >
          {showSource ? 'Hide source ▴' : 'View source ▾'}
        </button>
        {showSource && <p className={styles.sourceExpanded}>{card.source}</p>}
      </div>

      {/* Related practice */}
      {primaryMission && (
        <div className={styles.relatedRow}>
          <span className={styles.relatedLabel}>related practice</span>
          <button
            className={styles.relatedTag}
            onClick={() => navigate('/missions')}
          >
            <span>{primaryMission.emoji}</span>
            <span>{primaryMission.name}</span>
            <span className={styles.relatedArrow}>→</span>
          </button>
        </div>
      )}

      {relatedMissions.length > 1 && (
        <p className={styles.relatedMore}>
          +{relatedMissions.length - 1} more practice{relatedMissions.length > 2 ? 's' : ''} use this
        </p>
      )}
    </div>
  )
}

// ── All Sources panel ────────────────────────────────────────────────────────

function AllSources({ open }: { open: boolean }) {
  return (
    <div className={`${styles.sourcesPanel} ${open ? styles.sourcesPanelOpen : ''}`}>
      <p className={styles.sourcesHeader}>all {SCIENCE_CARDS.length} sources</p>
      {SCIENCE_CARDS.map((card) => (
        <div key={card.id} className={styles.sourceEntry}>
          <span className={styles.sourceEntryTitle}>{card.title}</span>
          <p className={styles.sourceEntryText}>{card.source}</p>
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

const FREE_SCIENCE_LIMIT = 10  // free users see first 10 cards

export default function Science() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')
  const [showSources, setShowSources] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)
  const { isPro } = useProStore()

  const filtered = activeCategory === 'All'
    ? SCIENCE_CARDS
    : SCIENCE_CARDS.filter((c) => c.category === activeCategory)

  // Scroll active tab into view when it changes
  useEffect(() => {
    const container = tabsRef.current
    if (!container) return
    const activeEl = container.querySelector('[data-active="true"]') as HTMLElement
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeCategory])

  return (
    <div className={styles.page}>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Why This Works</h1>
        <p className={styles.subtitle}>
          Every practice in Unloop is based on actual research. Here's what the science says.
        </p>
        <p className={styles.cardPoolHint}>{SCIENCE_CARDS.length} cards across 8 topics</p>
      </div>

      {/* ── Category filter tabs ───────────────────────────────────────── */}
      <div className={styles.tabsWrap} ref={tabsRef}>
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory
          const meta = cat !== 'All' ? CATEGORY_META[cat as ScienceCategory] : null
          const count = cat === 'All'
            ? SCIENCE_CARDS.length
            : SCIENCE_CARDS.filter((c) => c.category === cat).length
          return (
            <button
              key={cat}
              data-active={isActive}
              aria-pressed={isActive}
              aria-label={`Filter by ${cat}`}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              style={isActive && meta ? {
                color: meta.color,
                borderColor: meta.color,
                background: meta.bg,
              } : undefined}
              onClick={() => setActiveCategory(cat)}
            >
              {meta && <span aria-hidden="true">{meta.icon}</span>}
              {cat}
              <span className={styles.tabCount}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* ── Card count ────────────────────────────────────────────────── */}
      <p className={styles.cardCount}>
        {filtered.length} {filtered.length === 1 ? 'study' : 'studies'}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ' total'}
      </p>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div className={styles.cardList}>
        {filtered.map((card, i) => {
          // Free users see first FREE_SCIENCE_LIMIT cards in the All view,
          // or the first FREE_SCIENCE_LIMIT across all filtered views
          const globalIndex = SCIENCE_CARDS.indexOf(card)
          const isLocked = !isPro && globalIndex >= FREE_SCIENCE_LIMIT
          return isLocked ? (
            <div
              key={card.id}
              className={styles.lockedCard}
              aria-label="Locked science card"
              onClick={() => setShowPaywall(true)}
              role="button"
            >
              <div className={styles.lockedBlur}>
                <h2 className={styles.lockedTitle}>{card.title}</h2>
              </div>
              <div className={styles.lockedOverlay}>
                <span className={styles.lockIcon}>✨</span>
                <span className={styles.lockMsg}>Part of the full science library. Upgrade to Pro to read all {SCIENCE_CARDS.length}+ cards.</span>
              </div>
            </div>
          ) : (
            <ScienceCardItem key={card.id} card={card} index={i} />
          )
        })}
      </div>

      {showPaywall && (
        <PaywallSheet
          title="Full Science Library"
          body={`You've got access to ${FREE_SCIENCE_LIMIT} science cards on the free plan. Pro unlocks all ${SCIENCE_CARDS.length}+ cards covering every trigger, habit, and recovery topic in the app.`}
          onClose={() => setShowPaywall(false)}
        />
      )}

      {/* ── All Sources ───────────────────────────────────────────────── */}
      <div className={styles.sourcesSection}>
        <button
          className={styles.sourcesToggle}
          onClick={() => setShowSources((s) => !s)}
          aria-expanded={showSources}
          aria-controls="all-sources-panel"
        >
          <span>📄 All Sources</span>
          <span className={`${styles.chevron} ${showSources ? styles.chevronUp : ''}`} aria-hidden="true">▾</span>
        </button>
        <AllSources open={showSources} />
      </div>
    </div>
  )
}
