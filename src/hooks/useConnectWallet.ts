import { watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

import { useAppKitAccount, useAppKit, useDisconnect } from '@reown/appkit/vue'
import { useGlobalStore } from '@/stores/global'

export function useConnectWallet() {
  const globalStore = useGlobalStore()
  const modal = useAppKit()
  const { address, isConnected, caipAddress } = useAppKitAccount()
  const { disconnect } = useDisconnect()

  if (!globalStore.walletInfo.address) {
    globalStore.setWalletInfo({
      address: '',
      isConnected: '',
      chainId: caipAddress?.split(':')[1],
    })
  }

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

  watch([address, caipAddress], () => {
    globalStore.setWalletInfo({
      address,
      isConnected,
      chainId: caipAddress?.split(':')[1],
    })
  })

  return {
    connectWallet,
    disconnectWallet
  }
}
