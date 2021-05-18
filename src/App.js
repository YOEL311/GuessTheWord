import React from 'react';

import reducer from './store/reducer';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import Router from './Router';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk),
  // applyMiddleware(ReduxThunk, logger),
);

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
