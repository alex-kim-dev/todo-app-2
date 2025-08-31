export type ID = string

export interface Todo {
  id: ID
  task: string
  completed: boolean
}

export enum TodoFilter {
  All = 'ALL',
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
}

export enum ActionType {
  AddTodo = 'ADD_TODO',
  SetTodoCompletion = 'SET_TODO_COMPLETION',
  DeleteTodo = 'DELETE_TODO',
  ClearCompletedTodos = 'CLEAR_COMPLETED_TODOS',
  SetTodoFilter = 'SET_TODO_FILTER',
}

interface ActionAddTodo {
  type: ActionType.AddTodo
  payload: { task: string }
}

interface ActionSetTodoCompletion {
  type: ActionType.SetTodoCompletion
  payload: { id: ID; complete: boolean }
}

interface ActionDeleteTodo {
  type: ActionType.DeleteTodo
  payload: { id: ID }
}

interface ActionClearCompletedTodos {
  type: ActionType.ClearCompletedTodos
}

interface ActionSetTodoFilter {
  type: ActionType.SetTodoFilter
  payload: { filter: TodoFilter }
}

export type Action =
  | ActionAddTodo
  | ActionSetTodoCompletion
  | ActionDeleteTodo
  | ActionClearCompletedTodos
  | ActionSetTodoFilter

export const addTodo = (task: string): ActionAddTodo => ({
  type: ActionType.AddTodo,
  payload: { task },
})

export const setTodoCompletion = (id: ID, complete: boolean): ActionSetTodoCompletion => ({
  type: ActionType.SetTodoCompletion,
  payload: { id, complete },
})

export const deleteTodo = (id: ID): ActionDeleteTodo => ({
  type: ActionType.DeleteTodo,
  payload: { id },
})

export const clearCompletedTodos = (): ActionClearCompletedTodos => ({
  type: ActionType.ClearCompletedTodos,
})

export const setTodoFilter = (filter: TodoFilter): ActionSetTodoFilter => ({
  type: ActionType.SetTodoFilter,
  payload: { filter },
})
