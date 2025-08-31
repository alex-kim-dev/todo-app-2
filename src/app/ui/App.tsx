import { HomePage } from '~/pages/home'

import { GlobalStore } from '../store'

export const App = () => {
  return (
    <GlobalStore>
      <HomePage />
    </GlobalStore>
  )
}
