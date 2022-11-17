import axios from 'axios'

const dramaInfoRequest = axios.create({
  baseURL: 'http://localhost:3000/dramaInfo',
})

/** 讀取戲劇資訊 */
export const getDramas = async (arr: object) => {
  const response = await dramaInfoRequest.get('')
  Object.assign(arr, response.data)
}

/** 戲劇不收藏 */
export const unCollectDrama = async (id: number, arr: object) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: false,
  })

  const response = await dramaInfoRequest.get('')
  Object.assign(arr, response.data)
}
