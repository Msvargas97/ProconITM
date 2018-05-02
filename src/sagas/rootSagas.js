import { call, all } from 'redux-saga/effects';
import { effects } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { watchFetchLogin, watchInitDatabase, watchFetchRegister, watchFetchUpdatePhoto,watchFetchUpload } from './accountSaga';

export default function* rootSaga() {
    yield all([
        fork(watchInitDatabase),
        fork(watchFetchRegister),
        fork(watchFetchLogin),
        fork(watchFetchUpload)
       // fork(watchFetchUpdatePhoto)
    ])
}