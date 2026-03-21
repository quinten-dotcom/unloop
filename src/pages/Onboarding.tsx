import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import type { UserGoal } from '../store/useUserStore'
import Step1Hook from './onboarding/Step1Hook'
import Step2Loop from './onboarding/Step2Loop'
import Step3Tools from './onboarding/Step3Tools'
import Step4Triggers from './onboarding/Step4Triggers'
import Step5Apps from './onboarding/Step5Apps'
import Step6Goal from './onboarding/Step6Goal'
import Step7IntentionPlans from './onboarding/Step7IntentionPlans'
import Step8IdentityStatement from './onboarding/Step8IdentityStatement'
import Step9Schedule from './onboarding/Step7Schedule'
import Step10HumanMode from './onboarding/Step8HumanMode'
import Step11Welcome from './onboarding/Step9Welcome'
import styles from './Onboarding.module.css'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [exiting, setExiting] = useState(false)

  // Collected data
  const [triggers, setTriggers] = useState<string[]>([])
  const [apps, setApps] = useState<string[]>(['TikTok', 'Instagram', 'X', 'YouTube'])
  const [goal, setGoalLocal] = useState<UserGoal>('general')
  const [savedIntentions, setSavedIntentionsLocal] = useState<string[]>([])
  const [identityStatementLocal, setIdentityStatementLocal] = useState('')
  const [reminderTime, setReminderTime] = useState('08:00')
  const [eveningEnabled, setEveningEnabled] = useState(true)
  const [hmStart, setHmStart] = useState('09:00')
  const [hmEnd, setHmEnd] = useState('21:00')
  const [hmActive, setHmActive] = useState(true)

  const navigate = useNavigate()
  const store = useUserStore()

  const hasSocialMedia = triggers.includes('social-media')
  // Total logical steps: 11 if social-media selected, 10 if not (skip step 5)
  const totalDots = hasSocialMedia ? 11 : 10

  // Map logical step to dot index (step 5 is skipped → step 6+ shift left by 1)
  function dotIndex(): number {
    if (!hasSocialMedia && step >= 6) return step - 1
    return step
  }

  function advance(nextStep?: number) {
    setExiting(true)
    setTimeout(() => {
      setStep(nextStep ?? ((s) => s + 1))
      setExiting(false)
    }, 280)
  }

  function goBack(toStep?: number) {
    setExiting(true)
    setTimeout(() => {
      setStep(toStep ?? ((s) => s - 1))
      setExiting(false)
    }, 280)
  }

  function skipToEnd() {
    advance(11)
  }

  function handleFinish() {
    store.setTriggers(triggers)
    store.updateStats({ pauseApps: apps })
    store.setGoal(goal)
    store.setSavedIntentions(savedIntentions)
    store.setPersonalIdentityStatement(identityStatementLocal)
    store.setNotifyTime(reminderTime)
    store.setNotifyPref('notifyEveningReflection', eveningEnabled)
    store.setNotifyPref('notifyStreakReminder', eveningEnabled)
    store.setHumanModeSchedule(hmStart, hmEnd)
    store.setHumanMode(hmActive)
    store.setOnboardingComplete()
    navigate('/home')
  }

  const currentDot = dotIndex()

  return (
    <div className={styles.root}>
      <div
        key={step}
        className={`${styles.stepWrap} ${exiting ? styles.exiting : styles.entering}`}
      >
        {step === 1 && (
          <Step1Hook onNext={() => advance()} />
        )}
        {step === 2 && (
          <Step2Loop onNext={() => advance()} onBack={() => goBack()} />
        )}
        {step === 3 && (
          <Step3Tools onNext={() => advance()} onBack={() => goBack()} />
        )}
        {step === 4 && (
          <Step4Triggers
            onNext={(t) => { setTriggers(t); advance(t.includes('social-media') ? 5 : 6) }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 5 && (
          <Step5Apps
            initialApps={apps}
            onNext={(a) => { setApps(a); advance() }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 6 && (
          <Step6Goal
            onNext={(g) => { setGoalLocal(g); advance() }}
            onBack={() => goBack(hasSocialMedia ? 5 : 4)}
            onSkip={skipToEnd}
          />
        )}
        {step === 7 && (
          <Step7IntentionPlans
            onNext={(intentions) => { setSavedIntentionsLocal(intentions); advance() }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 8 && (
          <Step8IdentityStatement
            goal={goal}
            onNext={(stmt) => { setIdentityStatementLocal(stmt); advance() }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 9 && (
          <Step9Schedule
            initialTime={reminderTime}
            initialEvening={eveningEnabled}
            onNext={(t, e) => { setReminderTime(t); setEveningEnabled(e); advance() }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 10 && (
          <Step10HumanMode
            initialStart={hmStart}
            initialEnd={hmEnd}
            initialActive={hmActive}
            onNext={(s, e, a) => { setHmStart(s); setHmEnd(e); setHmActive(a); advance() }}
            onBack={() => goBack()}
            onSkip={skipToEnd}
          />
        )}
        {step === 11 && (
          <Step11Welcome onNext={handleFinish} />
        )}
      </div>

      {/* Progress dots */}
      <div className={styles.dots}>
        {Array.from({ length: totalDots }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i + 1 <= currentDot ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
