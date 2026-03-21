import { useState } from 'react'
import styles from './Step7Schedule.module.css'

interface Props {
  initialTime: string
  initialEvening: boolean
  onNext: (reminderTime: string, eveningEnabled: boolean) => void
  onBack: () => void
  onSkip: () => void
}

export default function Step7Schedule({ initialTime, initialEvening, onNext, onBack, onSkip }: Props) {
  const [time, setTime] = useState(initialTime)
  const [eveningEnabled, setEveningEnabled] = useState(initialEvening)

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>When should we remind you?</h1>
        <p className={styles.sub}>
          We'll send you your daily practices at this time. Most people like getting them in the morning.
        </p>

        <div className={styles.timeCard}>
          <label className={styles.timeLabel} htmlFor="reminder-time">
            Daily reminder time
          </label>
          <input
            id="reminder-time"
            className={styles.timePicker}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <p className={styles.hint}>
          You can also turn on an evening streak reminder for times you haven't done your practices yet.
        </p>

        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>Evening streak reminder</span>
            <span className={styles.toggleSub}>Sends at 6:00 PM if you haven't finished yet</span>
          </div>
          <button
            className={`${styles.toggle} ${eveningEnabled ? styles.toggleOn : ''}`}
            onClick={() => setEveningEnabled((v) => !v)}
            role="switch"
            aria-checked={eveningEnabled}
            aria-label="Evening streak reminder"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        <button className={styles.skipBtn} onClick={onSkip}>
          Skip setup
        </button>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={() => onNext(time, eveningEnabled)}>
          One more thing
        </button>
      </div>
    </div>
  )
}
