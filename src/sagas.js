import { all } from 'redux-saga/effects';
import applicationSaga from './application/sagas';

export default function* () {
  yield all([
    applicationSaga(),
  ]);
}
