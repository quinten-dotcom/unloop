import { useEffect, useState } from 'react'
import type { Unlock } from '../data/unlocks'
import styles from './UnlockRevealModal.module.css'

interface Props {
  level: number
  unlocks: Unlock[]
  onClose: () => void
}

export default function UnlockRevealModal({ level, unlocks, onClose }: Props) {
  const [visible, setVisible] = useState<boolean[]>(() => unlocks.map(() => false))

  useEffect(() => {
    // Stagger each unlock reveal at 200ms intervals
    unlocks.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 300 + i * 200)
      return () => clearTimeout(t)
    })
  }, [unlocks])

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <div className={styles.levelBadge}>Level {level}</div>
          <h2 className={styles.title}>You just unlocked some new stuff</h2>
        </div>

        <div className={styles.list}>
          {unlocks.map((unlock, i) => (
            <div
              key={unlock.id}
              className={`${styles.item} ${visible[i] ? styles.itemVisible : ''}`}
            >
              <div className={styles.itemIcon}>{unlock.icon}</div>
              <div className={styles.itemBody}>
                <span className={styles.itemName}>{unlock.name}</span>
                <span className={styles.itemDesc}>{unlock.description}</span>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.btn} onClick={onClose}>
          Nice, let's go
        </button>
      </div>
    </div>
  )
}
