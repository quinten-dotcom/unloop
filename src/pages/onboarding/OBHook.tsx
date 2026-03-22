import { useEffect, useState } from 'react'
import styles from './OBHook.module.css'

interface Props {
  onNext: () => void
}

const LOOP_STEPS = [
  { emoji: '📳', label: 'Notification' },
  { emoji: '📱', label: 'Pick it up' },
  { emoji: '👆', label: 'Scroll' },
  { emoji: '😑', label: 'Feel blah' },
  { emoji: '⬇️', label: 'Put it down' },
]

export default function OBHook({ onNext }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % LOOP_STEPS.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>You picked up your phone today around 96 times.</h1>
        <p className={styles.sub}>
          Most of those times, you did not even decide to. Your brain did it on autopilot.
        </p>

        {/* Compact horizontal loop diagram */}
        <div className={styles.loopWrap}>
          <div className={styles.loop}>
            {LOOP_STEPS.map((s, i) => (
              <div key={i} className={styles.loopItem}>
                <div className={`${styles.loopNode} ${i === activeIdx ? styles.loopNodeActive : ''}`}>
                  <span className={styles.loopEmoji}>{s.emoji}</span>
                  <span className={styles.loopLabel}>{s.label}</span>
                </div>
                {i < LOOP_STEPS.length - 1 && (
                  <span className={`${styles.loopArrow} ${i === activeIdx ? styles.loopArrowActive : ''}`}>→</span>
                )}
              </div>
            ))}
          </div>
          <div className={styles.loopReturn}>↩ and it starts again</div>
        </div>

        <p className={styles.body}>
          Every time this loop runs, your brain's reward center gets a tiny hit of dopamine. Over time your brain starts needing those hits just to feel normal. The good news is that this loop can be broken in 2 to 3 weeks of small changes.
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          How does it work?
        </button>
      </div>
    </div>
  )
}
