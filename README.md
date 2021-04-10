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
implemented as an infinite loop of takes that fork a handler (concurrent)

takeLatest only runs one at a time
cancels previous requests and only runs latest
implemented as infinite loop of takes that store the latest call and cancel it if it exists before forking

apply(context, fn, [args])

yield race({
      score: call(play, getState),
      timeout: delay(60000)
    }) -- runs multiple sagas concurrently, and short circuits once one completes

### channels 

add another delgation layer between saga and redux, or saga and saga

watch and fork - 

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}

for every request that comes it be prepared to fork a thread to handle that request

this can be simplified with channels

replace with   
const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}
difference: the latter queues up (buffers) pending requests

a second arg limits the buffer size, i.e.

import { buffers } from 'redux-saga'
import { actionChannel } from 'redux-saga/effects'

function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))

for polling and other intervals (external sources)

use  
return eventChannel(emitter => { // first arg is function that passes in an emitter
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END) // provided object that stops the channel from listening
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }

can be used with websockets

 return eventChannel(emit => {
    // function inside subscribe function 
    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event.payload)
    }
    
    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason))
    }
    
    // setup the subscription
    socket.on('ping', pingHandler)
    socket.on('error', errorHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', pingHandler)
    }

    return unsubscribe
  })

### composing sagas 

to run sagas in parallel, use all([array of sagas])
  const results = yield all([call(task1), call(task2), ...])


### connecting to redux

createStore has a parameter to allow for middleware

{ createStore, applyMiddleware } from 'redux'
createSagaMiddleware from 'redux-saga'

const saga = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)

### fork vs spawn
fork - attached fork (attached to parent)
spawn - detached fork

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

