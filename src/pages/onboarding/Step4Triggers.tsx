import { useState } from 'react'
import styles from './Step4Triggers.module.css'

interface Props {
  onNext: (triggers: string[]) => void
  onBack: () => void
  onSkip: () => void
}

const TRIGGERS = [
  {
    id: 'social-media',
    emoji: '📱',
    title: 'Social media scrolling',
    desc: 'Instagram, TikTok, X, YouTube... you open them for a second and 45 minutes disappear.',
  },
  {
    id: 'gaming',
    emoji: '🎮',
    title: 'Gaming',
    desc: 'You say "one more round" and it\'s never one more round.',
  },
  {
    id: 'binge-watching',
    emoji: '🎬',
    title: 'Binge watching',
    desc: 'YouTube rabbit holes, Netflix episodes back to back, content that autoplays until 2am.',
  },
  {
    id: 'food-delivery',
    emoji: '🍔',
    title: 'Food delivery apps',
    desc: 'Ordering out of boredom, browsing menus for the dopamine hit.',
  },
  {
    id: 'adult-content',
    emoji: '🔞',
    title: 'Adult content',
    desc: 'Content you turn to out of habit or boredom rather than genuine desire.',
  },
  {
    id: 'online-shopping',
    emoji: '🛒',
    title: 'Online shopping',
    desc: 'Browsing, adding to cart, buying things you don\'t need for the temporary rush.',
  },
  {
    id: 'news-doomscrolling',
    emoji: '📰',
    title: 'News and outrage scrolling',
    desc: 'Doomscrolling, reading comments, getting worked up about things you can\'t control.',
  },
  {
    id: 'constant-messaging',
    emoji: '💬',
    title: 'Constant messaging',
    desc: 'Checking messages every 30 seconds, needing to respond immediately.',
  },
]

export default function Step4Triggers({ onNext, onBack, onSkip }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const canContinue = selected.size > 0

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>What pulls you in the most?</h1>
        <p className={styles.sub}>Pick everything that applies. We'll customize your experience around these.</p>

        <div className={styles.grid}>
          {TRIGGERS.map((t) => {
            const isSelected = selected.has(t.id)
            return (
              <button
                key={t.id}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                onClick={() => toggle(t.id)}
                aria-pressed={isSelected}
              >
                <span className={styles.cardEmoji}>{t.emoji}</span>
                <span className={styles.cardTitle}>{t.title}</span>
                <span className={styles.cardDesc}>{t.desc}</span>
                {isSelected && <span className={styles.check}>✓</span>}
              </button>
            )
          })}
        </div>

        <button className={styles.skipBtn} onClick={onSkip}>
          Skip setup
        </button>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.btn}
          onClick={() => onNext(Array.from(selected))}
          disabled={!canContinue}
        >
          Next
        </button>
      </div>
    </div>
  )
}
