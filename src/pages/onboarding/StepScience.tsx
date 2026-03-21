import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './StepScience.module.css'

interface Props {
  onNext: () => void
}

function useCountUp(target: number, duration: number, delay = 0): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf: number
    let startTime: number | null = null

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4)
        setValue(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value
}

const stats = [
  {
    value: 96,
    unit: '×',
    unitBefore: false,
    label: 'times you\'ll pick up your phone today, on average',
    delay: 200,
  },
  {
    value: 23,
    unit: ' min',
    unitBefore: false,
    label: 'to get your focus back after one notification pulls you away',
    delay: 500,
  },
  {
    value: 72,
    unit: ' hrs',
    unitBefore: false,
    label: 'until your brain\'s reward system starts recovering',
    delay: 800,
  },
]

function StatCard({
  value,
  unit,
  label,
  delay,
}: {
  value: number
  unit: string
  label: string
  delay: number
}) {
  const count = useCountUp(value, 1200, delay)

  return (
    <div className={styles.card} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.stat}>
        <span className={styles.number}>{count}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  )
}

export default function StepScience({ onNext }: Props) {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          okay so here's what's actually<br />happening to your brain
        </h1>
      </div>

      <div className={styles.cards}>
        {stats.map((s) => (
          <StatCard key={s.value} {...s} />
        ))}
      </div>

      <div className={styles.callout}>
        <p className={styles.calloutText}>
          your phone is using your brain's reward system{' '}
          <span className={styles.against}>against</span> you.
          {' '}Unloop does the <span className={styles.for}>opposite</span>.
        </p>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          got it, let's fix it
        </button>
        <button className={styles.learnMoreLink} onClick={() => navigate('/how-it-works')}>
          learn more about how it works →
        </button>
      </div>
    </div>
  )
}
