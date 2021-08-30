import { NavLink } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { PersonIcon, SignInIcon } from '@primer/octicons-react'

import { StorageInterface } from 'types/storage.interface'
import useStorage from 'hooks/useStorage'
import { PRIVATE_ROUTES } from 'router/PrivateRoutes'
import { PUBLIC_ROUTES } from 'router/PublicRoutes'
import styles from './Header.module.scss'

const Header = (): JSX.Element => {
  // Get data from Context
  const {
    auth: { isLogged },
    firebase: { auth }
  }: StorageInterface = useStorage()

  // Auth user with google popup
  const handleAuth = async (): Promise<void> => {
    const provider: GoogleAuthProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  // Log out user
  const handleSignOut = (): Promise<void> => signOut(auth)

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <NavLink to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sonfilm-6f58e.appspot.com/o/images%2Flogos%2Flogo-white.png?alt=media"
            alt="logo"
          />
        </NavLink>
      </div>

      <nav className={styles.Navigation}>
        <ul>
          {(isLogged ? PRIVATE_ROUTES : PUBLIC_ROUTES).map(({ id, path, label }) => (
            <li key={id}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.Auth}>
        <button type="button" onClick={isLogged ? handleSignOut : handleAuth}>
          {isLogged ? (
            <>
              <SignInIcon size={18} />
              <span>Out</span>
            </>
          ) : (
            <>
              <PersonIcon size={18} />
              <span>Auth</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
