import CheckIcon from '~/shared/assets/icons/check.svg'
import CrossIcon from '~/shared/assets/icons/cross.svg'

import styles from './TodoList.module.css'

export const TodoList = () => {
  return (
    <div className={styles.container}>
      <ul aria-label='List of todos'>
        <li className={styles.item}>
          <div className={styles.checkboxWrapper}>
            <input
              type='checkbox'
              className={styles.checkbox}
              aria-label='Toggle todo completion'
            />
            <div className={styles.checkboxCover}>
              <CheckIcon aria-hidden />
            </div>
          </div>
          <p className={styles.task}>Complete online JavaScript course</p>
          <button type='button' aria-label='Delete todo' className={styles.delete}>
            <CrossIcon aria-hidden />
          </button>
        </li>
      </ul>
      <div role='toolbar' className={styles.toolbar}>
        <span role='status'>5 items left</span>
        <div role='radiogroup' aria-label='Filter todos' className={styles.radioGroup}>
          {['All', 'Active', 'Completed'].map((label, i) => (
            <label key={i} className={styles.radioLabel}>
              <input type='radio' className={styles.radio} />
              {label}
            </label>
          ))}
        </div>
        <button type='button' className={styles.clear}>
          Clear Completed
        </button>
      </div>
    </div>
  )
}
