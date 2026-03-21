import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './TutorialOverlay.module.css'

// ── Config ────────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#10B981', '#34D399', '#F59E0B']
const SPOTLIGHT_PAD  = 10  // px padding around spotlighted element

interface Step {
  target: string
  text: string
}

const STEPS: Step[] = [
  {
    target: 'loop',
    text: "this is you right now. you're on Autopilot, which is level 1. as you complete practices and earn XP, this visual actually changes and opens up. by level 7 you'll be fully Unlooped... that's the goal",
  },
  {
    target: 'xp-bar',
    text: "this bar tracks your XP. you earn XP by completing daily practices, using the pause feature, and finishing challenges. when the bar fills up you level up and unlock new stuff",
  },
  {
    target: 'streak',
    text: "your streak counts how many days in a row you've done at least 2 practices. and don't stress if you miss a day, your streak pauses instead of breaking. miss two days in a row though and it resets",
  },
  {
    target: 'mission-card',
    text: "every day you get 3 new practices. they're all based on real science and most of them take like 5 minutes or less. you can see today's first one right here, tap it when you're ready",
  },
  {
    target: 'score-pill',
    text: "this is your daily score from 0 to 100. it's basically measuring how intentional you were with your phone today. it factors in your practices, your pauses, and how much time you spent in human mode",
  },
  {
    target: 'missions-tab',
    text: "this is where your daily practices live. honestly this is probably where you'll spend the most time. check in here every morning to see what you've got",
  },
  {
    target: 'human-mode',
    text: "when you turn this on, it activates the pause feature. so before you open any of your scroll apps you'll get a 10 second pause to ask yourself if you actually want to be opening it. sounds simple but it's honestly the most powerful thing in the whole app",
  },
]

// ── Types ─────────────────────────────────────────────────────────────────────

interface SpotRect {
  top: number
  left: number
  width: number
  height: number
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  rotation: number; rotationSpeed: number
  color: string; w: number; h: number
  opacity: number; opacityDecay: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTargetRect(target: string): SpotRect | null {
  const el = document.querySelector(`[data-tutorial="${target}"]`)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    top:    r.top    - SPOTLIGHT_PAD,
    left:   r.left   - SPOTLIGHT_PAD,
    width:  r.width  + SPOTLIGHT_PAD * 2,
    height: r.height + SPOTLIGHT_PAD * 2,
  }
}

// ── Tooltip positioning ───────────────────────────────────────────────────────

