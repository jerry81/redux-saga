import React from "react";
import { connect } from "react-redux"; // connect api
// import { action } from "../redux/store";

function UserComponent({ count, increment, decrement, hello }) {
  console.log("count", count);
  return (
    <div>
      i am the user component
      <div>
        Basic Counter
        <div>{count}</div>
        <button
          onClick={() => {
            // action("INCREMENT_ASYNC");
            increment();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            // action("DECREMENT_SYNC");
            decrement();
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default connect(
  store => ({
    count: store.counter.count
  }),
  {
    increment: _ => ({ type: "INCREMENT_ASYNC" }),
    decrement: _ => ({
      type: "DECREMENT_SYNC"
    })
  } /* mapStateToProps */
)(UserComponent);
