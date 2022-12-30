import { FirestoreRequest } from '@/firebase/firestoreRequest'
import { db } from './config'

export const fireStoreInstance = new FirestoreRequest(db)
