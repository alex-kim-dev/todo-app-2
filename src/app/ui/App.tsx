import { HomePage } from '~/pages/home'

import { GlobalStore } from '../store'

export const App = () => (
  <GlobalStore>
    <HomePage />
  </GlobalStore>
)
