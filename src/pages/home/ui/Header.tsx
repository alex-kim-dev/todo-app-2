import { useDispatch, useStore, setColorTheme, ColorTheme } from '~/app/store'
import MoonIcon from '~/shared/assets/icons/moon.svg'
import SunIcon from '~/shared/assets/icons/sun.svg'

import styles from './Header.module.css'

export const Header = () => {
  const { theme } = useStore()
  const dispatch = useDispatch()

  const isDarkTheme = theme === ColorTheme.Dark
  const Icon = isDarkTheme ? SunIcon : MoonIcon

  const handleThemeSwitchClick = () => {
    dispatch(setColorTheme(isDarkTheme ? ColorTheme.Light : ColorTheme.Dark))
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo</h1>
      <button
        type='button'
        role='switch'
        aria-label='Toggle dark theme'
        aria-checked={isDarkTheme}
        onClick={handleThemeSwitchClick}
        className={styles.themeSwitch}
      >
        <Icon aria-hidden />
      </button>
    </header>
  )
}
