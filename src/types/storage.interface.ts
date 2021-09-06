import { FirebaseApp } from 'firebase/app'
import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { FirebaseStorage } from 'firebase/storage'

import { UserInterface } from './user.interface'
import { FilmInterface } from './films.interface'

export interface StorageInterface {
  firebase: {
    app: FirebaseApp
    database: Firestore
    auth: Auth
    storage: FirebaseStorage
  }
  auth: {
    isAuthChecked: boolean
    isLogged: boolean
    userData: UserInterface | null
  }
  films: Array<FilmInterface>
}
