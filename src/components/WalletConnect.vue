<template>
  <el-button type="primary" @click.stop="handelConnect">连接钱包</el-button>
</template>
<script lang="ts" setup>
import { useConnectWallet } from '@/hooks/useConnectWallet'

const { connectWallet } = useConnectWallet()

const handelConnect = () => {
  connectWallet()
}

</script>
