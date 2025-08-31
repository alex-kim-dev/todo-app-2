import { useDeferredValue, useEffect, useMemo } from 'react'

import {
  addTodo,
  clearCompletedTodos,
  ColorTheme,
  deleteTodo,
  setTodoCompletion,
  setTodoFilter,
  TodoFilter,
  useDispatch,
  useStore,
} from '~/app/store'

import { Header } from './Header'
import styles from './HomePage.module.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'
import { Toolbar } from './Toolbar'

export const HomePage = () => {
  const { theme, todos, filter } = useStore()
  const dispatch = useDispatch()

  const filteredTodos = useMemo(
    () =>
      todos.filter(({ completed }) => {
        if (filter === TodoFilter.Active) return !completed
        if (filter === TodoFilter.Completed) return completed
        return true
      }),
    [todos, filter],
  )

  const deferredTodos = useDeferredValue(filteredTodos)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === ColorTheme.Dark ? 'dark' : 'light')
    return () => document.body.removeAttribute('data-theme')
  }, [theme])

  const handleTodoAdd = (task: string) => {
    dispatch(addTodo(task))
  }

  const handleTodoComplete = (id: string, complete: boolean) => {
    dispatch(setTodoCompletion(id, complete))
  }

  const handleTodoDelete = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const handleClearCompleted = () => {
    dispatch(clearCompletedTodos())
  }

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch(setTodoFilter(filter))
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <NewTodoForm onTodoAdd={handleTodoAdd} />
          <div className={styles.listWithFilters}>
            <TodoList
              todos={deferredTodos}
              onComplete={handleTodoComplete}
              onDelete={handleTodoDelete}
            />
            <Toolbar
              todoCount={deferredTodos.length}
              filter={filter}
              onClearCompleted={handleClearCompleted}
              onFilterChange={handleFilterChange}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
