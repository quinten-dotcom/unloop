import { useEffect, useRef, useState } from 'react'
import { subscribeToasts } from '../utils/toasts'
import type { ToastItem } from '../utils/toasts'
import styles from './ToastContainer.module.css'

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible]   = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const startY    = useRef(0)
  const currentY  = useRef(0)
  const dragging  = useRef(false)
  const ref       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  function handleTouchStart(e: React.TouchEvent) {
    startY.current  = e.touches[0].clientY
    dragging.current = true
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return
    const dy = e.touches[0].clientY - startY.current
    currentY.current = dy
    if (ref.current && dy < 0) {
      ref.current.style.transform = `translateY(${dy}px)`
      ref.current.style.opacity   = `${Math.max(0, 1 + dy / 80)}`
    }
  }

  function handleTouchEnd() {
    if (!dragging.current) return
    dragging.current = false
    if (currentY.current < -40) {
      dismiss()
    } else if (ref.current) {
      ref.current.style.transform = ''
      ref.current.style.opacity   = ''
    }
    currentY.current = 0
  }

  function dismiss() {
    setLeaving(true)
    setTimeout(onDismiss, 280)
  }

  return (
    <div
      ref={ref}
      className={`${styles.toast} ${visible ? styles.toastVisible : ''} ${leaving ? styles.toastLeaving : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="status"
      aria-live="polite"
    >
      <div className={styles.emojiCircle}>{toast.emoji}</div>
      <p className={styles.message}>{toast.message}</p>
    </div>
  )
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    return subscribeToasts((items) => setToasts([...items]))
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className={styles.container} aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={() => setToasts([])} />
      ))}
    </div>
  )
}
