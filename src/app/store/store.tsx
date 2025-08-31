/* eslint-disable react-refresh/only-export-components */

import { produce } from 'immer'
import { nanoid } from 'nanoid'
import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  use,
  useEffect,
  useReducer,
} from 'react'

import { type Todo, type Action, ActionType, TodoFilter } from './actions'

interface GlobalStore {
  todos: Todo[]
  filter: TodoFilter
}

const INITIAL_STATE: GlobalStore = {
  todos: [
    {
      id: nanoid(),
      task: 'Complete online JavaScript course',
      completed: true,
    },
    { id: nanoid(), task: 'Jog around the park 3x', completed: false },
    { id: nanoid(), task: '10 minutes meditation', completed: false },
    { id: nanoid(), task: 'Read for 1 hour', completed: false },
    { id: nanoid(), task: 'Pick up groceries', completed: false },
    {
      id: nanoid(),
      task: 'Complete Todo App on Frontend Mentor',
      completed: false,
    },
  ],
  filter: TodoFilter.all,
}

const reducer = produce((state: GlobalStore, action: Action): void => {
  switch (action.type) {
    case ActionType.AddTodo: {
      const todo: Todo = {
        id: nanoid(),
        task: action.payload.task,
        completed: false,
      }
      state.todos.push(todo)
      break
    }

    case ActionType.SetTodoCompletion: {
      const todo = state.todos.find(({ id }) => id === action.payload.id)
      if (todo) todo.completed = action.payload.complete
      break
    }

    case ActionType.DeleteTodo: {
      const index = state.todos.findIndex(({ id }) => id === action.payload.id)
      if (index !== -1) state.todos.splice(index, 1)
      break
    }

    case ActionType.ClearCompletedTodos: {
      const todos = state.todos.filter(({ completed }) => !completed)
      state.todos = todos
      break
    }

    case ActionType.SetTodoFilter: {
      state.filter = action.payload.filter
      break
    }
  }
})

const StoreContext = createContext<GlobalStore>(INITIAL_STATE)
const DispatchContext = createContext<Dispatch<Action>>(() => {})

export const useStore = () => use(StoreContext)
export const useDispatch = () => use(DispatchContext)

export const GlobalStore: FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, (initState) => {
    try {
      const savedState = window.localStorage.getItem('global-store')
      return savedState ? (JSON.parse(savedState) as GlobalStore) : initState
    } catch (_error) {
      return initState
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('global-store', JSON.stringify(state))
    } catch (_error) {
      console.error("Local storage is not accessible, the app state won't be saved!")
    }
  }, [state])

  return (
    <StoreContext value={state}>
      <DispatchContext value={dispatch}>{children}</DispatchContext>
    </StoreContext>
  )
}
