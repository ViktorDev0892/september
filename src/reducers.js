import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'
import application from './application/reducer';

export default function createReducer(injectedReducers) {
  return combineReducers({
    application,
    router: routerReducer,
    ...injectedReducers
  });
}
