import React from "react";
import { connect } from "react-redux"; // connect api

function UserComponent({ count, increment, decrement }) {
  console.log("count", count);
  return (
    <div>
      i am the user component
      <div>
        Basic Counter
        <div>{count}</div>
        <button
          onClick={() => {
            increment();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
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
    increment: _ => ({
      type: "INC"
    }),
    decrement: _ => ({
      type: "DEC"
    })
  } /* mapStateToProps */
)(UserComponent);
