// ── Re-engagement browser notifications ──────────────────────────────────────
//
// Sends a one-time browser notification when the user returns after N days away.
// Since this is a web app without background service workers, we send immediately
// on app open — if they've been away and have notification permission.

interface ReengageMessage {
  key: string
  title: string
  body: string
}

function getMessageForDaysAway(daysAway: number): ReengageMessage | null {
  if (daysAway < 1) return null

  if (daysAway === 1) {
    return {
      key: 'day1',
      title: 'Unloop',
      body: 'Your practices are waiting for you. Even one keeps the momentum going.',
    }
  }
  if (daysAway === 2) {
    return {
      key: 'day2',
      title: 'Unloop',
      body: "Your streak is paused but not broken. You can pick it back up today.",
    }
  }
  if (daysAway >= 3 && daysAway <= 6) {
    return {
      key: 'day3',
      title: 'Unloop',
      body: "It's been a few days. That's okay. Everyone takes breaks. Your progress is still here whenever you're ready.",
    }
  }
  if (daysAway >= 7 && daysAway <= 13) {
    return {
      key: 'day7',
      title: 'Unloop',
      body: "Hey. No guilt, no pressure. Unloop is here when you want it. Your data is saved and you can pick up right where you left off.",
    }
  }
  if (daysAway >= 14 && daysAway <= 29) {
    return {
      key: 'day14',
      title: 'Unloop',
      body: "It's been two weeks. A lot of people come back around this point. If you're ready, today is a perfect day to start fresh.",
    }
  }
  // 30+
  return {
    key: 'day30',
    title: 'Unloop',
    body: 'Still here if you need it. Just wanted you to know your Level and progress are waiting.',
  }
}

export function scheduleReengageNotifications(
  daysAway: number,
  sentKeys: string[],
  onSent: (key: string) => void
): void {
  if (!('Notification' in window)) return

  const msg = getMessageForDaysAway(daysAway)
  if (!msg) return
  if (sentKeys.includes(msg.key)) return

  const sendNotification = () => {
    if (Notification.permission !== 'granted') return
    new Notification(msg.title, { body: msg.body, icon: '/icon-192.png' })
    onSent(msg.key)
  }

  if (Notification.permission === 'granted') {
    sendNotification()
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        sendNotification()
      }
    })
  }
}
