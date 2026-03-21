import { useEffect, useState } from 'react'
import styles from './Step2Loop.module.css'

interface Props {
  onNext: () => void
  onBack: () => void
}

const LOOP_STEPS = [
  { emoji: '📳', label: 'Notification pops up' },
  { emoji: '📱', label: 'You pick it up' },
  { emoji: '👆', label: 'You start scrolling' },
  { emoji: '😑', label: 'You feel kind of blah' },
  { emoji: '⬇️', label: 'You put it down' },
]

export default function Step2Loop({ onNext, onBack }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % LOOP_STEPS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Here's what's going on in your brain</h1>

        {/* Loop diagram */}
        <div className={styles.loopDiagram} aria-label="The scroll loop visualization">
          {LOOP_STEPS.map((s, i) => (
            <div key={i} className={styles.loopRow}>
              <div className={`${styles.loopStep} ${i === activeIndex ? styles.loopStepActive : ''}`}>
                <span className={styles.loopEmoji}>{s.emoji}</span>
                <span className={styles.loopLabel}>{s.label}</span>
              </div>
              {i < LOOP_STEPS.length - 1 && (
                <div className={`${styles.loopArrow} ${i === activeIndex ? styles.loopArrowActive : ''}`}>↓</div>
              )}
            </div>
          ))}
          <div className={`${styles.loopBack} ${activeIndex === LOOP_STEPS.length - 1 ? styles.loopBackActive : ''}`}>
            ↩ And it starts again
          </div>
        </div>

        <div className={styles.explanation}>
          <p>
            Every time this loop runs, your brain's reward center gets a tiny hit of dopamine. That's the same chemical involved in gambling and substance addiction. Over time your brain starts needing those hits just to feel normal.
          </p>
          <p>
            The good news? This loop can be broken. It takes about 2 to 3 weeks of small, consistent changes. That's exactly what Unloop is built to help you do.
          </p>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          What kind of changes?
        </button>
      </div>
    </div>
  )
}
