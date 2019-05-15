/* eslint import/prefer-default-export: 0 */
import { call, put } from 'redux-saga/effects';
import { createAction } from './action-util';

function* apiRequest(endpoint, success, failure, payload) {
  try {
    const response = yield call(endpoint, payload);

    if (success && response.status === 200) {
      yield put(createAction(success, response.data));
    } else if (failure) {
      yield put(createAction(failure, response.error));
    }
  } catch (error) {
    if (failure) {
      yield put(createAction(failure, error));
    }
  }
}

export { apiRequest };
