import { applyMiddleware, createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import { Action } from './Action';
import { State } from './State';

export default (reducer: Reducer<State, Action>) => {
  const middleware = [
    reduxThunk,
  ];

  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
}
