# redux-saga

side effect manager

saga refers to an operation that takes a long time 

saga is like a nested transaction
2 levels: top level and transactions

for consistency in saving to db

saga can be yielded as promise

geared towards testing 

descriptions of effects vs calling effects immediately'

### api fetches

usually called with call()

for modifying the store or dispatching actions call put

### methods

call - used for calling apis
call(apiFn, payload)

put - sets data
put({ type: action_name, arbitraryKey: arbitraryVal... }) # type - identifies the action, arbitraryKey - parameters to set 

takeEvery - delegates to another "saga"
takeEvery(action_name, method) # action_name - identifies the action, method - method to call 
will run every request concurrently if multiple

takeLatest only runs one at a time
cancels previous requests and only runs latest

### channels - 

### connecting to redux

createStore has a parameter to allow for middleware

{ createStore, applyMiddleware } from 'redux'
createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

### troubleshooting

redux: TypeError: Cannot read property 'getState' of undefined
cause: put store={store} in <App>
solution: put store={store} in <Provider>

### generator vs async await

generator's .next() always returns { value, done }

async can be decomposed into generator 



### defs

side effect - a fn that modifies anything outside of body 
e.g. modify global variable

