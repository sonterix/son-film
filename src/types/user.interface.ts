export interface BaseUserInterface {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export interface UserInterface extends BaseUserInterface {
  role: string
}
