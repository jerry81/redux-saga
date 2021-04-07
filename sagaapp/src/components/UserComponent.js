import React from "react";
import { connect } from "react-redux"; // connect api

export default function UserComponent(props) {
  function increment() {
      console.log('increment')
  }
  function decrement() {
      console.log('decrement')
  }
  return (
    <div>
      i am the user component
      <div>
        Basic Counter
        <div>currentCount</div>
        <button onClick={() => { increment() }}>+</button>
        <button onClick={() => { decrement() }}>-</button>
      </div>
    </div>
  );
}
