import { useEffect, useRef } from 'react'
import styles from './Step9Welcome.module.css'

interface Props {
  onNext: () => void
}

// ── Confetti ──────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  '#2563EB', '#3B82F6', '#60A5FA', '#BFDBFE',
  '#10B981', '#34D399',
  '#F59E0B', '#FB923C',
]

interface Particle {
  x: number; y: number; vx: number; vy: number
  rotation: number; rotationSpeed: number
  color: string; w: number; h: number
  opacity: number; opacityDecay: number
}

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    const cx = W / 2

    const particles: Particle[] = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 3 + Math.random() * 8
      return {
        x: cx + (Math.random() - 0.5) * 60,
        y: H * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: 6 + Math.random() * 7,
        h: 3 + Math.random() * 4,
        opacity: 1,
        opacityDecay: 0.007 + Math.random() * 0.006,
      }
    })

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      let alive = false
      for (const p of particles) {
        if (p.opacity <= 0) continue
        alive = true
        p.vy += 0.18
        p.vx *= 0.994
        p.x += p.vx
        p.y += p.vy
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
      else ctx!.clearRect(0, 0, W, H)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [canvasRef])
}

// ── Spiral SVG ────────────────────────────────────────────────────────────────

const RINGS = [12, 24, 36, 48, 60]

function SpiralRings() {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140" aria-hidden="true" className={styles.spiral}>
      {RINGS.map((r, i) => {
        const circ = Math.PI * 2 * r
        return (
          <circle
            key={r}
            cx={80} cy={80} r={r}
            fill="none"
            stroke="#2563EB"
            strokeWidth={i === 4 ? 1 : 1.5}
            strokeLinecap="round"
            strokeDasharray={circ}
            style={{ '--circ': `${circ}`, animationDelay: `${i * 180}ms`, opacity: 1 - i * 0.08 } as React.CSSProperties}
            className={styles.ring}
          />
        )
      })}
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Step9Welcome({ onNext }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useConfetti(canvasRef)

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.confettiCanvas} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.visual}>
          <SpiralRings />
        </div>

        <div className={styles.textBlock}>
          <h1 className={`${styles.headline} ${styles.line1}`}>You're all set.</h1>
          <div className={`${styles.badge} ${styles.line2}`}>
            <span className={styles.badgeDot} />
            Level 1: Autopilot
          </div>
          <p className={`${styles.body} ${styles.line3}`}>
            That's where everyone starts. Your brain has been running on autopilot with your phone for a while now. Over the next few weeks, you're going to start noticing when it happens and choosing differently. Small changes, real results.
          </p>
        </div>

        <div className={`${styles.missionPreview} ${styles.line4}`}>
          <p className={styles.missionPreviewLabel}>Your first practices are ready</p>
          <p className={styles.missionPreviewSub}>
            You get 3 daily practices each day. Complete at least 2 to build your streak.
          </p>
          <div className={styles.xpRow}>
            <span className={styles.xpBadge}>0 XP</span>
            <div className={styles.xpTrack}>
              <div className={styles.xpFill} />
            </div>
            <span className={styles.xpTarget}>100 XP</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btn} onClick={onNext}>
          Let's go
        </button>
      </div>
    </div>
  )
}
