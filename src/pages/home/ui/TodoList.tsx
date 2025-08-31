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
    </div>
  )
}
