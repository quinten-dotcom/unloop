import { useEffect, useRef, useState, useCallback } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useUsageStore } from '../store/useUsageStore'
import { toastPauseUsed } from '../utils/toasts'
import styles from './PauseScreen.module.css'

// ── Constants ──────────────────────────────────────────────────────────────────

const APPS = ['Instagram', 'TikTok', 'X', 'YouTube', 'Reddit', 'Snapchat', 'Other']
const TRIGGERS = [
  "I'm bored",
  'Feeling anxious',
  'Avoiding something',
  'Just a habit',
  'I actually need something specific',
]
const COUNTDOWN_SECS = 10

// ── XP fly element ────────────────────────────────────────────────────────────

function XPFly({ amount, onDone }: { amount: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200)
    return () => clearTimeout(t)
  }, [onDone])
  return <div className={styles.xpFly}>+{amount} XP</div>
}

// ── Breathing circle ──────────────────────────────────────────────────────────

function BreathingCircle({ small = false }: { small?: boolean }) {
  return (
    <div className={`${styles.breathWrap} ${small ? styles.breathWrapSmall : ''}`}>
      <div className={styles.breathCircle}>
        <div className={styles.breathInner} />
      </div>
    </div>
  )
}

// ── Countdown ring ────────────────────────────────────────────────────────────

