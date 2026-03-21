import { useState, useEffect, useRef } from 'react'
import styles from './EvidenceModal.module.css'

interface Props {
  prompt: string
  missionName: string
  onSubmit: (text: string) => void
  onDismiss: () => void
}

export default function EvidenceModal({ prompt, missionName, onSubmit, onDismiss }: Props) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // slight delay so the animation plays first
    const t = setTimeout(() => textareaRef.current?.focus(), 250)
    return () => clearTimeout(t)
  }, [])

  function handleSubmit() {
    if (text.trim().length === 0) return
    onSubmit(text.trim())
  }

  return (
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <span className={styles.label}>Reflection</span>
          <h2 className={styles.title}>{missionName}</h2>
        </div>

        <p className={styles.prompt}>{prompt}</p>

        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Type anything here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onDismiss}>
            Cancel
          </button>
          <button
            className={`${styles.submitBtn} ${text.trim() ? '' : styles.submitDisabled}`}
            disabled={!text.trim()}
            onClick={handleSubmit}
          >
            done, earn XP
          </button>
        </div>
      </div>
    </div>
  )
}
