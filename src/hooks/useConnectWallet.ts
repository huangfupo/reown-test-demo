import { watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

import { useAppKitAccount, useAppKit, useDisconnect } from '@reown/appkit/vue'
import { useGlobalStore } from '@/stores/global'

export function useConnectWallet() {
  const globalStore = useGlobalStore()
  const modal = useAppKit()
  const appkitAccount = useAppKitAccount()
  const { disconnect } = useDisconnect()

  const connectWallet = () => {
    modal.open()
  }

  const disconnectWallet = () => {
    ElMessageBox.confirm('是否断开钱包连接？', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info'
    })
      .then(() => {
        ElMessage.error('断开成功')
        disconnect()
      })
      .catch(() => {})
  }

  watch([() => appkitAccount.value.address, () => appkitAccount.value.isConnected, () => appkitAccount.value.caipAddress], () => {
    console.log('account updated:', appkitAccount.value.address)
    console.log('account updated:', appkitAccount.value.isConnected)

    globalStore.setWalletInfo({
      address:appkitAccount.value.address,
      isConnected:appkitAccount.value.isConnected,
      chainId: appkitAccount.value.caipAddress?.split(':')[1],
    })
  })

  return {
    connectWallet,
    disconnectWallet
  }
}
