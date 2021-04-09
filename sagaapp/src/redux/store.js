import { createStore, combineReducers, applyMiddleware } from "redux";

// saga imports
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/saga";

const initialState = {
  /* not exported */
  count: 0
};

const counter = function(state = initialState, action) {
  // reducer
  switch (
    action.type // support multiple actions
  ) {
    case "INC": {
      // allIds push, byIds push
      return {
        ...state, // updates object
        count: ++state.count
      };
    }
    case "DEC": {
      return {
        ...state,
        count: --state.count
      };
    }
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware()

// wire up 
export const store = createStore(
  combineReducers({ counter }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export const action = type => store.dispatch({ type });
