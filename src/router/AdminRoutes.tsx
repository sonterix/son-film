// import { lazy } from 'react'
import { Route } from 'react-router-dom'

// const FilmsList = lazy(() => import('components/FilmsList/FilmsList'))

export const ADMIN_ROUTES = []

const AdminRoutes = (): JSX.Element => (
  <>
    {ADMIN_ROUTES.map(({ id, path, component }) => (
      <Route key={id} path={path} component={component} exact />
    ))}
  </>
)

export default AdminRoutes
