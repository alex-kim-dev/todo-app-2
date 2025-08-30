import { Header } from './Header'
import styles from './HomePage.module.css'

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
      </div>
    </div>
  )
}
