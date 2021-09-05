import { Route } from 'react-router-dom'

import { PUBLIC_ROUTES } from 'router/router.constants'

const PublicRoutes = (): JSX.Element => (
  <>
    {PUBLIC_ROUTES.map(({ id, path, component }) => (
      <Route key={`public-${id}`} path={path} component={component} exact />
    ))}
  </>
)

export default PublicRoutes
