import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './polyfills'

import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <MetaMaskUIProvider 
    sdkOptions={{
      dappMetadata: {
          name: "Example React UI Dapp",
          url: window.location.href,
      },
      infuraAPIKey: "911f30a9c97f443abc62aa7a61a58b0e",
      readonlyRPCMap: {
        "0x75b3dcf": "https://rpc.opcelestia-raspberry.gelato.digital/"
      }
      // Other options
    }}>
      <App />
  </MetaMaskUIProvider>
  </React.StrictMode>,
)
