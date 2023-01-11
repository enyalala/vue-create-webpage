import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyDQEH5xf5mWjOzG6xTW-xCNJ-kGwO9mczY',
  authDomain: 'vue-webpage-af35c.firebaseapp.com',
  projectId: 'vue-webpage-af35c',
  storageBucket: 'vue-webpage-af35c.appspot.com',
  messagingSenderId: '532526742196',
  appId: '1:532526742196:web:a026e07532e55a776ff5e1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }
