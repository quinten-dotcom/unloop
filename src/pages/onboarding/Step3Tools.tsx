import styles from './Step3Tools.module.css'

interface Props {
  onNext: () => void
  onBack: () => void
}

const TOOLS = [
  {
    id: 'practices',
    num: '1',
    title: 'Daily practices',
    body: '3 simple things to try each day, based on brain science. Takes a few minutes.',
  },
  {
    id: 'pause',
    num: '2',
    title: 'The Pause',
    body: 'A 10-second pause before your scroll apps open. Not a block. Just a moment to decide.',
  },
  {
    id: 'score',
    num: '3',
    title: 'Your Human Score',
    body: "A single number from 0 to 100 that reflects how intentionally you're living. It goes up as you complete practices and maintain your streak.",
  },
]

export default function Step3Tools({ onNext, onBack }: Props) {
  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Unloop gives you three tools</h1>

        <div className={styles.cards}>
          {TOOLS.map((tool) => (
            <div key={tool.id} className={styles.card}>
              <span className={styles.cardNum}>{tool.num}</span>
              <div className={styles.cardText}>
                <span className={styles.cardTitle}>{tool.title}</span>
                <p className={styles.cardBody}>{tool.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          Set it up for me
        </button>
      </div>
    </div>
  )
}
