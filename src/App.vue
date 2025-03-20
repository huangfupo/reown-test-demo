<template>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { createAppKit } from '@reown/appkit/vue'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import { mainnet, bsc,arbitrum,xLayer,base,optimism } from '@reown/appkit/networks'

import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

// 0. Create the Ethers adapter
const ethersAdapter = new EthersAdapter()

// 1. Create Solana adapter
const solanaWeb3JsAdapter = new SolanaAdapter()

// 2. Get projectId from https://cloud.reown.com
const projectId = '0994d604ea8f67806c1604de2ab87feb'

// 3. Set up the metadata - Optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 4. Create the AppKit instance
createAppKit({
  adapters: [ethersAdapter, solanaWeb3JsAdapter],
  networks: [mainnet, bsc,arbitrum, xLayer,base,optimism, solana, solanaTestnet, solanaDevnet],
  metadata,
  projectId,
  features: {
    analytics: true,
  }
})

</script>