import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import type { UserGoal } from '../store/useUserStore'
import OBHook from './onboarding/OBHook'
import Step3Tools from './onboarding/Step3Tools'
import OBSetup from './onboarding/OBSetup'
import Step8HumanMode from './onboarding/Step8HumanMode'
import Step8IdentityStatement from './onboarding/Step8IdentityStatement'
import Step9Welcome from './onboarding/Step9Welcome'
import styles from './Onboarding.module.css'

const TOTAL_STEPS = 6

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [exiting, setExiting] = useState(false)

  // Collected data
  const [triggers, setTriggers] = useState<string[]>([])
  const [apps, setApps] = useState<string[]>(['TikTok', 'Instagram'])
  const [goal, setGoalLocal] = useState<UserGoal>('general')
  const [identityStatement, setIdentityStatement] = useState('')
  const [hmStart, setHmStart] = useState('09:00')
  const [hmEnd, setHmEnd] = useState('21:00')
  const [hmActive, setHmActive] = useState(true)

  const navigate = useNavigate()
  const store = useUserStore()

  function advance(to?: number) {
    setExiting(true)
    setTimeout(() => {
      setStep(to ?? ((s) => s + 1))
      setExiting(false)
    }, 280)
  }

  function goBack() {
    setExiting(true)
    setTimeout(() => {
      setStep((s) => s - 1)
      setExiting(false)
    }, 280)
  }

  function skipToEnd() {
    advance(TOTAL_STEPS)
  }

  function handleFinish() {
    store.setTriggers(triggers)
    store.updateStats({ pauseApps: apps })
    store.setGoal(goal)
    store.setPersonalIdentityStatement(identityStatement)
    store.setHumanModeSchedule(hmStart, hmEnd)
    store.setHumanMode(hmActive)
    // Always persist the schedule block (even if Pause is off)
    store.addHumanHour({ start: hmStart, end: hmEnd })
    // Default notifications: 8am morning, 6pm evening
    store.setNotifyTime('08:00')
    store.setNotifyPref('notifyDailyReminder', true)
    store.setNotifyPref('notifyEveningReflection', true)
    store.setNotifyPref('notifyStreakReminder', true)
    store.setOnboardingComplete()
    navigate('/today')
  }

  return (
    <div className={styles.root}>
      <div
        key={step}
        className={`${styles.stepWrap} ${exiting ? styles.exiting : styles.entering}`}
      >
        {step === 1 && (
          <OBHook onNext={() => advance()} />
        )}
        {step === 2 && (
          <Step3Tools onNext={() => advance()} onBack={goBack} />
        )}
        {step === 3 && (
          <OBSetup
            onNext={(t, a, g) => {
              setTriggers(t)
              setApps(a)
              setGoalLocal(g)
              advance()
            }}
            onBack={goBack}
            onSkip={skipToEnd}
          />
        )}
        {step === 4 && (
          <Step8HumanMode
            initialStart={hmStart}
            initialEnd={hmEnd}
            initialActive={hmActive}
            onNext={(s, e, a) => { setHmStart(s); setHmEnd(e); setHmActive(a); advance() }}
            onBack={goBack}
            onSkip={skipToEnd}
          />
        )}
        {step === 5 && (
          <Step8IdentityStatement
            goal={goal}
            onNext={(stmt) => { setIdentityStatement(stmt); advance() }}
            onBack={goBack}
            onSkip={skipToEnd}
          />
        )}
        {step === 6 && (
          <Step9Welcome onNext={handleFinish} />
        )}
      </div>

      {/* Progress dots — always 6 */}
      <div className={styles.dots}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i + 1 <= step ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
