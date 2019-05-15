import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons';
import App from './components/App';
import configureStore from './data/store';
import rootSaga from './data/sagas';
import './styles/main.less';

library.add(faTrash, faLightbulb, farLightbulb);

// Setup redux store
const store = configureStore();

// Start sagas
store.runSagas(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
