import { createAction } from '../../util/action-util';
import actionTypes from './action-types';

// Action creators
export function fetchTodos() {
  return createAction(actionTypes.TODO_FETCH_REQUEST);
}

export function createTodo(payload) {
  return createAction(actionTypes.TODO_CREATE_REQUEST, payload);
}

export function updateTodo(payload) {
  return createAction(actionTypes.TODO_UPDATE_REQUEST, payload);
}

export function deleteTodos(payload) {
  return createAction(actionTypes.TODO_DELETE_REQUEST, payload);
}

export function deleteAllTodos() {
  return createAction(actionTypes.TODO_DELETE_ALL_REQUEST);
}

export function swapTodos(payload) {
  return createAction(actionTypes.TODOS_SWAP_ORDER, payload);
}

export function swapTodosAndSaveOrder(payload) {
  return createAction(actionTypes.TODOS_SWAP_AND_SAVE_ORDER, payload);
}
