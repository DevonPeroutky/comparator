import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Provider } from 'jotai'
import { Toaster } from './components/ui/toaster.tsx'
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
  <Provider>
    {/* <DevTools /> */}
    <StrictMode>
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
      <Analytics />
    </StrictMode>,
  </Provider>
)
