import { defineChain } from 'viem'
import {
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";


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

export const { chains, provider } = configureChains(
  [
    testnet
  ],
);


export const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.metaMask({ chains, shimDisconnect: true }),
      wallet.walletConnect({ chains }),
    ],
  },
]);


export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});
