import { useState } from 'react'
import styles from './StepApps.module.css'

interface Props {
  onNext: (apps: string[]) => void
}

const APPS = [
  { id: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { id: 'instagram', label: 'Instagram', emoji: '📷' },
  { id: 'twitter', label: 'X (Twitter)', emoji: '𝕏' },
  { id: 'youtube-shorts', label: 'YouTube Shorts', emoji: '▶️' },
  { id: 'snapchat', label: 'Snapchat', emoji: '👻' },
  { id: 'reddit', label: 'Reddit', emoji: '🤖' },
]

export default function StepApps({ onNext }: Props) {
  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(APPS.map((a) => a.id))
  )

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleContinue() {
    const selected = APPS.filter((a) => checked.has(a.id)).map((a) => a.label)
    onNext(selected)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>which of these do you open without thinking?</h1>
        <p className={styles.subtitle}>
          we'll add a 10-second pause before these. just enough friction to break the reflex.
        </p>
      </div>

      <div className={styles.list}>
        {APPS.map((app, i) => (
          <button
            key={app.id}
            className={`${styles.appRow} ${checked.has(app.id) ? styles.appChecked : ''}`}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => toggle(app.id)}
            role="checkbox"
            aria-checked={checked.has(app.id)}
          >
            <span className={styles.appEmoji}>{app.emoji}</span>
            <span className={styles.appLabel}>{app.label}</span>
            <span className={`${styles.checkbox} ${checked.has(app.id) ? styles.checkboxOn : ''}`}>
              {checked.has(app.id) && <span className={styles.checkIcon}>✓</span>}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.scienceCard}>
        <div className={styles.scienceIcon}>🧪</div>
        <p className={styles.scienceText}>
          turns out blocking apps doesn't actually work that well. but <strong>friction does</strong>. even a 10-second pause cuts reflexive opens by almost half because your brain gets a moment to ask "wait, do I even want this?"
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={handleContinue}>
          save my pause list
        </button>
        <button className={styles.skip} onClick={() => onNext([])}>
          skip this for now
        </button>
      </div>
    </div>
  )
}
