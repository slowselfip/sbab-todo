import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as todos } from './todos';
import error from './error-reducer';

export default function configureStore(initialState) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      combineReducers({ todos, error }),
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    ),
    runSagas: sagaMiddleware.run
  };
}
