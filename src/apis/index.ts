import axios from 'axios'

const dramaInfoRequest = axios.create({
  baseURL: 'http://localhost:3000/dramaInfo',
})

/** 讀取戲劇資訊 */
export const getDramas = async () => {
  return dramaInfoRequest.get('')
}

/** 戲劇不收藏 */
export const unCollectDrama = async (id: number, arr: object) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: false,
  })

  const res = await dramaInfoRequest.get('')
  Object.assign(arr, res.data)
}
