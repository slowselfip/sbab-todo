import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import actionTypes from './action-types';

// reducer that holds a map of id and the corresponding todo resource
function byId(state = {}, action = {}) {
  switch (action.type) {
    case actionTypes.TODO_FETCH_SUCCESS: {
      const { todos } = action.payload;
      return todos.reduce((acc, todo) => {
        acc[todo.id] = todo;
        return acc;
      }, {});
    }
    case actionTypes.TODO_CREATE_SUCCESS: {
      const todo = action.payload;
      return { ...state, [todo.id]: todo };
    }
    case actionTypes.TODO_UPDATE_SUCCESS: {
      const todo = action.payload;
      if (todo && todo.id) {
        return { ...state, [todo.id]: todo };
      }
      return state;
    }
    case actionTypes.TODO_DELETE_SUCCESS: {
      const ids = action.payload;
      // If just one id, use destructureing
      if (ids.length === 1) {
        const { [ids[0]]: toDelete, ...newState } = state;
        return newState;
      }

      // If multiple loop and delete.
      if (ids.length > 1) {
        const newState = { ...state };
        ids.forEach(id => delete newState[id]);
        return newState;
      }

      return state;
    }
    case actionTypes.TODO_DELETE_ALL_SUCCESS: {
      return {};
    }
    default:
      return state;
  }
}

// reducer that holds list of ids and keeps order
function all(state = [], action = {}) {
  switch (action.type) {
    case actionTypes.TODO_FETCH_SUCCESS: {
      const { order } = action.payload;
      return order;
    }
    case actionTypes.TODO_CREATE_SUCCESS: {
      const todo = action.payload;
      return [todo.id, ...state];
    }
    case actionTypes.TODO_DELETE_SUCCESS: {
      const ids = action.payload;
      return state.filter(id => ids.indexOf(id) < 0);
    }
    case actionTypes.TODOS_SWAP_ORDER: {
      const { sourceIndex, destinationIndex } = action.payload;
      const newState = [...state];
      const [removed] = newState.splice(sourceIndex, 1);
      newState.splice(destinationIndex, 0, removed);

      return newState;
    }
    case actionTypes.TODO_DELETE_ALL_SUCCESS: {
      return [];
    }
    default:
      return state;
  }
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
