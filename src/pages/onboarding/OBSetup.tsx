import { useState, useEffect } from 'react'
import type { UserGoal } from '../../store/useUserStore'
import styles from './OBSetup.module.css'

interface Props {
  onNext: (triggers: string[], apps: string[], goal: UserGoal) => void
  onBack: () => void
  onSkip: () => void
}

const TRIGGERS = [
  { id: 'social-media', emoji: '📱', label: 'Social media' },
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'binge-watching', emoji: '🎬', label: 'Binge watching' },
  { id: 'food-delivery', emoji: '🍔', label: 'Food apps' },
  { id: 'online-shopping', emoji: '🛒', label: 'Shopping' },
  { id: 'news-doomscrolling', emoji: '📰', label: 'News' },
  { id: 'constant-messaging', emoji: '💬', label: 'Messaging' },
]

const ALL_APPS = ['TikTok', 'Instagram', 'YouTube', 'X (Twitter)', 'Snapchat', 'Reddit', 'Facebook', 'Pinterest']

const TRIGGER_APP_MAP: Record<string, string[]> = {
  'social-media': ['TikTok', 'Instagram', 'YouTube', 'X (Twitter)'],
  'gaming': [],
  'binge-watching': ['YouTube'],
  'news-doomscrolling': ['Reddit', 'X (Twitter)'],
  'constant-messaging': [],
  'food-delivery': [],
  'online-shopping': [],
}

const GOALS: { id: UserGoal; emoji: string; label: string }[] = [
  { id: 'better-focus', emoji: '🎯', label: 'Focus' },
  { id: 'better-sleep', emoji: '😴', label: 'Sleep' },
  { id: 'presence', emoji: '💪', label: 'Presence' },
  { id: 'mental-clarity', emoji: '🧠', label: 'Clarity' },
]

function getDefaultApps(triggers: Set<string>): Set<string> {
  const apps = new Set<string>()
  triggers.forEach((t) => {
    ;(TRIGGER_APP_MAP[t] ?? []).forEach((a) => apps.add(a))
  })
  if (apps.size === 0) {
    apps.add('TikTok')
    apps.add('Instagram')
  }
  return apps
}

export default function OBSetup({ onNext, onBack, onSkip }: Props) {
  const [triggers, setTriggers] = useState<Set<string>>(new Set())
  const [apps, setApps] = useState<Set<string>>(new Set(['TikTok', 'Instagram']))
  const [goal, setGoal] = useState<UserGoal | null>(null)

  // Update app pre-selection when triggers change
  useEffect(() => {
    setApps(getDefaultApps(triggers))
  }, [triggers])

  function toggleTrigger(id: string) {
    setTriggers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleApp(app: string) {
    setApps((prev) => {
      const next = new Set(prev)
      if (next.has(app)) next.delete(app)
      else next.add(app)
      return next
    })
  }

  function handleNext() {
    onNext(Array.from(triggers), Array.from(apps), goal ?? 'general')
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Quick setup</h1>

        {/* Section 1 — Triggers */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>What pulls you in the most?</p>
          <div className={styles.chipRow}>
            {TRIGGERS.map((t) => {
              const on = triggers.has(t.id)
              return (
                <button
                  key={t.id}
                  className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                  onClick={() => toggleTrigger(t.id)}
                  aria-pressed={on}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Section 2 — Apps */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Which apps are the worst?</p>
          <div className={styles.chipRow}>
            {ALL_APPS.map((app) => {
              const on = apps.has(app)
              return (
                <button
                  key={app}
                  className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                  onClick={() => toggleApp(app)}
                  aria-pressed={on}
                >
                  <span>{app}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Section 3 — Goal */}
        <div className={styles.section}>
          <p className={styles.sectionLabel}>What do you want back?</p>
          <div className={styles.goalGrid}>
            {GOALS.map((g) => {
              const on = goal === g.id
              return (
                <button
                  key={g.id}
                  className={`${styles.goalCard} ${on ? styles.goalCardOn : ''}`}
                  onClick={() => setGoal(g.id)}
                  aria-pressed={on}
                >
                  <span className={styles.goalEmoji}>{g.emoji}</span>
                  <span className={styles.goalLabel}>{g.label}</span>
                  {on && <span className={styles.goalCheck}>✓</span>}
                </button>
              )
            })}
          </div>
        </div>

        <button className={styles.skipBtn} onClick={onSkip}>
          Skip setup
        </button>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={handleNext}>
          Almost done
        </button>
      </div>
    </div>
  )
}
