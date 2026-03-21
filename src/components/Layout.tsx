import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import ToastContainer from './ToastContainer'
import styles from './Layout.module.css'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className={styles.layout}>
      <ToastContainer />
      <main className={styles.main} key={pathname}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
