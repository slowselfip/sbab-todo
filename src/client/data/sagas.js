import { all } from 'redux-saga/effects';
import { saga as todoSaga } from './todos';

export default function* rootSaga() {
  yield all([todoSaga()]);
}
