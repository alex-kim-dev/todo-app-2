import MoonIcon from '~/shared/assets/icons/moon.svg'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo</h1>
      <button
        type='button'
        role='switch'
        aria-label='Toggle dark theme'
        aria-checked={false}
        className={styles.themeSwitch}
      >
        <MoonIcon aria-hidden />
      </button>
    </header>
  )
}
