import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { render, screen } from '~/test-utils'

import { App } from './App'

describe('App', () => {
  it('should increment the counter', async () => {
    render(<App />)
    const user = userEvent.setup()

    const countButton = screen.getByRole('button', { name: /count/i })
    expect(countButton).toHaveTextContent(/count is 0/i)

    await user.click(countButton)
    expect(countButton).toHaveTextContent(/count is 1/i)
  })
})
