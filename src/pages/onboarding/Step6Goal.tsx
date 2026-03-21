import { useState } from 'react'
import type { UserGoal } from '../../store/useUserStore'
import styles from './Step6Goal.module.css'

interface Props {
  onNext: (goal: UserGoal) => void
  onBack: () => void
  onSkip: () => void
}

const GOALS: { id: UserGoal; emoji: string; title: string; desc: string }[] = [
  {
    id: 'better-focus',
    emoji: '🎯',
    title: 'My focus and productivity',
    desc: 'I want to be able to sit down and actually get things done without my phone pulling me away every 5 minutes.',
  },
  {
    id: 'better-sleep',
    emoji: '😴',
    title: 'My sleep',
    desc: 'I want to stop scrolling until 2am and actually wake up feeling rested.',
  },
  {
    id: 'presence',
    emoji: '💪',
    title: 'My real-life presence',
    desc: 'I want to be more present with the people around me instead of always half-distracted.',
  },
  {
    id: 'mental-clarity',
    emoji: '🧠',
    title: 'My mental clarity',
    desc: 'I want my brain back. Less noise, less anxiety, more ability to just think clearly.',
  },
]

export default function Step6Goal({ onNext, onBack, onSkip }: Props) {
  const [selected, setSelected] = useState<UserGoal | null>(null)

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>What do you want to get back?</h1>
        <p className={styles.sub}>This helps us pick the right daily practices for you.</p>

        <div className={styles.tiles}>
          {GOALS.map((g) => {
            const isSelected = selected === g.id
            return (
              <button
                key={g.id}
                className={`${styles.tile} ${isSelected ? styles.tileSelected : ''}`}
                onClick={() => setSelected(g.id)}
                aria-pressed={isSelected}
              >
                <span className={styles.tileEmoji}>{g.emoji}</span>
                <div className={styles.tileText}>
                  <span className={styles.tileTitle}>{g.title}</span>
                  <span className={styles.tileDesc}>{g.desc}</span>
                </div>
                {isSelected && <span className={styles.tileCheck}>✓</span>}
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
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
        >
          Almost done
        </button>
      </div>
    </div>
  )
}
