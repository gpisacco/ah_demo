// Copyright (c) Astraeus Health Corporation 2022

/*
This is a React app that uses Redux store with a reducer and a middleware.

Your assignment is to make it more readable, and also add some functionality.

Specifically, please consider doing the following, in no particular order:
 1) Replace single-letter variable names with something more descriptive. x
 2) Provide comments for each of the functions. x
 3) Provide a general comment for the entire program, describing its purpose.
 4) Replace type any with something more specific.  x
 5) Do not allow timer to increment counter past 10. x
 6) Trigger an alert when counter reaches 20. x
 7) If counter goes below zero, make timer decrement rather than increment it. x
 8) Add a drop-down to select increment and decrement step between 1, 2, and 3. x
 9) Use monospace font for all text on the page. x
 10) Create unit tests for increment, decrement and counter functions.
 11) Create package configuration that could be used to serve the page. x
 12) Change App to log the timestamp of when that component did mount. x
*/

import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import './index.css';
import { changeStep, decrement, increment, ReduxState } from "./store";

const App = () => {
  //captures the dispatch method from redux
  const dispatch = useDispatch();
  //counter and step changes the local state when a global state is modified in redux
  const counter = useSelector((s: ReduxState) => s.counter);
  const step = useSelector((s: ReduxState) => s.step);

  useEffect(() => {
    console.log('Functionality previously known as componentDidMount', new Date().getTime())
  }, [])

  return (
    <>
      <div>
        <p>Select a step size</p>
        <select onChange={(e) => dispatch(changeStep(parseInt(e.target.value)))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <p>Increment by step</p>
        <button onClick={() => dispatch(decrement(step))}>-</button>
        {counter}
        <button onClick={() => dispatch(increment(step))}>+</button>
        {counter > 20 && <p>Counter is greater than 20</p>}
      </div>
    </>
  );
};

export default App;