import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCNr1_BVjMRtr7TU7fZ9FEeIWiVsoAxtYc',
  authDomain: 'vue-demo-2b277.firebaseapp.com',
  projectId: 'vue-demo-2b277',
  storageBucket: 'vue-demo-2b277.appspot.com',
  messagingSenderId: '1053050153787',
  appId: '1:1053050153787:web:7c90bdc7ea42edfbe9651e',
  measurementId: 'G-JR11200ML4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
