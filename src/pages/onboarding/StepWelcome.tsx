import { useEffect, useRef, useState } from 'react'
import styles from './StepWelcome.module.css'

interface Props {
  onNext: () => void
}

// ── Confetti canvas ──────────────────────────────────────────────────────────

const CONFETTI_COLORS = [
  '#2563EB', '#3B82F6', '#60A5FA', '#BFDBFE',
  '#10B981', '#34D399',
  '#F59E0B', '#FCD34D',
  '#FFFFFF', '#E2E8F0',
]

interface Particle {
  x: number; y: number
  vx: number; vy: number
  rotation: number; rotationSpeed: number
  color: string
  w: number; h: number
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

    const particles: Particle[] = Array.from({ length: 140 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 4 + Math.random() * 9
      return {
        x: cx + (Math.random() - 0.5) * 60,
        y: H * 0.32,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: 6 + Math.random() * 8,
        h: 3 + Math.random() * 4,
        opacity: 1,
        opacityDecay: 0.008 + Math.random() * 0.006,
      }
    })

    let raf: number

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      let alive = false
      for (const p of particles) {
        if (p.opacity <= 0) continue
        alive = true

        p.vy += 0.18          // gravity
        p.vx *= 0.994         // air resistance
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

// ── Spiral SVG ───────────────────────────────────────────────────────────────

const RINGS = [12, 24, 36, 48, 60]

function SpiralRings() {
  return (
    <svg
      viewBox="0 0 160 160"
      width="160"
      height="160"
      className={styles.spiral}
      aria-hidden="true"
    >
      {RINGS.map((r, i) => {
        const circ = Math.PI * 2 * r
        return (
          <circle
            key={r}
            cx={80}
            cy={80}
            r={r}
            fill="none"
            stroke="#2563EB"
            strokeWidth={i === 4 ? 1 : 1.5}
            strokeLinecap="round"
            strokeDasharray={circ}
            style={
              {
                '--circ': `${circ}`,
                animationDelay: `${i * 180}ms`,
                opacity: 1 - i * 0.08,
              } as React.CSSProperties
            }
            className={styles.ring}
          />
        )
      })}
    </svg>
  )
}

// ── Step component ───────────────────────────────────────────────────────────

export default function StepWelcome({ onNext }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ctaReady, setCtaReady] = useState(false)

  useConfetti(canvasRef)

  useEffect(() => {
    const t = setTimeout(() => setCtaReady(true), 3400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.confettiCanvas} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.visual}>
          <SpiralRings />
          <div className={styles.spiralGlow} />
        </div>

        <div className={styles.textBlock}>
          <p className={`${styles.line} ${styles.line1}`}>
            okay, you're actually doing this.
          </p>
          <div className={`${styles.badge} ${styles.line2}`}>
            <span className={styles.badgeDot} />
            Level 1: Autopilot
          </div>
          <p className={`${styles.line} ${styles.line3}`}>
            your first practice is waiting for you.
          </p>
        </div>

        <div className={`${styles.xpSection} ${styles.line4}`}>
          <div className={styles.xpLabel}>
            <span>XP</span>
            <span className={styles.xpNumbers}>0 / 100</span>
          </div>
          <div className={styles.xpTrack}>
            <div className={styles.xpFill} />
          </div>
          <p className={styles.xpHint}>finish today's practices to earn XP and move up</p>
        </div>
      </div>

      <div className={`${styles.footer} ${ctaReady ? styles.footerVisible : ''}`}>
        <button
          className={styles.btn}
          onClick={onNext}
          disabled={!ctaReady}
        >
          let's go ✦
        </button>
      </div>
    </div>
  )
}
