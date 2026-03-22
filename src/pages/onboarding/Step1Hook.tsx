import { useEffect, useState } from 'react'
import styles from './Step1Hook.module.css'

interface Props {
  onNext: () => void
}

export default function Step1Hook({ onNext }: Props) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timings = [100, 400, 700, 1000, 1400, 1800, 2200]
    const timers = timings.map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={`${styles.line} ${phase >= 1 ? styles.visible : ''}`}>
          You picked up your phone today...
        </p>
        <p className={`${styles.stat} ${phase >= 2 ? styles.visible : ''}`}>
          Around 96 times.
        </p>
        <p className={`${styles.line} ${phase >= 3 ? styles.visible : ''}`}>
          Most of those? You didn't even decide to.
        </p>
        <p className={`${styles.line} ${phase >= 4 ? styles.visible : ''}`}>
          Your brain did it on autopilot.
        </p>
        <p className={`${styles.line} ${styles.pause} ${phase >= 5 ? styles.visible : ''}`}>
          That's not a character flaw. That's how these apps were designed to work.
        </p>
        <p className={`${styles.line} ${phase >= 6 ? styles.visible : ''}`}>
          Unloop helps you take that back.
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          Show me how
        </button>
      </div>
    </div>
  )
}
