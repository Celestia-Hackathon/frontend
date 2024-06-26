import { defineChain } from 'viem'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = '7a6f6198dfa778cf78750771eac41053'

export const testnet = defineChain({
  id: 123420111,
  name: 'Raspberry',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.opcelestia-raspberry.gelato.digital'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://opcelestia-raspberry.gelatoscout.com/' },
  },
  contracts: {
  },
})

export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: {projectId} as any,
    chains: [testnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });