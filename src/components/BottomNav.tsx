import { NavLink } from 'react-router-dom'
import { useMissionStore, isMissionCompleted } from '../store/useMissionStore'
import styles from './BottomNav.module.css'

export default function BottomNav() {
  const { missions, completed } = useMissionStore()
  const doneCount = missions.filter((m) => isMissionCompleted(completed, m.id)).length
  const hasUncompletedPractices = missions.length > 0 && doneCount < missions.length

  return (
    <nav className={styles.nav} aria-label="Main navigation">

      {/* Today */}
      <NavLink
        to="/today"
        aria-label="Today"
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
        data-tutorial="today-tab"
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          {hasUncompletedPractices && (
            <span className={styles.pendingDot} aria-label="Practices to do" />
          )}
        </span>
        <span className={styles.label}>Today</span>
        <span className={styles.activeDot} aria-hidden="true" />
      </NavLink>

      {/* Progress */}
      <NavLink
        to="/progress"
        aria-label="Progress"
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </span>
        <span className={styles.label}>Progress</span>
        <span className={styles.activeDot} aria-hidden="true" />
      </NavLink>

      {/* Settings */}
      <NavLink
        to="/settings"
        aria-label="Settings"
        className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
      >
        <span className={styles.iconWrap} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </span>
        <span className={styles.label}>Settings</span>
        <span className={styles.activeDot} aria-hidden="true" />
      </NavLink>

    </nav>
  )
}
