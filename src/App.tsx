import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Missions from './pages/Missions'
import Progress from './pages/Progress'
import Science from './pages/Science'
import Settings from './pages/Settings'
import HowItWorks from './pages/HowItWorks'
import { useUserStore } from './store/useUserStore'

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboardingComplete = useUserStore((s) => s.onboardingComplete)
  if (!onboardingComplete) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
