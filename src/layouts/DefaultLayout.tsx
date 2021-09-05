import { useState, createContext, useEffect, useCallback } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { app, database, auth, storage } from 'firebase/init'
import { StorageInterface } from 'types/storage.interface'
import { BaseUserInterface, UserInterface } from 'types/user.interface'
import Header from 'components/Header/Header'

type DefaultLayoutType = {
  children: React.ReactNode
}

// Default Context data
const defaultValue: StorageInterface = {
  firebase: { app, database, auth, storage },
  auth: { isAuthChecked: false, isLogged: false, userData: null }
}

// Context as one scource of truth
export const Context: React.Context<StorageInterface> = createContext(defaultValue)

const DefaultLayout = ({ children }: DefaultLayoutType): JSX.Element => {
  const [isAuthChecked, setAuthChecked] = useState<boolean>(false)
  const [user, setUser] = useState<UserInterface | null>(null)

  // Get user from firebase; create user if not exist; return user object
  const handleGetUser = useCallback(async (authUser: User): Promise<BaseUserInterface> => {
    const { uid, email, displayName, photoURL } = authUser
    const userDB = await getDoc(doc(database, 'users', uid))

    // Base user info object
    const userObject: BaseUserInterface = {
      uid,
      email: email || '',
      displayName: displayName || '',
      photoURL: photoURL || ''
    }

    // Create new user if no data about the user id database
    if (!userDB.exists()) await setDoc(doc(database, 'users', uid), userObject)

    return userObject
  }, [])

  // Get user role data and return it
  const handleGetUserRole = useCallback(async (userId: string): Promise<string> => {
    const defaultRole = 'user'

    try {
      // Get user role data
      const userRoleDB = await getDoc(doc(database, 'usersRoles', userId))
      // Set default role if no data about role
      const userRole = userRoleDB.exists() ? userRoleDB.data() : { role: defaultRole }

      return userRole?.role || defaultRole
    } catch {
      return defaultRole
    }
  }, [])

  // Auth manager
  useEffect(() => {
    onAuthStateChanged(auth, async (authUser: User | null): Promise<void> => {
      if (authUser) {
        // Get user data
        const { uid, ...otherUserData } = await handleGetUser(authUser)
        // Get user role data
        const role = await handleGetUserRole(uid)

        // Set user object in local state
        const userObject: UserInterface = {
          uid,
          role,
          ...otherUserData
        }
        setUser(userObject)
        setAuthChecked(true)
      } else {
        // Log out user
        setUser(null)
        setAuthChecked(true)
      }
    })
  }, [])

  return (
    <Context.Provider
      value={{
        ...defaultValue,
        auth: {
          isAuthChecked,
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
