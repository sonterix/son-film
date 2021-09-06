import { Route, Switch } from 'react-router-dom'

import { PUBLIC_ROUTES } from 'router/router.constants'

const PublicRoutes = (): JSX.Element => (
  <Switch>
    {PUBLIC_ROUTES.map(({ id, path, component }) => (
      <Route key={`public-${id}`} path={path} component={component} exact />
    ))}
  </Switch>
)

export default PublicRoutes
