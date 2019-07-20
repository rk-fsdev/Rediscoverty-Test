import { all } from 'redux-saga/effects';
import cropboxSaga from './cropbox/saga';

export default function* rootSaga(getState) {
  yield all([cropboxSaga()]);
}
