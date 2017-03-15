import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';

const reducer = (state = { a: 1 }) => ({ a: state.a + 1 });
const store = configureStore(reducer);
window.store = store;
ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

