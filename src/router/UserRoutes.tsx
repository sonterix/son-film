// import { lazy } from 'react'
import { Route } from 'react-router-dom'

// const FilmsList = lazy(() => import('components/FilmsList/FilmsList'))

export const USER_ROUTES = []

const UserRoutes = (): JSX.Element => (
  <>
    {USER_ROUTES.map(({ id, path, component }) => (
      <Route key={id} path={path} component={component} exact />
    ))}
  </>
)

export default UserRoutes
