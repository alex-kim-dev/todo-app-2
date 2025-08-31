import { memo, type ChangeEvent } from 'react'

import { type Todo } from '~/app/store'
import CheckIcon from '~/shared/assets/icons/check.svg'
import CrossIcon from '~/shared/assets/icons/cross.svg'

import styles from './TodoList.module.css'

interface TodoListProps {
  todos: Todo[]
  onComplete?: (id: string, complete: boolean) => void
  onDelete?: (id: string) => void
}

export const TodoList = memo(function TodoList({ todos, onComplete, onDelete }: TodoListProps) {
  const handleCompletedChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    onComplete?.(id, event.currentTarget.checked)
  }

  const handleDelete = (id: string) => () => {
    onDelete?.(id)
  }

  return (
    <ul aria-label='List of todos'>
      {todos.map(({ id, task, completed }) => (
        <li key={id} className={styles.item}>
          <div className={styles.checkboxWrapper}>
            <input
              type='checkbox'
              aria-label='Toggle todo completion'
              checked={completed}
              onChange={handleCompletedChange(id)}
              className={styles.checkbox}
            />
            <div className={styles.checkboxCover}>
              <CheckIcon aria-hidden className={styles.check} />
            </div>
          </div>
          <p className={styles.task}>{task}</p>
          <button
            type='button'
            aria-label='Delete todo'
            className={styles.delete}
            onClick={handleDelete(id)}
          >
            <CrossIcon aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  )
})
