import { FirebaseApp } from 'firebase/app'
import { Auth, User } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'

export interface StorageInterface {
  firebase: {
    app: FirebaseApp
    database: Firestore
    auth: Auth
  }
  auth: {
    isLogged: boolean
    userData: User | null
  }
}
