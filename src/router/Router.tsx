import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import DefaultLayout from 'layouts/DefaultLayout'
import AdminRoutes from 'router/AdminRoutes'
import UserRoutes from 'router/UserRoutes'
import PublicRoutes from 'router/PublicRoutes'
import Loader from 'components/Loader/Loader'

const Router = (): JSX.Element => (
  <BrowserRouter>
    <DefaultLayout>
      <Suspense fallback={<Loader height="100vh" />}>
        <PublicRoutes />
        <AdminRoutes />
        <UserRoutes />
      </Suspense>
    </DefaultLayout>
  </BrowserRouter>
)

export default Router
