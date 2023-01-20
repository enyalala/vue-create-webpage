import {
  collection,
  CollectionReference,
  doc,
  type Firestore,
} from 'firebase/firestore'

export class FirestoreApiBase<T> {
  constructor(private db: Firestore, private path: string) {}

  /** 取得列表資料 */
  getList(): CollectionReference<T> {
    return collection(this.db, this.path) as CollectionReference<T>
  }

  /** 取得單筆資料 */
  getSingleData(id: string): any {
    return doc(this.db, this.path, id)
  }
}
