import { useState } from 'react'
import styles from './Step5Apps.module.css'

interface Props {
  initialApps: string[]
  onNext: (apps: string[]) => void
  onBack: () => void
  onSkip: () => void
}

const APP_LIST = [
  'TikTok',
  'Instagram',
  'X (Twitter)',
  'YouTube',
  'Snapchat',
  'Reddit',
  'Facebook',
  'Pinterest',
  'BeReal',
]

const DEFAULT_CHECKED = new Set(['TikTok', 'Instagram', 'X (Twitter)', 'YouTube'])

export default function Step5Apps({ initialApps, onNext, onBack, onSkip }: Props) {
  const [checked, setChecked] = useState<Set<string>>(
    initialApps.length > 0 ? new Set(initialApps) : new Set(DEFAULT_CHECKED)
  )
  const [customApp, setCustomApp] = useState('')

  function toggle(app: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(app)) next.delete(app)
      else next.add(app)
      return next
    })
  }

  function addCustom() {
    const trimmed = customApp.trim()
    if (trimmed) {
      setChecked((prev) => new Set([...prev, trimmed]))
      setCustomApp('')
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Which apps are the worst for you?</h1>
        <p className={styles.sub}>
          These are the ones we'll add the pause to. You can always change this later.
        </p>

        <div className={styles.list}>
          {APP_LIST.map((app) => {
            const isChecked = checked.has(app)
            return (
              <button
                key={app}
                className={`${styles.row} ${isChecked ? styles.rowChecked : ''}`}
                onClick={() => toggle(app)}
                aria-pressed={isChecked}
              >
                <span className={styles.rowLabel}>{app}</span>
                <span className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}>
                  {isChecked ? '✓' : ''}
                </span>
              </button>
            )
          })}
        </div>

        <div className={styles.customRow}>
          <input
            className={styles.customInput}
            type="text"
            placeholder="Add another app"
            value={customApp}
            onChange={(e) => setCustomApp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustom()}
          />
          {customApp.trim() && (
            <button className={styles.addBtn} onClick={addCustom}>Add</button>
          )}
        </div>

        {[...checked].filter((a) => !APP_LIST.includes(a)).map((app) => (
          <div key={app} className={`${styles.row} ${styles.rowChecked}`}>
            <span className={styles.rowLabel}>{app}</span>
            <span className={`${styles.checkbox} ${styles.checkboxChecked}`}>✓</span>
          </div>
        ))}

        <button className={styles.skipBtn} onClick={onSkip}>
          Skip setup
        </button>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={() => onNext(Array.from(checked))}
        >
          Set these up
        </button>
      </div>
    </div>
  )
}
