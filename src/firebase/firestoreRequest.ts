import {
  doc,
  setDoc,
  type Firestore,
  collection,
  updateDoc,
} from 'firebase/firestore'

interface SetDocOption<T = any> {
  path: string
  pathSegments?: string[]
  data?: T
}

export class FirestoreRequest {
  constructor(private db: Firestore) {}

  setDoc(option: SetDocOption) {
    const { data, path, pathSegments = [] } = option
    return setDoc(doc(this.db, path, ...pathSegments), data)
  }

  /** 讀取戲劇資訊 */
  getDramas(option: SetDocOption) {
    const { path } = option
    return collection(this.db, path)
  }

  /** 讀取單筆戲劇資訊 */
  getSingleData(option: SetDocOption) {
    const { path, pathSegments = [] } = option
    return doc(this.db, path, ...pathSegments)
  }

  /** 不收藏戲劇（我的收藏頁面） */
  patchUnCollect(option: SetDocOption) {
    const { path, pathSegments = [] } = option
    const ref = doc(this.db, path, ...pathSegments)
    updateDoc(ref, { collect: false })
  }

  /** 評論 */
  patchComment(option: SetDocOption) {
    const { path, pathSegments = [], data } = option
    const ref = doc(this.db, path, ...pathSegments)
    updateDoc(ref, { comments: data })
  }

  /** 收藏/不收藏戲劇 */
  patchCollect(option: SetDocOption) {
    const { path, pathSegments = [], data } = option
    const ref = doc(this.db, path, ...pathSegments)
    updateDoc(ref, { collect: data })
  }

  /** 評分 */
  patchScored(option: SetDocOption) {
    const { path, pathSegments = [], data } = option
    const ref = doc(this.db, path, ...pathSegments)
    updateDoc(ref, { score: data })
  }

  /** 記錄瀏覽人次 */
  patchVisitor(option: SetDocOption<number>) {
    const { path, pathSegments = [], data } = option
    const ref = doc(this.db, path, ...pathSegments)
    updateDoc(ref, { visitor: data })
  }
}
