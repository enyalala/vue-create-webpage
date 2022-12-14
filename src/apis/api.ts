import type { Drama } from '@/models/Drama'
import dramaInfoRequest from '@/apis/http'

/** 讀取戲劇資訊 */
export const getDramas = async () => {
  return dramaInfoRequest.get<Drama>('')
}

/** 讀取單筆戲劇資訊 */
export const getOneDrama = async (id: number) => {
  return dramaInfoRequest.get<Drama>(`/${id}`)
}

/** 不收藏戲劇（我的收藏頁面） */
export const patchUnCollect = async (id: number) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: false,
  })
  return dramaInfoRequest.get<Drama>('')
}

/** 收藏/不收藏戲劇 */
export const patchCollect = async (id: number, value: boolean) => {
  await dramaInfoRequest.patch(`/${id}`, {
    collect: value,
  })
  return dramaInfoRequest.get<Drama>(`/${id}`)
}

/** 評分 */
export const patchScored = async (id: number, value: number) => {
  await dramaInfoRequest.patch(`/${id}`, {
    score: value,
  })
  return dramaInfoRequest.get<Drama>(`/${id}`)
}

/** 評論 */
export const patchComment = async (id: number, commentList: Object) => {
  await dramaInfoRequest.patch(`/${id}`, {
    comments: commentList,
  })
  return dramaInfoRequest.get<Drama>(`/${id}`)
}

/** 記錄瀏覽人次 */
export const patchVisitor = async (id: number, value: number) => {
  await dramaInfoRequest.patch(`/${id}`, {
    visitor: (value += 1),
  })
  return dramaInfoRequest.get<Drama>(`/${id}`)
}
