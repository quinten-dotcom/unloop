import type { ScienceCard } from '../data/scienceCards'
import styles from './ScienceCardModal.module.css'

interface Props {
  card: ScienceCard
  xpEarned: number
  onDismiss: () => void
}

export default function ScienceCardModal({ card, xpEarned, onDismiss }: Props) {
  return (
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>

        <div className={styles.topRow}>
          <span className={styles.scienceLabel}>🔬 The Science</span>
          {xpEarned > 0 && (
            <span className={styles.xpEarned}>+{xpEarned} XP Earned</span>
          )}
        </div>

        <h2 className={styles.title}>{card.title}</h2>

        <div className={styles.keyStatBox}>
          <p className={styles.keyStat}>{card.keyStat}</p>
        </div>

        <p className={styles.body}>{card.body}</p>

        <p className={styles.source}>{card.source}</p>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Got it →
        </button>
      </div>
    </div>
  )
}
