import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', () => {
  const UserInfo: any = []
  return { UserInfo }
})
