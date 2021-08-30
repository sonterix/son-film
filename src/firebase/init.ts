import { FirebaseApp, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { Auth, getAuth } from 'firebase/auth'

import FIREBASE_CONFIG from 'firebase/constants'

// Get firebase data
const app: FirebaseApp = initializeApp(FIREBASE_CONFIG)
const database: Firestore = getFirestore()
const auth: Auth = getAuth()

export { app, database, auth }