function computeTooltipStyle(spot: SpotRect): {
  style: React.CSSProperties
  arrowSide: 'top' | 'bottom'
} {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const TW  = Math.min(300, vw - 32)  // tooltip width
  const TH  = 220                     // estimated tooltip height
  const GAP = 14

  const spotBottom = spot.top + spot.height
  const spaceBelow = vh - spotBottom
  const spaceAbove = spot.top

  const left = Math.max(16, Math.min(vw - TW - 16, spot.left + spot.width / 2 - TW / 2))

  if (spaceBelow >= TH + GAP || spaceBelow >= spaceAbove) {
    return {
      style: { top: spotBottom + GAP, left, width: TW },
      arrowSide: 'top',
    }
  }
  return {
    style: { top: Math.max(GAP, spot.top - TH - GAP), left, width: TW },
    arrowSide: 'bottom',
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TutorialOverlay() {
  const [done,        setDone]        = useState(() => !!localStorage.getItem('tutorialComplete'))
  const [step,        setStep]        = useState(0)
  const [spot,        setSpot]        = useState<SpotRect | null>(null)
  const [celebrating, setCelebrating] = useState(false)
  const [msgVisible,  setMsgVisible]  = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const measureStep = useCallback((s: number) => {
    const rect = getTargetRect(STEPS[s]?.target ?? '')
    setSpot(rect)
    return rect !== null
  }, [])

  // Initial mount: measure step 0 after layout settles
  useEffect(() => {
    if (done) return
    // Try immediately, then retry a few times for elements that render slowly
    const tries = [200, 400, 800, 1500]
    const timers: ReturnType<typeof setTimeout>[] = []
    let found = false
    for (const delay of tries) {
      const t = setTimeout(() => {
        if (found) return
        const ok = measureStep(0)
        if (ok) found = true
      }, delay)
      timers.push(t)
    }
    return () => timers.forEach(clearTimeout)
  }, [done, measureStep])

  function advance() {
    if (step < STEPS.length - 1) {
      const next = step + 1
      setStep(next)
      setSpot(null)  // clear so old position doesn't flash
      // Tiny delay so React batches the state updates → spotlight transitions smoothly
      requestAnimationFrame(() => {
        const found = measureStep(next)
        // If element not in DOM, skip it after a short wait
        if (!found) setTimeout(() => advance(), 400)
      })
    } else {
      finish()
    }
  }

  function finish() {
    localStorage.setItem('tutorialComplete', '1')
    setCelebrating(true)
    launchConfetti()
    setTimeout(() => setMsgVisible(true), 300)
    setTimeout(() => { setDone(true) }, 3200)
  }

  function skip() {
    localStorage.setItem('tutorialComplete', '1')
    setDone(true)
  }

  function launchConfetti() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = window.innerWidth  * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    const W = window.innerWidth
    const H = window.innerHeight

    const particles: Particle[] = Array.from({ length: 30 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4
      return {
        x: W / 2 + (Math.random() - 0.5) * 80,
        y: H * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 7,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        w: 6 + Math.random() * 7,
        h: 3 + Math.random() * 3,
        opacity: 1,
        opacityDecay: 0.01 + Math.random() * 0.007,
      }
    })

    let raf: number
    function draw() {
      ctx!.clearRect(0, 0, W, H)
      let alive = false
      for (const p of particles) {
        if (p.opacity <= 0) continue
        alive = true
        p.vy += 0.1
        p.vx *= 0.995
        p.x += p.vx; p.y += p.vy
        p.rotation += p.rotationSpeed
        p.opacity  -= p.opacityDecay
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
  }

  if (done) return null

  // ── Celebration screen ────────────────────────────────────────────────────
  if (celebrating) {
    return (
      <div className={styles.root}>
        <canvas ref={canvasRef} className={styles.confettiCanvas} aria-hidden="true" />
        <p className={`${styles.celebrationMsg} ${msgVisible ? styles.celebrationMsgVisible : ''}`}>
          you're all set. go check out your first practice whenever you're ready
        </p>
      </div>
    )
  }

  // Don't render dark overlay or block clicks until we have a valid spotlight position
  if (!spot) return null

  // ── Tutorial steps ────────────────────────────────────────────────────────
  const tooltip = computeTooltipStyle(spot)

  return (
    <div className={styles.root} aria-modal="true" role="dialog" aria-label="Tutorial">

      {/* Tapping the dark area skips the tutorial */}
      <div className={styles.clickBlock} onClick={skip} aria-label="Tap to skip tutorial" />

      {/* Always-visible skip button in top corner */}
      <button className={styles.floatingSkip} onClick={skip}>
        skip tour ×
      </button>

      {/* Spotlight — creates the hole via box-shadow */}
      <div
        className={styles.spotlight}
        style={{
          top:    spot.top,
          left:   spot.left,
          width:  spot.width,
          height: spot.height,
        }}
      />

      {/* Glow ring around spotlight */}
      <div
        className={styles.glow}
        style={{
          top:    spot.top    - 4,
          left:   spot.left   - 4,
          width:  spot.width  + 8,
          height: spot.height + 8,
        }}
      />

      {/* Tooltip card */}
      {tooltip && (
        <div
          className={`${styles.tooltip} ${tooltip.arrowSide === 'top' ? styles.arrowTop : styles.arrowBottom}`}
          style={tooltip.style}
        >
          <div className={styles.progressLine}>{step + 1} of {STEPS.length}</div>
          <p className={styles.tooltipText}>{STEPS[step].text}</p>
          <div className={styles.tooltipActions}>
            <button
              className={styles.skipBtn}
              onClick={skip}
              aria-label="Skip tutorial"
            >
              skip tutorial
            </button>
            <button
              className={styles.nextBtn}
              onClick={advance}
              aria-label={step === STEPS.length - 1 ? 'Finish tutorial' : 'Next step'}
            >
              {step === STEPS.length - 1 ? 'got it' : 'Next →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
