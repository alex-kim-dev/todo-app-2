import { useDispatch, useStore, setColorTheme, ColorTheme } from '~/app/store'
import MoonIcon from '~/shared/assets/icons/moon.svg'
import SunIcon from '~/shared/assets/icons/sun.svg'

import styles from './Header.module.css'

export const Header = () => {
  const { theme } = useStore()
  const dispatch = useDispatch()
  const Icon = theme === ColorTheme.Dark ? SunIcon : MoonIcon

  const handleThemeSwitchClick = () => {
    dispatch(setColorTheme(theme === ColorTheme.Dark ? ColorTheme.Light : ColorTheme.Dark))
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Todo</h1>
      <button
        type='button'
        role='switch'
        aria-label='Toggle dark theme'
        aria-checked={false}
        onClick={handleThemeSwitchClick}
        className={styles.themeSwitch}
      >
        <Icon aria-hidden />
      </button>
    </header>
  )
}
