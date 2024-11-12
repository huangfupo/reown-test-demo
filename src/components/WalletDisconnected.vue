<template>
  <el-popover placement="bottom-end" :width="300" trigger="click">
    <template #reference>
      <el-button type="success">{{ address }}</el-button>
    </template>
    <template #default>
        <el-button type="danger" @click="handelDisconnect">断开连接</el-button>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/global'
import { useConnectWallet } from '@/hooks/useConnectWallet'

const globalStore = useGlobalStore()

const address = computed(() => globalStore.walletInfo.address)

const { disconnectWallet } = useConnectWallet()

const handelDisconnect = () => {
  disconnectWallet()
}
</script>