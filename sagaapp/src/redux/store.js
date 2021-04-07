
import { createStore, combineReducers } from "redux";

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

export default createStore(combineReducers({ counter }))