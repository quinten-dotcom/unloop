import { Capacitor } from '@capacitor/core'

/**
 * Called once on app startup.
 * Sets up status bar, hides splash screen, and registers for push notifications.
 * All calls are guarded — they silently no-op in the browser.
 */
export async function initNative() {
  if (!Capacitor.isNativePlatform()) return

  await Promise.all([
    initStatusBar(),
    initSplashScreen(),
    initPushNotifications(),
  ])
}

async function initStatusBar() {
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' })
  } catch (_) { /* not available */ }
}

async function initSplashScreen() {
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen')
    await SplashScreen.hide()
  } catch (_) { /* not available */ }
}

async function initPushNotifications() {
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications')

    const permission = await PushNotifications.requestPermissions()
    if (permission.receive !== 'granted') return

    await PushNotifications.register()

    PushNotifications.addListener('registration', (token) => {
      // Store the device token — you'll need this to send targeted push notifications
      // from a backend in the future. For now it's saved locally.
      localStorage.setItem('devicePushToken', token.value)
    })

    PushNotifications.addListener('registrationError', (err) => {
      console.warn('Push registration failed:', err)
    })

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push received in foreground:', notification.title)
    })

    PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      // User tapped a notification — navigate to the right screen
      const data = action.notification.data
      if (data?.route) {
        window.location.hash = data.route
      }
    })
  } catch (_) { /* not available */ }
}
