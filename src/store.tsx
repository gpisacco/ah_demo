import { combineReducers, configureStore, createAction } from "@reduxjs/toolkit";

export interface Action {
    payload: number;
    type: string;
  }
  
  export interface ReduxState {
    counter: number;
    step: number;
  }
  
  //redux actions to alter counter and step values
  export const increment = createAction("increment", function prepare(value: number) {
    return {
      payload: value
    }
  });
  export const decrement = createAction("decrement", function prepare(value: number) {
    return {
      payload: value
    }
  });
  export const changeStep = createAction("changeStep", function prepare(value: number) {
    return {
      payload: value
    }
  });
  
  //counter reducer
  export const counter = (value = 0, action: Action) => {
    return increment.match(action) ? value + action.payload : decrement.match(action) ? value - action.payload : value;
  }
  //step reducer
  const step = (value = 1, action: Action) => {
    return changeStep.match(action) ? action.payload : value;
  }
  
  //this functions combines all existing reducers to be configured in the store
  const root = combineReducers({ counter, step });
  
  //middleware interceptor
  export const timer = ({ dispatch, getState }: { dispatch: (action: Action) => void, getState: () => ReduxState }) => {
    setInterval(() => {
      const payload = getState();
      if (payload.counter < 0)
        dispatch(decrement(payload.step))
      else if (payload.counter < 10)
        dispatch(increment(payload.step))
    }, 1000);
    return (next: (a: Action) => void) => (action: Action) => {
      next(action);
    };
  };
  
  export const store = configureStore({
    reducer: root,
    middleware: [timer],
  });
  