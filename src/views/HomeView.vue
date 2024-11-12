
<template>
  <WalletConnect v-if="!isConnected" />
  <WalletDisconnected v-if="isConnected"/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WalletConnect from '@/components/WalletConnect.vue'
import WalletDisconnected from '@/components/WalletDisconnected.vue'

import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

const isConnected = computed(() => globalStore.walletInfo.isConnected)
</script>

