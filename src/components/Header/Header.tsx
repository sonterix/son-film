import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { PersonIcon, SignInIcon } from '@primer/octicons-react'

import { StorageInterface } from 'types/storage.interface'
import useStorage from 'hooks/useStorage'
import { PUBLIC_ROUTES } from 'router/router.constants'
import logo from 'assets/orange-logo.png'
import styles from './Header.module.scss'

const Header = (): JSX.Element => {
  const { push } = useHistory()

  // Get data from Context
  const {
    auth: { isLogged, userData },
    firebase: { auth }
  }: StorageInterface = useStorage()

  const { role } = userData || {}

  // Auth user with google popup
  const handleAuth = async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  // Log out user
  const handleSignOut = (): Promise<void> => signOut(auth)

  return (
    <header className={styles.Header}>
      <div className={styles.Logo}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <nav className={styles.Navigation}>
        <ul>
          {PUBLIC_ROUTES.map(({ id, path, label }) => (
            <li key={id}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.Auth}>
        {role === 'admin' && (
          <button
            type="button"
            className="dark-blue-btn"
            onClick={() => push('/admin-panel/add-film')}
          >
            <PersonIcon size={18} />
            <span>Admin Panel</span>
          </button>
        )}

        <button
          type="button"
          className="orange-btn"
          onClick={isLogged ? handleSignOut : handleAuth}
        >
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
