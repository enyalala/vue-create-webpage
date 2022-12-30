import { doc, setDoc, type Firestore } from 'firebase/firestore'

interface SetDocOption {
  data: any
  path: string
  pathSegments?: string[]
}

export class FirestoreRequest {
  constructor(private db: Firestore) {}

  setDoc(option: SetDocOption) {
    const { data, path, pathSegments = [] } = option
    return setDoc(doc(this.db, path, ...pathSegments), data)
  }
}
