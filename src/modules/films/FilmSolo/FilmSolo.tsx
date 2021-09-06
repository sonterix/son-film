import { useMemo } from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { FilmInterface } from 'types/films.interface'
import { ROUTES } from 'router/router.constants'
import useStorage from 'hooks/useStorage'
import styles from './FilmSolo.module.scss'

type RouteParams = {
  slug: string
}

const FilmSolo = ({
  match: {
    params: { slug }
  }
}: RouteComponentProps<RouteParams>): JSX.Element => {
  // Get films list from context
  const { films } = useStorage()

  const film: FilmInterface | null = useMemo(
    () => films.find(({ slug: filmSlug }) => filmSlug === slug) || null,
    []
  )

  return film ? (
    <section className={`container ${styles.FilmSolo}`}>
      <h1 className={styles.Name}>{film.name}</h1>

      <div className={styles.MainInfo}>
        <div className={styles.LeftSide}>
          <img src={film.filmImg} alt="film poster" />
        </div>

        <div className={styles.RightSide}>
          <ul>
            <li>
              <span className={styles.Title}>Рейтинг IMDb</span>
              <span className={`${styles.Value} ${styles.Primary}`}>
                <span>{film.ratingIMDb}</span>
              </span>
            </li>
            <li>
              <span className={styles.Title}>Оригинал</span>
              <span className={styles.Value}>
                <span>{film.originalName}</span>
              </span>
            </li>
            <li>
              <span className={styles.Title}>Год</span>
              <span className={styles.Value}>
                <span>{film.year}</span>
              </span>
            </li>
            <li>
              <span className={styles.Title}>Страна</span>
              <span className={styles.Value}>
                {film.country.split(',').map(coun => (
                  <span key={coun}>{coun.trim()}</span>
                ))}
              </span>
            </li>
            <li>
              <span className={styles.Title}>Жанр(ы)</span>
              <span className={styles.Value}>
                {film.genre.split(',').map(gen => (
                  <span key={gen}>{gen.trim()}</span>
                ))}
              </span>
            </li>
          </ul>

          <ul>
            <li>
              <span className={styles.Title}>Режиссер(ы)</span>
              <span className={styles.Value}>
                {film.director.split(',').map(dir => (
                  <span key={dir}>{dir.trim()}</span>
                ))}
              </span>
            </li>
            <li>
              <span className={styles.Title}>Актеры</span>
              <span className={styles.Value}>
                {film.actors.split(',').map(actor => (
                  <span key={actor}>{actor.trim()}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.FilmFrame}>
        <div className={styles.IframeContainer}>
          <iframe src={film.iframeUrl} title={film.name} frameBorder="0" allowFullScreen />
        </div>
      </div>

      <div className={styles.Description}>
        <h3>Описание</h3>
        <p dangerouslySetInnerHTML={{ __html: film.description }} />
      </div>
    </section>
  ) : (
    <Redirect to={ROUTES.notFoud} />
  )
}

export default FilmSolo
