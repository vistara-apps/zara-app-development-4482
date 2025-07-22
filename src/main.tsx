import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import './index.css'

// Validate required environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '380b8103643344f9aa330eae7aacb13c';
if (!projectId) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID is required. Please check your .env file.');
}

const appName = import.meta.env.VITE_APP_NAME || "Crypto Autopilot";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={getDefaultConfig({
        appName,
        projectId,
        chains: [mainnet, polygon, optimism, arbitrum, base],
      })}>
        <QueryClientProvider client={new QueryClient()}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
