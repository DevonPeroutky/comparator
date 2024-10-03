import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import App from './App.tsx'
import './index.css'

function DebugObserver(): React.Node {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </StrictMode>,
)
