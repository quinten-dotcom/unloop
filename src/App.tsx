import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Today from './pages/Today'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import HowItWorks from './pages/HowItWorks'
import WelcomeBack from './pages/WelcomeBack'
import TutorialOverlay from './components/TutorialOverlay'
import { useUserStore } from './store/useUserStore'
import { useMissionStore } from './store/useMissionStore'
import { scheduleReengageNotifications } from './utils/reengageNotifications'

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useUserStore((s) => s.onboardingComplete)
  if (!onboardingComplete) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

function AppInner() {
  const {
    onboardingComplete,
    lastOpenDate,
    whyLeftReason,
    reengageNotificationsSent,
    goal,
    level,
    triggers,
    resetStreak,
    setInstallDate,
    setLastOpenDate,
    setWhyLeftReason,
    markReengageNotification,
  } = useUserStore()

  const { generateDailyMissions } = useMissionStore()

  const [showWelcomeBack, setShowWelcomeBack] = useState(false)
  const [daysAway, setDaysAway] = useState(0)

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)

    setInstallDate(today)

    if (onboardingComplete && lastOpenDate && lastOpenDate !== today) {
      const last = new Date(lastOpenDate + 'T00:00:00')
      const now  = new Date(today + 'T00:00:00')
      const diff = Math.round((now.getTime() - last.getTime()) / 86_400_000)

      if (diff >= 3) {
        setDaysAway(diff)
        setShowWelcomeBack(true)
        generateDailyMissions(goal, level, triggers, true)
        scheduleReengageNotifications(diff, reengageNotificationsSent, markReengageNotification)
      }
    }

    setLastOpenDate(today)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleContinue(choice?: 'start-fresh' | 'pick-up') {
    if (choice === 'start-fresh') resetStreak()
    setShowWelcomeBack(false)
  }

  function handleWhyLeft(reason: string | null) {
    setWhyLeftReason(reason)
  }

  return (
    <>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route
          element={
            <RequireOnboarding>
              <Layout />
            </RequireOnboarding>
          }
        >
          <Route index element={<Navigate to="/today" replace />} />
          <Route path="/today" element={<Today />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
          {/* Legacy redirects */}
          <Route path="/home" element={<Navigate to="/today" replace />} />
          <Route path="/missions" element={<Navigate to="/today" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/today" replace />} />
      </Routes>

      {showWelcomeBack && (
        <WelcomeBack
          daysAway={daysAway}
          onContinue={handleContinue}
          onWhyLeft={handleWhyLeft}
          alreadyAnsweredWhyLeft={whyLeftReason !== null}
        />
      )}

      {onboardingComplete && <TutorialOverlay />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
