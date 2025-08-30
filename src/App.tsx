import cn from 'clsx'
import { useState } from 'react'

import css from '~/App.module.css'
import ReactLogo from '~/assets/react.svg'

import viteLogo from '/vite.svg'

export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className={css.logo} alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <ReactLogo role='img' title='React logo' className={cn(css.logo, css.react)} />
        </a>
      </div>
      <h1>{import.meta.env.VITE_APP_TITLE || 'Vite + React'}</h1>
      <div className={css.card}>
        <button
          onClick={() => {
            setCount((count) => count + 1)
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={css.readTheDocs}>Click on the Vite and React logos to learn more</p>
    </>
  )
}
