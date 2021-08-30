import { lazy } from 'react'
import { Route } from 'react-router-dom'

const FilmsList = lazy(() => import('components/FilmsList/FilmsList'))

export const PUBLIC_ROUTES = [{ id: 0, path: '/', label: 'Films', component: FilmsList }]

const PublicRoutes = (): JSX.Element => (
  <>
    {PUBLIC_ROUTES.map(({ id, path, component }) => (
      <Route key={id} path={path} component={component} exact />
    ))}
  </>
)

export default PublicRoutes
