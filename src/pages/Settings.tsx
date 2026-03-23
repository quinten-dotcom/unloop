import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useMissionStore } from '../store/useMissionStore'
import type { UserGoal } from '../store/useUserStore'
import { TEMPTATION_BUNDLES } from '../data/temptationBundles'
import styles from './Settings.module.css'

// ── Shared UI atoms ───────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
    >
      <span className={styles.toggleThumb} />
    </button>
  )
}

function SectionHeader({ label, icon }: { label: string; icon: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIcon}>{icon}</span>
      <span>{label}</span>
    </div>
  )
}

function SettingRow({
  label,
  description,
  right,
}: {
  label: string
  description?: string
  right?: React.ReactNode
}) {
  return (
    <div className={styles.row}>
      <div className={styles.rowLeft}>
        <span className={styles.rowLabel}>{label}</span>
        {description && <span className={styles.rowDesc}>{description}</span>}
      </div>
      {right && <div className={styles.rowRight}>{right}</div>}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt24to12(time: string): string {
  const [hStr, mStr] = time.split(':')
  const h = parseInt(hStr, 10)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${mStr} ${ampm}`
}


const GOAL_OPTIONS: Array<{ id: UserGoal; icon: string; label: string; desc: string }> = [
  { id: 'better-focus',   icon: '🎯', label: 'Focus & productivity', desc: "Stop losing hours you can't account for." },
  { id: 'better-sleep',   icon: '😴', label: 'Better sleep',         desc: 'Your evenings and mornings are yours again.' },
  { id: 'presence',       icon: '💪', label: 'Real-life presence',   desc: 'Be there for the people in front of you.' },
  { id: 'mental-clarity', icon: '🧠', label: 'Mental clarity',       desc: 'Less noise in your head, more actual thoughts.' },
]

// ── Time Block Modal ──────────────────────────────────────────────────────────

function TimeBlockModal({
  onSave,
  onClose,
}: {
  onSave: (start: string, end: string) => void
  onClose: () => void
}) {
  const [start, setStart] = useState('08:00')
  const [end,   setEnd]   = useState('09:00')

  function handleSave() {
    if (start && end) onSave(start, end)
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalSheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.sheetHandle} />
        <h3 className={styles.sheetTitle}>Add a pause block</h3>
        <p className={styles.sheetDesc}>
          The Pause will be active during this time window.
        </p>

        <div className={styles.timeRow}>
          <div className={styles.timeField}>
            <label className={styles.timeLabel}>Start</label>
            <input
              type="time"
              className={styles.timeInput}
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className={styles.timeSep}>→</div>
          <div className={styles.timeField}>
            <label className={styles.timeLabel}>End</label>
            <input
              type="time"
              className={styles.timeInput}
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.sheetActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>Save block</button>
        </div>
      </div>
    </div>
  )
}

// ── Reset Confirm ─────────────────────────────────────────────────────────────

function ResetConfirm({ onCancel }: { onCancel: () => void }) {
  const [input, setInput] = useState('')
  const resetOnboarding = useUserStore((s) => s.resetOnboarding)
  const ready = input === 'RESET'

  function handleReset() {
    if (!ready) return
    // Reset Zustand state in memory first so it re-persists as incomplete,
    // then clear the other stores from localStorage before reloading.
    resetOnboarding()
    ;['unloop-missions', 'unloop-challenges', 'tutorialComplete'].forEach((k) =>
      localStorage.removeItem(k)
    )
    window.location.replace('/onboarding')
  }

  return (
    <div className={styles.resetConfirm}>
      <p className={styles.resetWarning}>
        ⚠️ This will erase all your XP, streaks, and history. It cannot be undone.
      </p>
      <p className={styles.resetPrompt}>Type <strong>RESET</strong> to confirm:</p>
      <input
        type="text"
        className={styles.resetInput}
        placeholder="RESET"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoCapitalize="characters"
      />
      <div className={styles.resetActions}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button
          className={`${styles.dangerBtn} ${!ready ? styles.dangerDisabled : ''}`}
          disabled={!ready}
          onClick={handleReset}
        >
          Erase everything
        </button>
      </div>
    </div>
  )
}

// ── Section: Temptation Bundle ────────────────────────────────────────────────

function TemptationBundleSection() {
  const { activeBundleIds, setActiveBundleIds } = useUserStore()

  function toggleBundle(id: string) {
    const next = activeBundleIds.includes(id)
      ? activeBundleIds.filter((b) => b !== id)
      : [...activeBundleIds, id]
    setActiveBundleIds(next)
  }

  return (
    <section className={styles.section}>
      <SectionHeader label="Bundle Your Habits" icon="🎁" />
      <p className={styles.sectionNote}>
        Pair something you love with a healthy behavior. When you complete the practice, you unlock the reward. This is called temptation bundling.
      </p>

      {TEMPTATION_BUNDLES.map((bundle) => {
        const active = activeBundleIds.includes(bundle.id)
        return (
          <div key={bundle.id} className={styles.bundleRow}>
            <div className={styles.bundleText}>
              <span className={styles.bundleEmoji}>{bundle.emoji}</span>
              <span className={styles.bundleFullText}>{bundle.fullText}</span>
            </div>
            <Toggle on={active} onChange={() => toggleBundle(bundle.id)} />
          </div>
        )
      })}
    </section>
  )
}

// ── Section: The Pause ────────────────────────────────────────────────────────

const ALL_APPS = [
  'TikTok', 'Instagram', 'YouTube', 'X (Twitter)', 'Facebook',
  'Snapchat', 'Reddit', 'LinkedIn', 'Pinterest', 'Threads',
]

function ThePauseSection() {
  const {
    humanModeActive, setHumanMode,
    pauseApps, updateStats,
    humanHours, addHumanHour, removeHumanHour,
  } = useUserStore()
  const [showModal, setShowModal] = useState(false)

  function toggleApp(app: string) {
    const next = pauseApps.includes(app)
      ? pauseApps.filter((a) => a !== app)
      : [...pauseApps, app]
    updateStats({ pauseApps: next })
  }

  return (
    <section className={styles.section}>
      <SectionHeader label="The Pause" icon="⏸️" />

      {/* Master toggle */}
      <SettingRow
        label="The Pause is active"
        description="Adds a 10-second pause before your selected apps open"
        right={<Toggle on={humanModeActive} onChange={setHumanMode} />}
      />
      <div className={styles.divider} />

      {/* Apps to pause */}
      <div className={styles.row} style={{ flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
        <span className={styles.rowLabel}>Apps to pause before</span>
        <div className={styles.appChips}>
          {ALL_APPS.map((app) => {
            const on = pauseApps.includes(app)
            return (
              <button
                key={app}
                className={`${styles.appChip} ${on ? styles.appChipOn : ''}`}
                onClick={() => toggleApp(app)}
                aria-pressed={on}
              >
                {app}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.divider} />

      {/* Schedule blocks */}
      <span className={styles.rowLabel}>Pause schedule</span>
      {humanHours.length === 0 ? (
        <p className={styles.emptyNote}>No schedule set yet. Add a block to schedule when The Pause is active.</p>
      ) : (
        <div className={styles.blockList}>
          {humanHours.map((h) => (
            <div key={h.id} className={styles.timeBlock}>
              <span className={styles.timeBlockText}>
                {fmt24to12(h.start)} — {fmt24to12(h.end)}
              </span>
              <button
                className={styles.removeBtn}
                onClick={() => removeHumanHour(h.id)}
                aria-label="Remove time block"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <button className={styles.addBtn} onClick={() => setShowModal(true)}>
        + Add time block
      </button>

      {showModal && (
        <TimeBlockModal
          onSave={(start, end) => {
            addHumanHour({ start, end })
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  )
}

// ── Section: Notifications ────────────────────────────────────────────────────

function NotificationsSection() {
  const {
    notifyDailyReminder,
    notifyDailyReminderTime,
    notifyEveningReflection,
    notifyStreakReminder,
    setNotifyPref,
    setNotifyTime,
  } = useUserStore()

  return (
    <section className={styles.section}>
      <SectionHeader label="Notifications" icon="🔔" />

      <SettingRow
        label="Daily practice reminder"
        description="A nudge to do today's practices"
        right={
          <div className={styles.toggleWithTime}>
            {notifyDailyReminder && (
              <input
                type="time"
                className={styles.timeInputSmall}
                value={notifyDailyReminderTime}
                onChange={(e) => setNotifyTime(e.target.value)}
              />
            )}
            <Toggle
              on={notifyDailyReminder}
              onChange={(v) => setNotifyPref('notifyDailyReminder', v)}
            />
          </div>
        }
      />
      <div className={styles.divider} />

      <SettingRow
        label="Evening check-in"
        description="A quick check-in about how the day went"
        right={
          <Toggle
            on={notifyEveningReflection}
            onChange={(v) => setNotifyPref('notifyEveningReflection', v)}
          />
        }
      />
      <div className={styles.divider} />

      <SettingRow
        label="Streak alert"
        description="Heads up before your streak would break"
        right={
          <Toggle
            on={notifyStreakReminder}
            onChange={(v) => setNotifyPref('notifyStreakReminder', v)}
          />
        }
      />
    </section>
  )
}

// ── Section: Account ──────────────────────────────────────────────────────────

function AccountSection() {
  const { name, goal, setName, setGoal } = useUserStore()
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(name)
  const [showGoalPicker, setShowGoalPicker] = useState(false)
  const [showReset, setShowReset] = useState(false)

  function saveName() {
    setName(nameVal.trim())
    setEditingName(false)
  }

  function exportData() {
    const userData    = { ...useUserStore.getState() }
    const missionData = { ...useMissionStore.getState() }
    // Strip functions
    const clean = JSON.parse(JSON.stringify({ user: userData, missions: missionData, exportedAt: new Date().toISOString() }))
    const blob  = new Blob([JSON.stringify(clean, null, 2)], { type: 'application/json' })
    const url   = URL.createObjectURL(blob)
    const a     = document.createElement('a')
    a.href      = url
    a.download  = `unloop-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const currentGoal = GOAL_OPTIONS.find((g) => g.id === goal)

  return (
    <section className={styles.section}>
      <SectionHeader label="Account" icon="👤" />

      {/* Display name */}
      <div className={styles.row}>
        <div className={styles.rowLeft}>
          <span className={styles.rowLabel}>Your name</span>
          {!editingName && (
            <span className={styles.rowDesc}>
              {name || <em className={styles.unset}>Not set yet</em>}
            </span>
          )}
        </div>
        <div className={styles.rowRight}>
          {editingName ? (
            <div className={styles.inlineEdit}>
              <input
                type="text"
                className={styles.inlineInput}
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') saveName() }}
                autoFocus
                maxLength={32}
              />
              <button className={styles.saveInlineBtn} onClick={saveName}>Save</button>
            </div>
          ) : (
            <button className={styles.editBtn} onClick={() => { setNameVal(name); setEditingName(true) }}>
              Edit
            </button>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Goal */}
      <div className={styles.row} style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
        <div className={styles.rowHeaderLine}>
          <span className={styles.rowLabel}>Your goal</span>
          <button className={styles.editBtn} onClick={() => setShowGoalPicker((s) => !s)}>
            {showGoalPicker ? 'Done' : 'Change'}
          </button>
        </div>
        {!showGoalPicker && currentGoal && (
          <div className={styles.goalCurrent}>
            <span>{currentGoal.icon}</span>
            <span className={styles.goalCurrentLabel}>{currentGoal.label}</span>
          </div>
        )}
        {showGoalPicker && (
          <div className={styles.goalList}>
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={`${styles.goalRow} ${goal === opt.id ? styles.goalRowSelected : ''}`}
                onClick={() => { setGoal(opt.id); setShowGoalPicker(false) }}
              >
                <span className={styles.goalIcon}>{opt.icon}</span>
                <div className={styles.goalInfo}>
                  <span className={styles.goalLabel}>{opt.label}</span>
                  <span className={styles.goalDesc}>{opt.desc}</span>
                </div>
                {goal === opt.id && <span className={styles.goalCheck}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.divider} />

      {/* Export */}
      <SettingRow
        label="export my data"
        description="download a copy of everything. it's just a JSON file."
        right={
          <button className={styles.actionBtn} onClick={exportData}>
            Export
          </button>
        }
      />

      <div className={styles.divider} />

      {/* Reset */}
      {!showReset ? (
        <SettingRow
          label="reset everything"
          description="wipes all your data and starts fresh"
          right={
            <button className={styles.dangerBtn} onClick={() => setShowReset(true)}>
              Reset
            </button>
          }
        />
      ) : (
        <ResetConfirm onCancel={() => setShowReset(false)} />
      )}
    </section>
  )
}

// ── Section: About ────────────────────────────────────────────────────────────

function AboutSection() {
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <SectionHeader label="About" icon="ℹ️" />

      <button className={styles.linkRow} onClick={() => navigate('/how-it-works')}>
        <span>How Unloop Works</span>
        <span className={styles.externalIcon}>→</span>
      </button>
      <div className={styles.divider} />

      <SettingRow label="Version" right={<span className={styles.versionTag}>1.0.0</span>} />
      <div className={styles.divider} />

      <button className={styles.linkRow} onClick={() => window.open('/privacy.html', '_blank')}>
        <span>Privacy Policy</span>
        <span className={styles.externalIcon}>→</span>
      </button>
      <div className={styles.divider} />
      <SettingRow label="Terms of Service" right={<span className={styles.versionTag}>Coming soon</span>} />

      <p className={styles.tagline}>
        built to help you break the loop.
      </p>
    </section>
  )
}

// ── Section: Dev (testing only — kept for internal use) ──────────────────────

function DevSection() {
  const navigate        = useNavigate()
  const resetOnboarding = useUserStore((s) => s.resetOnboarding)

  function handleRestart() {
    localStorage.removeItem('tutorialComplete')
    resetOnboarding()
    navigate('/onboarding', { replace: true })
  }

  if (import.meta.env.PROD) return null

  return (
    <div style={{ background: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: 14, padding: '14px 16px' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
        🛠️ Dev / Testing
      </p>
      <button
        onClick={handleRestart}
        style={{
          display: 'block', width: '100%', padding: '14px',
          background: '#F59E0B', color: '#fff', fontWeight: 800,
          fontSize: 15, border: 'none', borderRadius: 10, cursor: 'pointer',
        }}
      >
        Restart Onboarding
      </button>
    </div>
  )
}


// ── Page ──────────────────────────────────────────────────────────────────────

export default function Settings() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <ThePauseSection />
      <NotificationsSection />
      <AccountSection />
      <TemptationBundleSection />
      <AboutSection />
      <DevSection />
    </div>
  )
}