function CountdownRing({
  seconds,
  total,
}: {
  seconds: number
  total: number
}) {
  const R = 52
  const circ = 2 * Math.PI * R
  const progress = seconds / total
  const dash = circ * progress

  return (
    <div className={styles.countdownWrap}>
      <svg width={120} height={120} viewBox="0 0 120 120" className={styles.countdownSvg}>
        {/* Background track */}
        <circle
          cx={60} cy={60} r={R}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={6}
        />
        {/* Progress arc – depletes clockwise from top */}
        <circle
          cx={60} cy={60} r={R}
          fill="none"
          stroke="#2563EB"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={0}
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dasharray 1s linear' }}
        />
      </svg>
      <div className={styles.countdownNum}>{seconds}</div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  onClose: () => void
}

type PausePhase =
  | 'breathing'   // initial breathing moment
  | 'app'         // what were you about to open
  | 'trigger'     // why
  | 'countdown'   // 10-second countdown
  | 'choice'      // nah / do it on purpose
  | 'done'        // brief summary then close

export default function PauseScreen({ onClose }: Props) {
  const { addXP, updateStats, totalPausesTriggered } = useUserStore()
  const { logPause } = useUsageStore()

  const [phase,        setPhase]        = useState<PausePhase>('breathing')
  const [showInput,    setShowInput]    = useState(false)  // input fades in after 3s
  const [selectedApp,  setSelectedApp]  = useState<string | null>(null)
  const [customApp,    setCustomApp]    = useState('')
  const [selectedTrig, setSelectedTrig] = useState<string | null>(null)
  const [customTrig,   setCustomTrig]   = useState('')
  const [countdown,    setCountdown]    = useState(COUNTDOWN_SECS)
  const [choiceVisible, setChoiceVisible] = useState(false)
  const [xpAmount,     setXpAmount]     = useState<number | null>(null)
  const [summaryMsg,   setSummaryMsg]   = useState('')
  const [summaryVis,   setSummaryVis]   = useState(false)
  const [visible,      setVisible]      = useState(false)  // slide-up state

  const startedAt = useRef(Date.now())

  // Slide in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  // After 3 seconds in breathing phase, show the input section
  useEffect(() => {
    if (phase !== 'breathing') return
    const t = setTimeout(() => setShowInput(true), 3000)
    return () => clearTimeout(t)
  }, [phase])

  // Countdown timer
  useEffect(() => {
    if (phase !== 'countdown') return
    setCountdown(COUNTDOWN_SECS)
    setChoiceVisible(false)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setChoiceVisible(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  const effectiveApp = selectedApp === 'Other' ? (customApp || 'Other') : (selectedApp ?? '')
  const effectiveTrig = selectedTrig === 'i actually need something specific'
    ? (customTrig || 'something specific')
    : (selectedTrig ?? '')

  function handleSelectApp(app: string) {
    setSelectedApp(app)
  }

  function handleSelectTrigger(trig: string) {
    setSelectedTrig(trig)
    // Move to countdown automatically
    setTimeout(() => setPhase('countdown'), 400)
  }

  function handleSkip() {
    const xp = 10
    const duration = Date.now() - startedAt.current
    addXP(xp)
    updateStats({ totalPausesTriggered: totalPausesTriggered + 1 })
    logPause({
      timestamp: new Date().toISOString(),
      app: effectiveApp,
      trigger: effectiveTrig,
      outcome: 'skip',
      durationMs: duration,
    })
    setXpAmount(xp)
    toastPauseUsed(effectiveApp, totalPausesTriggered + 1)
    showSummary('skip')
  }

  function handleProceed() {
    const xp = 5
    const duration = Date.now() - startedAt.current
    addXP(xp)
    updateStats({ totalPausesTriggered: totalPausesTriggered + 1 })
    logPause({
      timestamp: new Date().toISOString(),
      app: effectiveApp,
      trigger: effectiveTrig,
      outcome: 'proceed',
      durationMs: duration,
    })
    setXpAmount(xp)
    toastPauseUsed(effectiveApp, totalPausesTriggered + 1)
    showSummary('proceed')
  }

  const showSummary = useCallback((outcome: 'skip' | 'proceed') => {
    const newTotal = totalPausesTriggered + 1
    const msg = `That's ${newTotal} pause${newTotal !== 1 ? 's' : ''} today. Every single one matters.`
    setSummaryMsg(msg)
    setPhase('done')
    setTimeout(() => setSummaryVis(true), 200)
    setTimeout(() => {
      // Slide down
      setVisible(false)
      setTimeout(onClose, 350)
    }, outcome === 'skip' ? 2000 : 2000)
  }, [totalPausesTriggered, onClose])

  function handleXClose() {
    setVisible(false)
    setTimeout(onClose, 350)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}>
      <div className={`${styles.screen} ${visible ? styles.screenVisible : ''}`}>

        {/* Close button */}
        {phase !== 'done' && (
          <button
            className={styles.closeBtn}
            onClick={handleXClose}
            aria-label="Close pause screen"
          >
            ✕
          </button>
        )}

        {/* ── Breathing phase ────────────────────────────────────────── */}
        {phase === 'breathing' && (
          <div className={styles.breathingPhase}>
            <p className={styles.breathLabel}>Taking a pause</p>
            <BreathingCircle />
            <p className={styles.breathHint}>Breathe with the circle for a second if you want.</p>

            <div className={`${styles.appSection} ${showInput ? styles.appSectionVisible : ''}`}>
              <p className={styles.questionText}>What were you about to open?</p>
              <div className={styles.chipRow}>
                {APPS.map((app) => (
                  <button
                    key={app}
                    className={`${styles.chip} ${selectedApp === app ? styles.chipSelected : ''}`}
                    onClick={() => {
                      handleSelectApp(app)
                      if (app !== 'Other') setPhase('app')
                    }}
                  >
                    {app}
                  </button>
                ))}
              </div>
              {selectedApp === 'Other' && (
                <input
                  type="text"
                  className={styles.customInput}
                  placeholder="Which app?"
                  value={customApp}
                  onChange={(e) => setCustomApp(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && customApp.trim()) setPhase('app') }}
                  autoFocus
                />
              )}
              {selectedApp === 'Other' && customApp.trim() && (
                <button className={styles.continueBtn} onClick={() => setPhase('app')}>
                  Continue
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── App selected → show trigger question ───────────────────── */}
        {phase === 'app' && (
          <div className={styles.triggerPhase}>
            <BreathingCircle small />
            <p className={styles.questionText}>And honestly, why?</p>
            <div className={styles.chipColumn}>
              {TRIGGERS.map((trig) => (
                <button
                  key={trig}
                  className={`${styles.chip} ${selectedTrig === trig ? styles.chipSelected : ''}`}
                  onClick={() => handleSelectTrigger(trig)}
                >
                  {trig}
                </button>
              ))}
            </div>
            {selectedTrig === 'i actually need something specific' && (
              <input
                type="text"
                className={styles.customInput}
                placeholder="What do you need?"
                value={customTrig}
                onChange={(e) => setCustomTrig(e.target.value)}
                autoFocus
              />
            )}
          </div>
        )}

        {/* ── Countdown ──────────────────────────────────────────────── */}
        {phase === 'countdown' && (
          <div className={styles.countdownPhase}>
            <CountdownRing seconds={countdown} total={COUNTDOWN_SECS} />
            <p className={styles.countdownHint}>
              Do you still want to open it? Either way is fine.
            </p>

            <div className={`${styles.choiceButtons} ${choiceVisible ? styles.choiceVisible : ''}`}>
              <button className={styles.skipBtn} onClick={handleSkip}>
                Nah, I'm good
                <span className={styles.xpBadge}>+10 XP</span>
              </button>
              <button className={styles.proceedBtn} onClick={handleProceed}>
                I'll open it, but on purpose
                <span className={styles.xpBadgeSmall}>+5 XP</span>
              </button>
            </div>
          </div>
        )}

        {/* ── Done / summary ──────────────────────────────────────────── */}
        {phase === 'done' && (
          <div className={styles.donePhase}>
            {xpAmount && <XPFly amount={xpAmount} onDone={() => setXpAmount(null)} />}
            <p className={`${styles.summaryMsg} ${summaryVis ? styles.summaryMsgVisible : ''}`}>
              {summaryMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
