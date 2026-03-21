import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LEVELS } from '../data/levels'
import styles from './HowItWorks.module.css'

// ── useInView ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref     = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, vis] as const
}

// ── Section wrapper that fades in ─────────────────────────────────────────────

function FadeSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, vis] = useInView(0.2)
  return (
    <div
      ref={ref}
      className={`${styles.fadeSection} ${vis ? styles.fadeSectionVisible : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

// ── Loop cycle diagram ────────────────────────────────────────────────────────

const LOOP_STEPS = [
  { emoji: '🔔', label: 'notification pops up' },
  { emoji: '📱', label: 'you pick up your phone' },
  { emoji: '📜', label: 'you scroll for way longer than planned' },
  { emoji: '😶', label: 'you put it down feeling kinda blah' },
]

function LoopDiagram() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % LOOP_STEPS.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.loopDiagram} aria-label="The phone loop cycle">
      {LOOP_STEPS.map((step, i) => (
        <div key={i} className={`${styles.loopStep} ${active === i ? styles.loopStepActive : ''}`}>
          <div className={styles.loopEmoji}>{step.emoji}</div>
          <div className={styles.loopLabel}>{step.label}</div>
          {i < LOOP_STEPS.length - 1 && <div className={styles.loopArrow}>↓</div>}
          {i === LOOP_STEPS.length - 1 && <div className={styles.loopBack}>↩ repeat</div>}
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── Back button ───────────────────────────────────────────────── */}
      <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
        ← back
      </button>

      {/* ── Section 1: Hero ───────────────────────────────────────────── */}
      <FadeSection className={styles.hero}>
        <h1 className={styles.heroTitle}>your phone was designed to keep you scrolling</h1>
        <p className={styles.heroSub}>
          unloop was designed to help you stop. here's how it actually works.
        </p>
      </FadeSection>

      {/* ── Section 2: The Loop ───────────────────────────────────────── */}
      <FadeSection className={styles.section}>
        <h2 className={styles.sectionTitle}>the loop</h2>
        <LoopDiagram />
        <p className={styles.sectionBody}>
          every time you pick up your phone without thinking about it, your brain gets a tiny hit of dopamine. it feels good for a second so your brain wants to do it again. and again. and again. that's the loop. and it's literally the same mechanism behind slot machines.
        </p>
      </FadeSection>

      {/* ── Section 3: How Unloop breaks it ──────────────────────────── */}
      <FadeSection className={styles.section}>
        <h2 className={styles.sectionTitle}>how unloop breaks it</h2>
        <div className={styles.cards}>

          <div className={styles.card}>
            <div className={styles.cardIcon}>⏸</div>
            <h3 className={styles.cardTitle}>the pause</h3>
            <p className={styles.cardBody}>
              before you open your scroll apps, unloop gives you 10 seconds. not a block. not a lecture. just a pause. enough time to ask yourself "do i actually want to be doing this right now?" research shows that this tiny bit of friction works better than blocking apps entirely, because you're not fighting yourself. you're just giving yourself a chance to choose.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>✅</div>
            <h3 className={styles.cardTitle}>daily practices</h3>
            <p className={styles.cardBody}>
              every day you get 3 small things to try. stuff like leaving your phone out of the bedroom, or going for a walk without it, or calling someone instead of texting. they take a few minutes each and they're all based on stuff that's actually been shown to help people use their phones less without feeling deprived.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📈</div>
            <h3 className={styles.cardTitle}>leveling up</h3>
            <p className={styles.cardBody}>
              as you do practices and use the pause feature, you earn XP and level up. each level unlocks new tools, deeper insights about your habits, and new challenges. the leveling system uses the same reward mechanics that make apps addictive... but pointed in a direction that actually helps you.
            </p>
          </div>

        </div>
      </FadeSection>

      {/* ── Section 4: The levels ─────────────────────────────────────── */}
      <FadeSection className={styles.section}>
        <h2 className={styles.sectionTitle}>the levels</h2>
        <div className={styles.levelsRow}>
          {LEVELS.map((lvl, i) => (
            <div key={lvl.level} className={styles.levelItem}>
              <div className={styles.levelCircle} style={{ opacity: 0.3 + i * 0.1 }}>
                {lvl.level}
              </div>
              <span className={styles.levelName}>{lvl.name}</span>
              <span className={styles.levelDesc}>{lvl.description}</span>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── Section 5: Closing ────────────────────────────────────────── */}
      <FadeSection className={styles.closing}>
        <p className={styles.closingText}>
          unloop isn't about throwing your phone in a lake or going off the grid. it's about using your phone because you chose to, not because you couldn't stop. you'll still watch videos and check social media and all that. the difference is you'll do it on purpose.
        </p>
        <button
          className={styles.ctaBtn}
          onClick={() => navigate('/missions')}
        >
          start your first practice →
        </button>
      </FadeSection>

    </div>
  )
}
