import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserInfo = defineStore('userInfo', () => {
  const UserInfo = reactive<{ data: User | null }>({ data: null })

  const setUserInfo = (user: User) => {
    UserInfo.data = user
  }

  return { UserInfo, setUserInfo }
})
