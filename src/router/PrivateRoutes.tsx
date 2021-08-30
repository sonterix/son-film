import { lazy } from 'react'
import { Route } from 'react-router-dom'

const FilmsList = lazy(() => import('components/FilmsList/FilmsList'))

export const PRIVATE_ROUTES = [{ id: 0, path: '/', label: 'Films Secret', component: FilmsList }]

const PrivateRoutes = (): JSX.Element => (
  <>
    {PRIVATE_ROUTES.map(({ id, path, component }) => (
      <Route key={id} path={path} component={component} exact />
    ))}
  </>
)

export default PrivateRoutes
