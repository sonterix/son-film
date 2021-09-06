import { createElement } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import useStorage from 'hooks/useStorage'
import { StorageInterface } from 'types/storage.interface'

// const FilmsList = lazy(() => import('components/FilmsList/FilmsList'))

export const USER_ROUTES = []

const UserRoutes = (): JSX.Element | null => {
  // Get data from Context
  const {
    auth: { isAuthChecked, userData }
  }: StorageInterface = useStorage()

  const { role } = userData || {}

  return isAuthChecked ? (
    <Switch>
      {USER_ROUTES.map(({ id, path, component }) => (
        <Route
          key={`user-${id}`}
          path={path}
          render={props =>
            role === 'user' ? createElement(component, props) : <Redirect to="/" />
          }
          exact
        />
      ))}
    </Switch>
  ) : null
}

export default UserRoutes
