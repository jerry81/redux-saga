import { put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// eslint-disable-next-line
function* helloSaga() {
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INC' }) // dispatch action
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* decrement() {
    yield put({ type: 'DEC' }) // dispatch an action
  }
  
  function* watchDecrementAsync() {
    yield takeEvery('DECREMENT_SYNC', decrement)
  }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchDecrementAsync()
  ])
}