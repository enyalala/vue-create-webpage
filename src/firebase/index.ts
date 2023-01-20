import { FirestoreApiBase } from '@/firebase/firestoreApiBase'
import { FirestoreRequest } from '@/firebase/firestoreRequest'
import type { Drama } from '@/models/Drama'
import { db } from './config'

export const fireStoreInstance = new FirestoreRequest(db)

export const dramaInfoApi = new FirestoreApiBase<Drama>(db, 'dramaInfo')
export const userApi = new FirestoreApiBase(db, 'userInfo')
