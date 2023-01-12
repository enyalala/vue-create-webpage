import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { User } from 'firebase/auth'

export const useUserInfo = defineStore('userInfo', () => {
  const UserInfo = reactive<{ data: User | null }>({ data: null })

  const setCurrentUser = (userData: User) => {
    UserInfo.data = userData
  }
  return { UserInfo, setCurrentUser }
})
