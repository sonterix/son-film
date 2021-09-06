import { lazy } from 'react'

// Import component routes
const FilmsList = lazy(() => import('modules/films/FilmsList/FilmsList'))
const AddOrEditFilm = lazy(() => import('modules/adminPanel/AddOrEditFilm/AddOrEditFilm'))

const ROUTES = {
  films: '/films',
  film: '/film/',
  addFilm: '/add-film',
  editFilm: '/edit-film'
}

const PUBLIC_ROUTES = [{ id: 0, path: ROUTES.films, label: 'Films', component: FilmsList }]

const ADMIN_ROUTES = [
  { id: 0, path: `/admin-panel${ROUTES.addFilm}`, label: 'Add Film', component: AddOrEditFilm }
]

export { ROUTES, PUBLIC_ROUTES, ADMIN_ROUTES }
