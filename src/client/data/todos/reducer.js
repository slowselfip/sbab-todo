import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction } from '../../util/action-util';

export const TODO_FETCH_REQUEST = 'sbab-todo/todos/FETCH_REQUEST';
export const TODO_FETCH_SUCCESS = 'sbab-todo/todos/FETCH_SUCCESS';
export const TODO_FETCH_FAILURE = 'sbab-todo/todos/FETCH_FAILURE';
export const TODO_CREATE_REQUEST = 'sbab-todo/todos/CREATE_REQUEST';
export const TODO_CREATE_SUCCESS = 'sbab-todo/todos/CREATE_SUCCESS';
export const TODO_CREATE_FAILURE = 'sbab-todo/todos/CREATE_FAILURE';
export const TODO_UPDATE_REQUEST = 'sbab-todo/todos/UPDATE_REQUEST';
export const TODO_UPDATE_SUCCESS = 'sbab-todo/todos/UPDATE_SUCCESS';
export const TODO_UPDATE_FAILURE = 'sbab-todo/todos/UPDATE_FAILURE';
export const TODO_DELETE_REQUEST = 'sbab-todo/todos/DELETE_REQUEST';
export const TODO_DELETE_SUCCESS = 'sbab-todo/todos/DELETE_SUCCESS';
export const TODO_DELETE_FAILURE = 'sbab-todo/todos/DELETE_FAILURE';
export const TODO_DELETE_ALL_REQUEST = 'sbab-todo/todos/DELETE_ALL_REQUEST';
export const TODO_DELETE_ALL_SUCCESS = 'sbab-todo/todos/DELETE_ALL_SUCCESS';
export const TODO_DELETE_ALL_FAILURE = 'sbab-todo/todos/DELETE_ALL_FAILURE';
export const TODO_ORDER_SAVE_REQUEST = 'sbab-todo/todos/ORDER_STORE_REQUEST';
export const TODO_ORDER_SAVE_SUCCESS = 'sbab-todo/todos/ORDER_STORE_SUCCESS';
export const TODO_ORDER_SAVE_FAILURE = 'sbab-todo/todos/ORDER_STORE_FAILURE';
export const TODOS_SWAP_AND_SAVE_ORDER = 'sbab-todo/todos/SWAP_AND_SAVE_ORDER';
export const TODOS_SWAP_ORDER = 'sbab-todo/todos/SWAP_ORDER';

// reducer that holds a map of id and the corresponding todo resource
function byId(state = {}, action = {}) {
  switch (action.type) {
    case TODO_FETCH_SUCCESS: {
      const { todos } = action.payload;
      return todos.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
    }
    case TODO_CREATE_SUCCESS: {
      const todo = action.payload;
      return { ...state, [todo.id]: todo };
    }
    case TODO_UPDATE_SUCCESS: {
      const todo = action.payload;
      if (todo && todo.id) {
        return { ...state, [todo.id]: todo };
      }
      return state;
    }
    case TODO_DELETE_SUCCESS: {
      const ids = action.payload;
      // If just one id, use destructureing
      if (ids.length === 1) {
        const { [ids[0]]: toDelete, ...newState } = state;
        return newState;
      }

      // If multiple, transform list to map of undefined props and us it to clone state selectively
      if (ids.length > 1) {
        return Object.assign(
          {},
          state,
          ids.reduce((acc, id) => {
            acc[id] = undefined;
            return acc;
          }, {})
        );
      }

      return state;
    }
    case TODO_DELETE_ALL_SUCCESS: {
      return {};
    }
    default:
      return state;
  }
}

// reducer that holds list of ids and keeps order
function all(state = [], action = {}) {
  switch (action.type) {
    case TODO_FETCH_SUCCESS: {
      const { order } = action.payload;
      return order;
    }
    case TODO_CREATE_SUCCESS: {
      const todo = action.payload;
      return [todo.id, ...state];
    }
    case TODO_DELETE_SUCCESS: {
      const ids = action.payload;
      return state.filter(id => ids.indexOf(id) < 0);
    }
    case TODOS_SWAP_ORDER: {
      const { sourceIndex, destinationIndex } = action.payload;
      const newState = [...state];
      const [removed] = newState.splice(sourceIndex, 1);
      newState.splice(destinationIndex, 0, removed);

      return newState;
    }
    case TODO_DELETE_ALL_SUCCESS: {
      return [];
    }
    default:
      return state;
  }
}

// Action creators
export function fetchTodos() {
  return createAction(TODO_FETCH_REQUEST);
}

export function createTodo(payload) {
  return createAction(TODO_CREATE_REQUEST, payload);
}

export function updateTodo(payload) {
  return createAction(TODO_UPDATE_REQUEST, payload);
}

export function deleteTodos(payload) {
  return createAction(TODO_DELETE_REQUEST, payload);
}

export function deleteAllTodos() {
  return createAction(TODO_DELETE_ALL_REQUEST);
}

export function swapTodos(payload) {
  return createAction(TODOS_SWAP_ORDER, payload);
}

export function swapTodosAndSaveOrder(payload) {
  return createAction(TODOS_SWAP_AND_SAVE_ORDER, payload);
}

export function getTodoResources(state) {
  return state.todos.byId;
}

export function getTodoIds(state) {
  return state.todos.all;
}

export const getTodos = createSelector(
  getTodoIds,
  getTodoResources,
  (todoIds, todosById) => todoIds.map(id => todosById[id])
);

export default combineReducers({
  byId,
  all
});
