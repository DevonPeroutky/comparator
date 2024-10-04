import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Provider } from 'jotai'
import { DevTools } from 'jotai-devtools';

createRoot(document.getElementById('root')!).render(
  <Provider>
    {/* <DevTools /> */}
    <StrictMode>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </StrictMode>,
  </Provider>
)
