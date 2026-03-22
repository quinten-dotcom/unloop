import { useState } from 'react'
import styles from './Step8HumanMode.module.css'

interface Props {
  initialStart: string
  initialEnd: string
  initialActive: boolean
  onNext: (start: string, end: string, active: boolean) => void
  onBack: () => void
  onSkip: () => void
}

export default function Step8HumanMode({ initialStart, initialEnd, initialActive, onNext, onBack, onSkip }: Props) {
  const [start, setStart] = useState(initialStart)
  const [end, setEnd] = useState(initialEnd)
  const [active, setActive] = useState(initialActive)

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Set up The Pause</h1>

        {/* Before / After illustration */}
        <div className={styles.comparison}>
          <div className={styles.side}>
            <p className={styles.sideLabel}>Without The Pause</p>
            <div className={styles.sideFlow}>
              <span className={styles.flowStep}>📱 Open app</span>
              <span className={styles.flowArrow}>↓</span>
              <span className={styles.flowStep}>🌀 Scroll mindlessly</span>
              <span className={styles.flowArrow}>↓</span>
              <span className={styles.flowStep}>⏰ Lose an hour</span>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.side}>
            <p className={`${styles.sideLabel} ${styles.sideLabelBlue}`}>With The Pause</p>
            <div className={styles.sideFlow}>
              <span className={styles.flowStep}>📱 Open app</span>
              <span className={styles.flowArrow}>↓</span>
              <span className={`${styles.flowStep} ${styles.flowStepHighlight}`}>⏸ Pause appears</span>
              <span className={styles.flowArrow}>↓</span>
              <span className={styles.flowStep}>✅ You decide</span>
            </div>
          </div>
        </div>

        <p className={styles.explanation}>
          The Pause adds a 10-second pause before any of the apps you selected. It is not a block. You can always continue to the app. It just gives you a moment to decide if you actually want to.
        </p>

        {/* Active hours */}
        <div className={styles.hoursCard}>
          <p className={styles.hoursLabel}>When should The Pause be active?</p>
          <div className={styles.hoursRow}>
            <div className={styles.timeBlock}>
              <label className={styles.timeBlockLabel} htmlFor="hm-start">From</label>
              <input
                id="hm-start"
                className={styles.timePicker}
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <span className={styles.timeTo}>to</span>
            <div className={styles.timeBlock}>
              <label className={styles.timeBlockLabel} htmlFor="hm-end">Until</label>
              <input
                id="hm-end"
                className={styles.timePicker}
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>
          <p className={styles.hoursHint}>You can add more time blocks later in Settings.</p>
        </div>

        {/* Turn on now toggle */}
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>Turn on The Pause now</span>
            <span className={styles.toggleSub}>You can change this any time in Settings</span>
          </div>
          <button
            className={`${styles.toggle} ${active ? styles.toggleOn : ''}`}
            onClick={() => setActive((v) => !v)}
            role="switch"
            aria-checked={active}
            aria-label="Turn on Human Mode"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <button className={styles.skipBtn} onClick={onSkip}>
          Skip setup
        </button>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={() => onNext(start, end, active)}>
          I'm ready
        </button>
      </div>
    </div>
  )
}
