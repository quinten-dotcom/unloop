import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initNative } from './utils/native.ts'

// Initialize native features (status bar, push notifications, etc.)
// Safe to call in browser — all guards are inside initNative
initNative()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
