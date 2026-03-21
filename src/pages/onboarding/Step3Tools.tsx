import { useState } from 'react'
import styles from './Step3Tools.module.css'

interface Props {
  onNext: () => void
  onBack: () => void
}

const TOOLS = [
  {
    id: 'practices',
    title: 'Daily practices',
    body: 'Every day you get 3 simple things to try. Stuff like leaving your phone out of the bedroom, or taking a walk without it, or eating a meal without scrolling. They take a few minutes each and they\'re all based on real brain science. You pick which ones you want to do and skip the ones that don\'t fit your day.',
  },
  {
    id: 'pause',
    title: 'The pause',
    body: 'Before you open your scroll apps, Unloop gives you a 10-second pause. Not a block. You can still open the app. It just asks you to take a breath and think about whether you actually want to right now. This tiny bit of friction is actually more effective than blocking apps entirely because it puts you in control instead of fighting you.',
  },
  {
    id: 'leveling',
    title: 'Leveling up',
    body: 'As you do practices and use the pause, you earn XP and level up from Level 1 (Autopilot) to Level 7 (Unlooped). Each level unlocks new tools and features. The leveling system uses the same reward mechanics that make apps addictive, but pointed in a direction that actually helps you.',
  },
]

export default function Step3Tools({ onNext, onBack }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [readIds, setReadIds] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    if (openId === id) {
      setOpenId(null)
    } else {
      setOpenId(id)
      setReadIds((prev) => new Set([...prev, id]))
    }
  }

  const allRead = TOOLS.every((t) => readIds.has(t.id))

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
        ← Back
      </button>

      <div className={styles.content}>
        <h1 className={styles.heading}>Unloop gives you three tools</h1>
        <p className={styles.sub}>Tap each one to learn how it works.</p>

        <div className={styles.cards}>
          {TOOLS.map((tool, i) => {
            const isOpen = openId === tool.id
            const isRead = readIds.has(tool.id)
            return (
              <div
                key={tool.id}
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''} ${isRead && !isOpen ? styles.cardRead : ''}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <button
                  className={styles.cardHeader}
                  onClick={() => toggle(tool.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.cardNum}>{i + 1}</span>
                  <span className={styles.cardTitle}>{tool.title}</span>
                  <span className={styles.cardChevron}>{isOpen ? '▲' : '▼'}</span>
                  {isRead && !isOpen && <span className={styles.cardCheck}>✓</span>}
                </button>
                {isOpen && (
                  <div className={styles.cardBody}>
                    <p>{tool.body}</p>
                    <button className={styles.gotItBtn} onClick={() => setOpenId(null)}>
                      Got it
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext} disabled={!allRead}>
          {allRead ? "Let's set this up for me" : `Open all 3 to continue (${readIds.size}/3)`}
        </button>
      </div>
    </div>
  )
}
