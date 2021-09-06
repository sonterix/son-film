import { createElement } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { StorageInterface } from 'types/storage.interface'
import useStorage from 'hooks/useStorage'
import { ADMIN_ROUTES } from 'router/router.constants'

const AdminRoutes = (): JSX.Element | null => {
  // Get data from Context
  const {
    auth: { isAuthChecked, userData }
  }: StorageInterface = useStorage()

  const { role } = userData || {}

  return isAuthChecked ? (
    <Switch>
      {ADMIN_ROUTES.map(({ id, path, component }) => (
        <Route
          key={`admin-${id}`}
          path={path}
          render={props =>
            role === 'admin' ? createElement(component, props) : <Redirect to="/" />
          }
          exact
        />
      ))}
    </Switch>
  ) : null
}

export default AdminRoutes
