import { useEffect, useState } from 'react'
import type { MilestoneData } from '../utils/shareCard'
import { generateShareCard } from '../utils/shareCard'
import styles from './ShareCardModal.module.css'

interface Props {
  milestone: MilestoneData
  onClose: () => void
}

export default function ShareCardModal({ milestone, onClose }: Props) {
  const [imageUrl,  setImageUrl]  = useState<string | null>(null)
  const [copied,    setCopied]    = useState(false)
  const [visible,   setVisible]   = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    generateShareCard(milestone).then(setImageUrl)
  }, [milestone])

  async function handleShare() {
    if (!imageUrl) return

    if (navigator.share) {
      try {
        // Convert data URL to blob
        const res  = await fetch(imageUrl)
        const blob = await res.blob()
        const file = new File([blob], 'unloop-milestone.png', { type: 'image/png' })
        await navigator.share({
          title:  'Unloop',
          text:   milestone.subtitle,
          files:  [file],
        })
      } catch {
        // user cancelled or share not supported with files
        await copyToClipboard()
      }
    } else {
      await copyToClipboard()
    }
  }

  async function copyToClipboard() {
    if (!imageUrl) return
    try {
      const res  = await fetch(imageUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback: download
      const a = document.createElement('a')
      a.href     = imageUrl
      a.download = 'unloop-milestone.png'
      a.click()
    }
  }

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 280)
  }

  return (
    <div className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`} onClick={handleClose}>
      <div className={`${styles.sheet} ${visible ? styles.sheetVisible : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <p className={styles.heading}>share this?</p>

        <div className={styles.preview}>
          {imageUrl ? (
            <img src={imageUrl} alt="Milestone card" className={styles.cardImg} />
          ) : (
            <div className={styles.cardLoading}>generating your card...</div>
          )}
        </div>

        <button
          className={styles.shareBtn}
          onClick={handleShare}
          disabled={!imageUrl}
        >
          {copied ? 'copied to clipboard!' : 'share'}
        </button>

        <button className={styles.dismissBtn} onClick={handleClose}>
          not right now
        </button>
      </div>
    </div>
  )
}
