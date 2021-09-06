import { Link } from 'react-router-dom'
import { ROUTES } from 'router/router.constants'

import { FilmInterface } from 'types/films.interface'
import styles from './FilmCard.module.scss'

type FilmCardProps = {
  film: FilmInterface
}

const FilmCard = ({
  film: { filmImg, slug, name, genre, year, ratingIMDb }
}: FilmCardProps): JSX.Element => (
  <Link to={`${ROUTES.film}${slug}`} className={styles.FilmCard}>
    <div className={styles.Image}>
      <img src={filmImg} alt="film poster" />
    </div>

    <div className={styles.Rating}>
      <span>IMDb: </span>
      <span>{ratingIMDb}</span>
    </div>

    <div className={styles.Floating}>
      <h3 className={styles.Name}>{name}</h3>

      <p className={styles.Year}>{year}</p>
      <p className={styles.Genre}>{genre}</p>
    </div>
  </Link>
)

export default FilmCard
