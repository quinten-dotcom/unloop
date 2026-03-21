import { useEffect, useRef, useState } from 'react'
import type { Level } from '../data/levels'
import styles from './LevelUpModal.module.css'

interface Props {
  newLevel: Level
  onClose: () => void
}

// ── Canvas confetti ──────────────────────────────────────────────────────────

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#10B981', '#34D399', '#F59E0B', '#FFFFFF']

interface Particle {
  x: number; y: number; vx: number; vy: number
  rotation: number; rotationSpeed: number
  color: string; w: number; h: number
  opacity: number; opacityDecay: number
}

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = canvas.offsetWidth  * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight

    const particles: Particle[] = Array.from({ length: 160 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 5 + Math.random() * 11
      return {
        x: W / 2 + (Math.random() - 0.5) * 80,
        y: H * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: 7 + Math.random() * 9,
        h: 3 + Math.random() * 5,
        opacity: 1,
        opacityDecay: 0.007 + Math.random() * 0.005,
      }
    })

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      let alive = false
      for (const p of particles) {
        if (p.opacity <= 0) continue
        alive = true
        p.vy += 0.2
        p.vx *= 0.995
        p.x += p.vx; p.y += p.vy
        p.rotation += p.rotationSpeed
        p.opacity -= p.opacityDecay
        ctx!.save()
        ctx!.globalAlpha = Math.max(0, p.opacity)
        ctx!.translate(p.x, p.y)
        ctx!.rotate((p.rotation * Math.PI) / 180)
        ctx!.fillStyle = p.color
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx!.restore()
      }
      if (alive) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [active, canvasRef])
}

// ── Typewriter hook ──────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 55, startDelay = 1000): string {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return displayed
}

// ── Modal ────────────────────────────────────────────────────────────────────

export default function LevelUpModal({ newLevel, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Mount triggers confetti
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  useConfetti(canvasRef, ready)

  const levelName = useTypewriter(newLevel.name, 55, 900)
  const cursor    = levelName.length < newLevel.name.length ? '|' : ''

  return (
    <div className={styles.overlay}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge}>Level {newLevel.level}</div>

        <h1 className={`${styles.levelUp} ${ready ? styles.levelUpVisible : ''}`}>
          LEVEL UP!
        </h1>

        <div className={styles.youAreNow}>Every practice was a vote for...</div>

        <div className={styles.levelName}>
          {levelName}
          <span className={styles.cursor}>{cursor}</span>
        </div>

        <div className={styles.identityStatement}>"{newLevel.identityStatement}"</div>
        <div className={styles.whatAbout}>{newLevel.whatThisLevelIsAbout}</div>

        <div className={styles.scienceCard}>
          <p className={styles.scienceText}>{newLevel.levelUpMessage}</p>
          <p className={styles.scienceNote}>{newLevel.scienceNote}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.keepGoingBtn} onClick={onClose}>
            Keep going
          </button>
          <button
            className={styles.shareBtn}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Unloop',
                  text: `I just reached Level ${newLevel.level}: ${newLevel.name} on Unloop! "${newLevel.description}"`,
                }).catch(() => {/* user cancelled */})
              }
            }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
