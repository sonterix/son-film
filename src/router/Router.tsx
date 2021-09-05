import { Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import DefaultLayout from 'layouts/DefaultLayout'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'
import PublicRoutes from './PublicRoutes'

const Router = (): JSX.Element => (
  <BrowserRouter>
    <DefaultLayout>
      <Suspense fallback="Loading...">
        <Switch>
          <AdminRoutes />
          <UserRoutes />
          <PublicRoutes />
        </Switch>
      </Suspense>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
