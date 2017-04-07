import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import rootReducer from '../reducers';

const createStoreWithMiddlware = applyMiddleware(ReduxPromise)(createStore);

export default function configureStore(initialState) {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  if (process.env.NODE_ENV === 'production') {
    return createStoreWithMiddlware(
      rootReducer,
      initialState,
    );
  }
  return createStoreWithMiddlware(
    rootReducer,
    initialState,
    devTools
  );
}
