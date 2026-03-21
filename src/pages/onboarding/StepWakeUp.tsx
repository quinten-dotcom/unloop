import { useState, useEffect } from 'react'
import styles from './StepWakeUp.module.css'

interface Props {
  onNext: () => void
}

export default function StepWakeUp({ onNext }: Props) {
  const [btnReady, setBtnReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBtnReady(true), 4800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.lines}>
        <p className={`${styles.line} ${styles.l1}`}>you've picked up your phone</p>
        <p className={`${styles.line} ${styles.l2}`}>
          96<span className={styles.timesSmall}>×</span> today.
        </p>
        <p className={`${styles.line} ${styles.l3}`}>without deciding to.</p>
        <p className={`${styles.line} ${styles.l4}`}>just like you did yesterday.</p>
        <p className={`${styles.line} ${styles.l5}`}>let's change that.</p>
      </div>

      <div className={`${styles.cta} ${btnReady ? styles.ctaVisible : ''}`}>
        <button
          className={styles.btn}
          onClick={onNext}
          disabled={!btnReady}
        >
          yeah, let's do it
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  )
}
