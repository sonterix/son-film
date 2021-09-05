import { FirebaseApp } from 'firebase/app'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'

import { UserInterface } from './user.interface'

export interface StorageInterface {
  firebase: {
    app: FirebaseApp
    database: Firestore
    auth: Auth
  }
  auth: {
    isLogged: boolean
    userData: UserInterface | null
  }
}
