import { defineStore } from 'pinia'

export const useUserInfo = defineStore('userInfo', () => {
  const userInfo = [{ userId: 0, account: 'lena@gmail.com', password: 'a0000' }]
  return { userInfo }
})
