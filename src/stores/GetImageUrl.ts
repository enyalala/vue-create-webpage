import { defineStore } from 'pinia'

export const useImageUrl = defineStore('imageUrl', () => {
  const getCoverUrl = (name: number) => {
    return new URL(`../assets/img/dramacover/cover${name}.jpg`, import.meta.url)
      .href
  }

  const getSideUrl = (name: number, count: number) => {
    return new URL(
      `../assets/img/sidephoto/sidephoto${name}_${count}.jpg`,
      import.meta.url
    ).href
  }

  return { getCoverUrl, getSideUrl }
})
