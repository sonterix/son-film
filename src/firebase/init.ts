import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

import FIREBASE_CONFIG from 'firebase/constants'

// Get firebase data
const app = initializeApp(FIREBASE_CONFIG)
const database = getFirestore()
const auth = getAuth()
const storage = getStorage()

export { app, database, auth, storage }
