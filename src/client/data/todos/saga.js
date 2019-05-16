import { all, takeEvery, takeLatest, call, put, delay, select } from 'redux-saga/effects';
import { swapTodos } from './action-creators';
import { getTodoIds } from './reducer';
import actionTypes from './action-types';
import { apiRequest } from '../../util/saga-util';
import api from './api';

const {
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_CREATE_FAILURE,
  TODO_FETCH_REQUEST,
  TODO_FETCH_SUCCESS,
  TODO_FETCH_FAILURE,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAILURE,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAILURE,
  TODOS_SWAP_AND_SAVE_ORDER,
  TODO_ORDER_SAVE_SUCCESS,
  TODO_ORDER_SAVE_FAILURE,
  TODO_DELETE_ALL_REQUEST,
  TODO_DELETE_ALL_SUCCESS,
  TODO_DELETE_ALL_FAILURE
} = actionTypes;

function* fetchTodos() {
  yield call(apiRequest, api.fetchTodos, TODO_FETCH_SUCCESS, TODO_FETCH_FAILURE);
}

function* createTodo({ payload }) {
  yield call(apiRequest, api.createTodo, TODO_CREATE_SUCCESS, TODO_CREATE_FAILURE, payload);
}

function* updateTodo({ payload }) {
  yield call(apiRequest, api.updateTodo, TODO_UPDATE_SUCCESS, TODO_UPDATE_FAILURE, payload);
}

function* deleteTodos({ payload }) {
  yield call(apiRequest, api.deleteTodos, TODO_DELETE_SUCCESS, TODO_DELETE_FAILURE, payload);
}

function* deleteAllTodos() {
  yield call(apiRequest, api.deleteAllTodos, TODO_DELETE_ALL_SUCCESS, TODO_DELETE_ALL_FAILURE);
}

function* swapAndSaveOrder({ payload }) {
  // Immediately swap order in state
  yield put(swapTodos(payload));

  // This debounces the db update so that it only syncs 1 second after user has finished swapping order
  // Any incoming action during this delay will cancel the previous pending db update and start a new delay timer
  yield delay(1000);

  // Get the current todo order from state
  const order = yield select(getTodoIds);

  // Store it to db
  yield call(apiRequest, api.updateOrder, TODO_ORDER_SAVE_SUCCESS, TODO_ORDER_SAVE_FAILURE, order);
}

function* watchFetchTodos() {
  yield takeEvery(TODO_FETCH_REQUEST, fetchTodos);
}

function* watchCreateTodo() {
  yield takeEvery(TODO_CREATE_REQUEST, createTodo);
}

function* watchUpdateTodo() {
  yield takeEvery(TODO_UPDATE_REQUEST, updateTodo);
}

function* watchDeleteTodos() {
  yield takeEvery(TODO_DELETE_REQUEST, deleteTodos);
}

function* watchDeleteAllTodos() {
  yield takeEvery(TODO_DELETE_ALL_REQUEST, deleteAllTodos);
}

function* watchSwapAndSaveOrder() {
  yield takeLatest(TODOS_SWAP_AND_SAVE_ORDER, swapAndSaveOrder);
}

export default function* todosSaga() {
  yield all([
    watchFetchTodos(),
    watchCreateTodo(),
    watchUpdateTodo(),
    watchDeleteTodos(),
    watchDeleteAllTodos(),
    watchSwapAndSaveOrder()
  ]);
}
