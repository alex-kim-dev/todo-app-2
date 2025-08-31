import { TodoFilter } from '~/app/store'

import styles from './Toolbar.module.css'

interface ToolbarProps {
  todoCount: number
  filter: TodoFilter
  onClearCompleted?: () => void
  onFilterChange?: (filter: TodoFilter) => void
}

const FILTER_LABELS: [TodoFilter, string][] = [
  [TodoFilter.All, 'All'],
  [TodoFilter.Active, 'Active'],
  [TodoFilter.Completed, 'Completed'],
]

export const Toolbar = ({
  todoCount,
  filter: currentFilter,
  onFilterChange,
  onClearCompleted,
}: ToolbarProps) => {
  const countText = `${todoCount} item${todoCount === 1 ? '' : 's'} left`

  const handleFilterChange = (filter: TodoFilter) => () => {
    onFilterChange?.(filter)
  }

  const handleClearClick = () => {
    onClearCompleted?.()
  }

  return (
    <div role='toolbar' className={styles.toolbar}>
      <span role='status' data-testid='todo-counter'>
        {countText}
      </span>
      <div role='radiogroup' aria-label='Filter todos' className={styles.radioGroup}>
        {FILTER_LABELS.map(([filter, label]) => (
          <label key={filter} className={styles.radioLabel}>
            <input
              type='radio'
              className={styles.radio}
              checked={filter === currentFilter}
              onChange={handleFilterChange(filter)}
            />
            {label}
          </label>
        ))}
      </div>
      <button type='button' className={styles.clear} onClick={handleClearClick}>
        Clear Completed
      </button>
    </div>
  )
}
