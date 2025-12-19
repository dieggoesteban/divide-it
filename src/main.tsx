import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ParticipantsProvider } from '@/context/ParticipantsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticipantsProvider>
      <App />
    </ParticipantsProvider>
  </StrictMode>,
)
