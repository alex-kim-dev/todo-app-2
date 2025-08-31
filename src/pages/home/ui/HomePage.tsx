import { Header } from './Header'
import styles from './HomePage.module.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'
import { Toolbar } from './Toolbar'

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <NewTodoForm />
          <div className={styles.listWithFilters}>
            <TodoList />
            <Toolbar />
          </div>
        </main>
      </div>
    </div>
  )
}
