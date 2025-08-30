/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/export */

import type { ReactElement, ReactNode } from 'react'

import { render, type RenderOptions } from '@testing-library/react'

const Providers = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
