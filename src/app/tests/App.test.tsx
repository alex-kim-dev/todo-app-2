import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'

import { render, screen, within } from '~/shared/lib/test'

import { INITIAL_STATE, TodoFilter } from '../store'
import { App } from '../ui/App'

describe('Todo app', () => {
  afterEach(() => {
    window.localStorage.clear()
  })

  it('renders correctly', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/todo/i)

    expect(screen.getByRole('switch', { name: /dark theme/i })).toBeInTheDocument()

    expect(
      within(screen.getByRole('form', { name: /add a todo/i })).getByRole('textbox', {
        name: /new todo/i,
      }),
    ).toHaveTextContent('')

    within(screen.getByRole('list', { name: /list of todos/i }))
      .getAllByRole('listitem')
      .forEach((item, i) => {
        const { task, completed } = INITIAL_STATE.todos[i]

        expect(item).toHaveTextContent(task)
        expect(within(item).getByRole('checkbox', { checked: completed })).toBeInTheDocument()
        expect(within(item).getByRole('button', { name: /delete todo/i })).toBeInTheDocument()
      })

    expect(screen.getByTestId('todo-counter')).toHaveTextContent(
      new RegExp(`${INITIAL_STATE.todos.length} items? left`, 'i'),
    )

    const filters = Object.values(TodoFilter)
    within(screen.getByRole('toolbar'))
      .getAllByRole('radio')
      .forEach((radio, i) => {
        expect(radio).toHaveAccessibleName(new RegExp(filters[i], 'i'))
        expect((radio as HTMLInputElement).checked).toBe(INITIAL_STATE.filter === filters[i])
      })

    expect(screen.getByRole('button', { name: /clear completed/i })).toBeInTheDocument()
  })

  it('switches a color theme', async () => {
    render(<App />)
    const user = userEvent.setup()
    const themeSwitch = screen.getByRole('switch', { name: /dark theme/i })

    expect(themeSwitch).not.toBeChecked()
    expect(document.body).toHaveAttribute('data-theme', 'light')

    await user.click(screen.getByRole('switch', { name: /dark theme/i }))

    expect(themeSwitch).toBeChecked()
    expect(document.body).toHaveAttribute('data-theme', 'dark')
  })

  it('adds a new todo', async () => {
    render(<App />)
    const user = userEvent.setup()

    const todosCount = INITIAL_STATE.todos.length
    const input = screen.getByRole('textbox', { name: /new todo/i })
    const list = screen.getByRole('list', { name: /list of todos/i })

    await user.type(input, 'test{enter}')
    const items = within(list).getAllByRole('listitem')
    const lastItem = items[items.length - 1]

    expect(input).toHaveValue('')
    expect(items.length).toBe(todosCount + 1)
    expect(screen.getByTestId('todo-counter')).toHaveTextContent(new RegExp(`^${todosCount + 1}`))
    expect(lastItem).toHaveTextContent('test')
    expect(within(lastItem).getByRole('checkbox')).not.toBeChecked()

    await user.type(input, '{enter}')

    expect(within(list).getAllByRole('listitem').length).toBe(todosCount + 1)
    expect(screen.getByTestId('todo-counter')).toHaveTextContent(new RegExp(`^${todosCount + 1}`))
  })

  it('deletes todos', async () => {
    render(<App />)
    const user = userEvent.setup()

    await user.click(screen.getAllByRole('button', { name: /delete todo/i })[1])

    const todosCount = INITIAL_STATE.todos.length
    const list = screen.getByRole('list', { name: /list of todos/i })
    const items = within(list).getAllByRole('listitem')

    expect(within(list).queryByText(INITIAL_STATE.todos[1].task)).not.toBeInTheDocument()
    expect(items.length).toBe(todosCount - 1)
    expect(screen.getByTestId('todo-counter')).toHaveTextContent(new RegExp(`^${todosCount - 1}`))
  })

  it('changes the completion state', async () => {
    render(<App />)
    const user = userEvent.setup()

    const checkbox = within(screen.getByRole('list', { name: /list of todos/i })).getAllByRole(
      'checkbox',
    )[0]
    const checked = INITIAL_STATE.todos[0].completed

    await user.click(checkbox)
    expect((checkbox as HTMLInputElement).checked).toBe(!checked)

    await user.click(checkbox)
    expect((checkbox as HTMLInputElement).checked).toBe(checked)
  })

  it('filters the todo list', async () => {
    render(<App />)
    const user = userEvent.setup()

    const { todos } = INITIAL_STATE
    const completedCount = todos.filter(({ completed }) => completed).length
    const activeCount = todos.length - completedCount
    const list = screen.getByRole('list', { name: /list of todos/i })

    await user.click(screen.getByRole('radio', { name: /active/i }))

    expect(within(list).getAllByRole('listitem').length).toBe(activeCount)
    within(list)
      .getAllByRole('checkbox')
      .forEach((checkmark) => {
        expect(checkmark).not.toBeChecked()
      })

    await user.click(screen.getByRole('radio', { name: /completed/i }))

    expect(within(list).getAllByRole('listitem').length).toBe(completedCount)
    within(list)
      .getAllByRole('checkbox')
      .forEach((checkmark) => {
        expect(checkmark).toBeChecked()
      })
  })

  it('deletes all completed todos', async () => {
    render(<App />)
    const user = userEvent.setup()

    const list = screen.getByRole('list', { name: /list of todos/i })
    const activeCount = INITIAL_STATE.todos.filter(({ completed }) => !completed).length

    await user.click(screen.getByRole('button', { name: /clear completed/i }))

    expect(within(list).getAllByRole('listitem').length).toBe(activeCount)
    within(list)
      .getAllByRole('checkbox')
      .forEach((checkmark) => {
        expect(checkmark).not.toBeChecked()
      })
  })
})
