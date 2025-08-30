import './reset.css'
import './palette.css'
import './breakpoints.css'
import './utils.css'

import '@fontsource-variable/josefin-sans'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
