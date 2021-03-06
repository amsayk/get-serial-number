// @flow

import { createStore, applyMiddleware, compose } from 'redux';

import { APP_NAME, DEBUG, INIT } from 'vars';

import pick from 'lodash.pick';

import array from 'redux/middleware/array';

import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';

import thunk from 'redux-thunk';

import rootReducer from 'redux/reducers';

const history = createHashHistory();

const configureStore = (initialState?: any) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [
    array,
    thunk.withExtraArgument({
      history,
    }),
    routerMiddleware(history),
  ];

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  };

  const composeEnhancers =
    (__DEV__ || DEBUG) && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          name: APP_NAME,
          actionCreators,
        })
      : compose;

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [applyMiddleware(...middlewares)];

  const enhancer = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, enhancer);

  // Initialize
  store.dispatch({ type: INIT });

  if (__DEV__) {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(require('../reducers'));
      });
    }
  }

  return store;
};

export default {
  configureStore,
  history,
};
