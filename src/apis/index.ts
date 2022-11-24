import axios from 'axios'

const dramaInfoRequest = axios.create({
  baseURL: 'http://localhost:3000/dramaInfo',
})

/** 讀取戲劇資訊 */
export const getDramas = async () => {
  return dramaInfoRequest.get('')
}

/** 讀取單筆戲劇資訊 */
export const getOneDramas = async (id: number) => {
  return dramaInfoRequest.get(`/${id}`)
}

/** 不收藏戲劇 */
export const patchUnCollect = async (id: number) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: false,
  })
  return dramaInfoRequest.get('')
}

/** 收藏戲劇 */
export const patchCollect = async (id: number, value: boolean) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: value,
  })
  return dramaInfoRequest.get('')
}

/** 評分 */
export const patchScored = async (id: number, value: number) => {
  await dramaInfoRequest.patch(`/${id}`, {
    score: value,
  })
  return dramaInfoRequest.get('')
}
