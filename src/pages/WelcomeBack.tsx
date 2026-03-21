import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import styles from './WelcomeBack.module.css'

interface Props {
  daysAway: number
  onContinue: (choice?: 'start-fresh' | 'pick-up') => void
  onWhyLeft: (reason: string | null) => void
  alreadyAnsweredWhyLeft: boolean
}

const WHY_LEFT_CHIPS = [
  'Got busy',
  'Forgot about it',
  "Didn't feel like it was working",
  'It felt like too much',
  'My habits actually improved',
  'Other',
]

export default function WelcomeBack({ daysAway, onContinue, onWhyLeft, alreadyAnsweredWhyLeft }: Props) {
  const { level, xp, humanStreak, totalMissionsCompleted } = useUserStore()
  const [whyLeftDone, setWhyLeftDone] = useState(false)

  const streakBroke = daysAway >= 2

  function handleChip(reason: string) {
    setWhyLeftDone(true)
    onWhyLeft(reason)
  }

  function handleSkip() {
    setWhyLeftDone(true)
    onWhyLeft(null)
  }

  const statsCard = (
    <div className={styles.statsCard}>
      <p className={styles.statsLabel}>Here's where you left off:</p>
      <div className={styles.statsRow}>
        <span className={styles.statItem}>Level {level}</span>
        <span className={styles.statDivider}>•</span>
        <span className={styles.statItem}>{xp} total XP</span>
        <span className={styles.statDivider}>•</span>
        <span className={styles.statItem}>{totalMissionsCompleted} missions completed all time</span>
      </div>
    </div>
  )

  let mainContent: React.ReactNode

  if (daysAway >= 30) {
    mainContent = (
      <>
        <h1 className={styles.heading}>It's been a while. Welcome back.</h1>
        <p className={styles.body}>
          Your Level {level} progress and all {xp} XP are still here. Nothing was lost.
        </p>
        {statsCard}
        <button className={styles.primaryBtn} onClick={() => onContinue()}>
          Let's go →
        </button>
      </>
    )
  } else if (daysAway >= 8) {
    mainContent = (
      <>
        <h1 className={styles.heading}>Hey, welcome back. It's been {daysAway} days.</h1>
        <p className={styles.body}>
          Here's the thing about building better phone habits: it's not about being perfect.
          It's about coming back when you drift. And you just came back. That counts for more
          than you think.
        </p>
        {statsCard}
        <div className={styles.buttonRow}>
          <button className={styles.secondaryBtn} onClick={() => onContinue('start-fresh')}>
            Start fresh
          </button>
          <button className={styles.primaryBtn} onClick={() => onContinue('pick-up')}>
            Pick up where I left off
          </button>
        </div>
      </>
    )
  } else {
    // 3–7 days
    mainContent = (
      <>
        <h1 className={styles.heading}>Welcome back.</h1>
        <p className={styles.body}>
          You were gone for {daysAway} days — that's completely fine.
        </p>
        {statsCard}
        {streakBroke ? (
          <p className={styles.streakNote}>
            Your streak reset, but your level and XP are exactly where you left them.
            Streaks are just one measure. The real progress is in your brain.
          </p>
        ) : (
          <p className={styles.streakNote}>
            Your streak paused at {humanStreak} days. Complete 2 practices today and it continues.
          </p>
        )}
        <button className={styles.primaryBtn} onClick={() => onContinue()}>
          Let's get back to it →
        </button>
      </>
    )
  }

  const showWhyLeft = !alreadyAnsweredWhyLeft && !whyLeftDone

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {mainContent}

        {showWhyLeft && (
          <div className={styles.whySection}>
            <p className={styles.whyPrompt}>
              Quick question (totally optional) — what made you step away?
            </p>
            <div className={styles.chipGrid}>
              {WHY_LEFT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  className={styles.chip}
                  onClick={() => handleChip(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <button className={styles.skipLink} onClick={handleSkip}>
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
