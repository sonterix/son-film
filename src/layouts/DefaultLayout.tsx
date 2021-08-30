import { useState, createContext, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'

import { app, database, auth } from 'firebase/init'
import { StorageInterface } from 'types/storage.interface'
import Header from 'components/Header/Header'

type DefaultLayoutType = {
  children: React.ReactNode
}

// Default Context data
const defaultValue: StorageInterface = {
  firebase: { app, database, auth },
  auth: { isLogged: false, userData: null }
}

// Context as one scource of truth
export const Context: React.Context<StorageInterface> = createContext(defaultValue)

const DefaultLayout = ({ children }: DefaultLayoutType): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)

  // Change user state when firebase tigger the auth system
  useEffect(() => {
    onAuthStateChanged(auth, (authUser: User | null): void => setUser(authUser))
  }, [])

  return (
    <Context.Provider
      value={{
        ...defaultValue,
        auth: {
          isLogged: !!user,
          userData: user
        }
      }}
    >
      <Header />

      <main>{children}</main>
    </Context.Provider>
  )
}

export default DefaultLayout
