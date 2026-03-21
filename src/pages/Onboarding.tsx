import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepWakeUp from './onboarding/StepWakeUp'
import StepScience from './onboarding/StepScience'
import StepGoal from './onboarding/StepGoal'
import StepApps from './onboarding/StepApps'
import StepWelcome from './onboarding/StepWelcome'
import { useUserStore } from '../store/useUserStore'
import type { UserGoal } from '../store/useUserStore'
import styles from './Onboarding.module.css'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [exiting, setExiting] = useState(false)
  const [collectedGoal, setCollectedGoal] = useState<UserGoal>('general')
  const [collectedApps, setCollectedApps] = useState<string[]>([])

  const navigate = useNavigate()
  const { setGoal, updateStats } = useUserStore()

  function advance(callback?: () => void) {
    setExiting(true)
    setTimeout(() => {
      callback?.()
      setStep((s) => s + 1)
      setExiting(false)
    }, 280)
  }

  function handleStep3Next(goal: UserGoal) {
    setCollectedGoal(goal)
    advance()
  }

  function handleStep4Next(apps: string[]) {
    setCollectedApps(apps)
    advance()
  }

  function handleFinalNext() {
    setGoal(collectedGoal)
    updateStats({ pauseApps: collectedApps })
    navigate('/home')
  }

  return (
    <div className={styles.root}>
      <div
        key={step}
        className={`${styles.stepWrap} ${exiting ? styles.exiting : styles.entering}`}
      >
        {step === 1 && <StepWakeUp onNext={() => advance()} />}
        {step === 2 && <StepScience onNext={() => advance()} />}
        {step === 3 && <StepGoal onNext={handleStep3Next} />}
        {step === 4 && <StepApps onNext={handleStep4Next} />}
        {step === 5 && <StepWelcome onNext={handleFinalNext} />}
      </div>

      <div className={styles.dots}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i + 1 <= step ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
