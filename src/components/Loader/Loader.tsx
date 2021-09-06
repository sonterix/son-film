import { LazyLoadImage } from 'react-lazy-load-image-component'

import icon from 'assets/favicon.png'
import styles from './Loader.module.scss'

type LoaderProps = {
  height: number | string
}

const Loader = ({ height }: LoaderProps): JSX.Element => (
  <div className={styles.Loader} style={{ height: `calc(${height} - 65px)` }}>
    <LazyLoadImage src={icon} alt="logo" effect="blur" />
  </div>
)

export default Loader
