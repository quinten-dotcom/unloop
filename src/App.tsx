import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Missions from './pages/Missions'
import Progress from './pages/Progress'
import Science from './pages/Science'
import Settings from './pages/Settings'
import HowItWorks from './pages/HowItWorks'
import WelcomeBack from './pages/WelcomeBack'
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

    // Set install date on first ever open
    setInstallDate(today)

    // Calculate days away before updating lastOpenDate
    if (onboardingComplete && lastOpenDate && lastOpenDate !== today) {
      const last = new Date(lastOpenDate + 'T00:00:00')
      const now  = new Date(today + 'T00:00:00')
      const diff = Math.round((now.getTime() - last.getTime()) / 86_400_000)

      if (diff >= 3) {
        setDaysAway(diff)
        setShowWelcomeBack(true)

        // Generate easy missions for return day
        generateDailyMissions(goal, level, triggers, true)

        // Fire re-engagement browser notification
        scheduleReengageNotifications(diff, reengageNotificationsSent, markReengageNotification)
      }
    }

    // Always update lastOpenDate to today
    setLastOpenDate(today)
  // Run once on mount — eslint-disable is intentional
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleContinue(choice?: 'start-fresh' | 'pick-up') {
    if (choice === 'start-fresh') {
      resetStreak()
    }
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
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/science" element={<Science />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {showWelcomeBack && (
        <WelcomeBack
          daysAway={daysAway}
          onContinue={handleContinue}
          onWhyLeft={handleWhyLeft}
          alreadyAnsweredWhyLeft={whyLeftReason !== null}
        />
      )}
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
