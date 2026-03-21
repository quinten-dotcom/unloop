import styles from './PaywallSheet.module.css'

interface Props {
  title: string
  body: string
  onClose: () => void
  onUpgrade?: () => void
}

export default function PaywallSheet({ title, body, onClose, onUpgrade }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        <div className={styles.badge}>✨ Pro</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <button
          className={styles.upgradeBtn}
          onClick={onUpgrade ?? onClose}
        >
          Upgrade to Pro — $6/month
        </button>
        <button className={styles.dismissBtn} onClick={onClose}>
          Not right now
        </button>
      </div>
    </div>
  )
}
