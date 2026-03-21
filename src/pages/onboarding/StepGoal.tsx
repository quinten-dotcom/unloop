import { useState } from 'react'
import type { UserGoal } from '../../store/useUserStore'
import styles from './StepGoal.module.css'

interface Props {
  onNext: (goal: UserGoal) => void
}

const GOAL_OPTIONS: Array<{
  id: UserGoal
  emoji: string
  title: string
  desc: string
}> = [
  {
    id: 'better-focus',
    emoji: '🎯',
    title: 'Focus and Deep Work',
    desc: 'stop losing hours you can\'t account for',
  },
  {
    id: 'better-sleep',
    emoji: '😴',
    title: 'Better Sleep',
    desc: 'your evenings and mornings are yours again',
  },
  {
    id: 'presence',
    emoji: '💪',
    title: 'Actually Be Present',
    desc: 'be there for the people in front of you',
  },
  {
    id: 'mental-clarity',
    emoji: '🧠',
    title: 'Mental Quiet',
    desc: 'less noise in your head, more actual thoughts',
  },
]

export default function StepGoal({ onNext }: Props) {
  const [selected, setSelected] = useState<UserGoal | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>what do you actually want back?</h1>
        <p className={styles.subtitle}>
          we'll personalize your daily practices around this
        </p>
      </div>

      <div className={styles.grid}>
        {GOAL_OPTIONS.map((opt, i) => (
          <button
            key={opt.id}
            className={`${styles.tile} ${selected === opt.id ? styles.selected : ''}`}
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => setSelected(opt.id)}
          >
            <span className={styles.emoji}>{opt.emoji}</span>
            <span className={styles.tileTitle}>{opt.title}</span>
            <span className={styles.tileDesc}>{opt.desc}</span>
            {selected === opt.id && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${!selected ? styles.btnDisabled : ''}`}
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
        >
          {selected
            ? `okay, let's go →`
            : 'pick one to keep going'}
        </button>
      </div>
    </div>
  )
}
