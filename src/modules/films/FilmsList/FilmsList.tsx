import useStorage from 'hooks/useStorage'
import FilmsFilter from 'modules/films/FilmsFilter/FilmsFilter'
import FilmCard from 'modules/films/FilmCard/FilmCard'

import styles from './FilmsList.module.scss'

const FilmsList = (): JSX.Element => {
  // Get films from context
  const { films } = useStorage()

  return (
    <section className={`container ${styles.FilmsList}`}>
      <FilmsFilter />

      <div className={styles.List}>
        {films.map(film => (
          <FilmCard key={film.uid} film={film} />
        ))}
      </div>
    </section>
  )
}

export default FilmsList
