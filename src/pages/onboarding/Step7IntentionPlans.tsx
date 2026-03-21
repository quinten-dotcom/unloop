import { useState } from 'react'
import { DEFAULT_INTENTIONS } from '../../data/intentionPlans'
import styles from './Step7IntentionPlans.module.css'

interface Props {
  onNext: (intentions: string[]) => void
  onBack: () => void
  onSkip: () => void
}

export default function Step7IntentionPlans({ onNext, onBack, onSkip }: Props) {
  const [morningText, setMorningText] = useState(DEFAULT_INTENTIONS[0].defaultText)
  const [afternoonText, setAfternoonText] = useState(DEFAULT_INTENTIONS[1].defaultText)
  const [eveningText, setEveningText] = useState(DEFAULT_INTENTIONS[2].defaultText)

  function handleContinue() {
    onNext([morningText, afternoonText, eveningText])
  }

  const cards = [
    { label: DEFAULT_INTENTIONS[0].momentLabel, value: morningText, onChange: setMorningText },
    { label: DEFAULT_INTENTIONS[1].momentLabel, value: afternoonText, onChange: setAfternoonText },
    { label: DEFAULT_INTENTIONS[2].momentLabel, value: eveningText, onChange: setEveningText },
  ]

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Let's make your plan for the hard moments.</h1>
        <p className={styles.sub}>
          Research shows that if you pre-plan what you'll do in trigger moments, you're 3x more
          likely to follow through.
        </p>

        <div className={styles.cards}>
          {cards.map((card, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.cardLabel}>{card.label}</span>
              <textarea
                className={styles.textarea}
                value={card.value}
                onChange={(e) => card.onChange(e.target.value)}
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={handleContinue}>
          Continue
        </button>
        <button className={styles.skipBtn} onClick={onSkip}>
          Skip
        </button>
      </div>
    </div>
  )
}
