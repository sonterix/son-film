import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import DefaultLayout from 'layouts/DefaultLayout'
import AdminRoutes from 'router/AdminRoutes'
import UserRoutes from 'router/UserRoutes'
import PublicRoutes from 'router/PublicRoutes'

const Router = (): JSX.Element => (
  <BrowserRouter>
    <DefaultLayout>
      <Suspense fallback="Loading...">
        <PublicRoutes />
        <AdminRoutes />
        <UserRoutes />
      </Suspense>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
