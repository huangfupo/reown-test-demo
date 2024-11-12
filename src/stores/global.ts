/**
 * ref() 就是 state属性
 * computed() 就是 getters
 * function() 就是 actions
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
 
  // 钱包信息
  const walletInfo = ref<any>({
    address: '',
    isConnected: false,
    chainId: '',
  })

  
  /** 处置操作 */

  // 修改钱包信息
  function setWalletInfo(val: any): void {
    walletInfo.value = val
  }

  

  return {
    walletInfo,
    setWalletInfo,
  }
})
