import { defineStore } from 'pinia'

export const useSearchItem = defineStore('searchItem', () => {
  const searchItemInfo = { selectItemName: '' }
  return { searchItemInfo }
})
