import styles from './Toolbar.module.css'

export const Toolbar = () => {
  return (
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
  )
}
