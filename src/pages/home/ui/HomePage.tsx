import { Header } from './Header'
import styles from './HomePage.module.css'
import { NewTodoForm } from './NewTodoForm'

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <NewTodoForm />
        </main>
      </div>
    </div>
  )
}
