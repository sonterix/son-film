import { Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import DefaultLayout from 'layouts/DefaultLayout'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const Router = (): JSX.Element => {
  const user = false

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Suspense fallback="Loading...">
          <Switch>{user ? <PrivateRoutes /> : <PublicRoutes />}</Switch>
        </Suspense>
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default Router
