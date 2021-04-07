# redux-saga

side effect manager

### methods

call - used for calling apis
call(apiFn, payload)

put - sets data
put({ type: action_name, arbitraryKey: arbitraryVal... }) # type - identifies the action, arbitraryKey - parameters to set 

takeEvery - delegates to another "saga"
takeEvery(action_name, method) # action_name - identifies the action, method - method to call 

takeLatest

### connecting to redux

createStore has a parameter to allow for middleware

{ createStore, applyMiddleware } from 'redux'
createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

### defs

side effect - a fn that modifies anything outside of body 
e.g. modify global variable