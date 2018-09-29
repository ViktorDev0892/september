import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { fromJS } from 'immutable';
import applicationSagas from './sagas';
import createReducer from './reducers';
import history from './history';
// import { innerRouterMiddleware } from './innerRouter/middleware';

const middlewareHistory = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunkMiddleware,
  sagaMiddleware,
  middlewareHistory,
  // innerRouterMiddleware
];

if (process.env.NODE_ENV !== 'production' && process.env.BROWSER) {
  const createLogger = require('redux-logger').createLogger; // eslint-disable-line global-require
  const logger = createLogger({
    level: 'log',
    collapsed: true,
    timestamp: false,
    stateTransformer: state => state && state.toJS(),
    colors: {
      title: ({ type }) => {
        if (/_FAIL$/.test(type)) return '#CC0000';
        if (/^API_/.test(type)) return '#FF8000';
        if (/^ROUTER_/.test(type)) return '#3F51B5';
        return '#007586';
      },
      prevState: () => '#9E9E9E',
      action: () => '#03A9F4',
      nextState: () => '#4CAF50',
      error: () => '#F20404'
    }
  });

  middlewares.push(logger);
}

const finalCreateStore = compose(
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
)(createStore);

const INIT_STATE = process.env.BROWSER ? window.__INIT_STATE__ : {};
const store = finalCreateStore(createReducer({}), fromJS(INIT_STATE));

// Extensions
store.runSaga = sagaMiddleware.run;
store.injectedReducers = {}; // Async reducer registry
store.injectedSagas = {}; // Saga registry
store.runSaga(applicationSagas);

export default store;
