import { lazy } from 'react'

// Import component routes
const FilmsList = lazy(() => import('modules/films/FilmsList/FilmsList'))
const FilmSolo = lazy(() => import('modules/films/FilmSolo/FilmSolo'))
const AddOrEditFilm = lazy(() => import('modules/adminPanel/AddOrEditFilm/AddOrEditFilm'))

const ROUTES = {
  films: '/films',
  film: '/film/',
  addFilm: '/add-film',
  editFilm: '/edit-film',
  notFoud: '/not-foud'
}

const PUBLIC_ROUTES = [
  { id: 0, path: ROUTES.films, label: 'Все', component: FilmsList },
  { id: 1, path: `${ROUTES.film}:slug`, component: FilmSolo }
]

const ADMIN_ROUTES = [
  { id: 0, path: `/admin-panel${ROUTES.addFilm}`, label: 'Add Film', component: AddOrEditFilm }
]

export { ROUTES, PUBLIC_ROUTES, ADMIN_ROUTES }
