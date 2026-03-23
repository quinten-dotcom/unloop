import { useState, useEffect, useRef } from 'react'
import type { UserGoal } from '../../store/useUserStore'
import styles from './Step8IdentityStatement.module.css'

interface Props {
  goal: UserGoal
  onNext: (statement: string) => void
  onBack: () => void
  onSkip: () => void
}

const DEFAULT_BY_GOAL: Record<UserGoal, string> = {
  'better-focus': 'focuses deeply on what matters.',
  'better-sleep': 'protects their rest.',
  'presence': 'is fully present with the people they love.',
  'mental-clarity': 'thinks clearly and intentionally.',
  'energy': 'takes care of their body and energy.',
  'calm': 'chooses calm over chaos.',
  'connection': 'shows up fully for the people they love.',
  'creativity': 'creates instead of just consuming.',
  'general': 'lives with intention.',
}

export default function Step8IdentityStatement({ goal, onNext, onBack, onSkip }: Props) {
  const [input, setInput] = useState(DEFAULT_BY_GOAL[goal] ?? DEFAULT_BY_GOAL['general'])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const canContinue = input.trim().length >= 3

  function handleContinue() {
    if (!canContinue) return
    onNext('I am someone who ' + input.trim())
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>One more thing.</h1>
        <p className={styles.sub}>Finish this sentence for yourself. You can change it later.</p>

        <div className={styles.statementBlock}>
          <span className={styles.prefix}>I am someone who</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="lives with intention."
          />
        </div>

        <p className={styles.hint}>
          This is your north star. Every practice is a vote for this version of you.
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={handleContinue} disabled={!canContinue}>
          Let's go
        </button>
        <button className={styles.skipBtn} onClick={onSkip}>
          Skip
        </button>
      </div>
    </div>
  )
}
