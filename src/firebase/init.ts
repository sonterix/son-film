import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

import FIREBASE_CONFIG from 'firebase/constants'

// Get firebase data
const app = initializeApp(FIREBASE_CONFIG)
const database = getFirestore()
const auth = getAuth()

export { app, database, auth }
