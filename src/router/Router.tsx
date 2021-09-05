import { Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { StorageInterface } from 'types/storage.interface'
import DefaultLayout from 'layouts/DefaultLayout'
import useStorage from 'hooks/useStorage'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'
import PublicRoutes from './PublicRoutes'

const Router = (): JSX.Element => {
  // Get data from Context
  const {
    auth: { userData }
  }: StorageInterface = useStorage()

  const { role } = userData || {}

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Suspense fallback="Loading...">
          <Switch>
            {role === 'admin' ? <AdminRoutes /> : null}
            {role === 'user' ? <UserRoutes /> : null}
            <PublicRoutes />
          </Switch>
        </Suspense>
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default Router
