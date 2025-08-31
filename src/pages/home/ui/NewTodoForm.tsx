import type { FormEventHandler } from 'react'

import styles from './NewTodoForm.module.css'

interface NewTodoFormProps {
  onTodoAdd?: (task: string) => void
}

export const NewTodoForm = ({ onTodoAdd }: NewTodoFormProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const task = new FormData(form).get('new-todo') as string

    if (task) {
      onTodoAdd?.(task.trim())
      form.reset()
    }
  }

  return (
    <form className={styles.form} aria-label='Add a todo' onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span className='hidden'>New todo</span>
        <span className={styles.icon} />
        <input
          className={styles.textField}
          type='text'
          name='new-todo'
          placeholder='Create a new todo…'
        />
      </label>
    </form>
  )
}
