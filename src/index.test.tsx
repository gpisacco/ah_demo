import React from 'react';
import { render, screen } from '@testing-library/react';
import { increment, decrement, changeStep, timer, Action, ReduxState, counter } from './store';




const create = () => {
  const store = {
    getState: jest.fn(() => {return {counter: 1, step: 1}}),
    dispatch: jest.fn((a: Action) => {})
  }
  const next = jest.fn()

  const invoke = (action: any) => timer(store)(next)(action)

  return { store, next, invoke }
}

test('should increment the counter', () => {
  expect(counter(1, { type: 'increment', payload: 1 })).toEqual(
    2
  )
})

test('should decrement the counter', () => {
  expect(counter(4, { type: 'decrement', payload: 1 })).toEqual(
    3
  )
})

test('should increment', () => {
  expect(increment(1)).toEqual(
    { type: 'increment', payload: 1 }
  )
})

test('should decrement', () => {
  expect(decrement(1)).toEqual(
    { type: 'decrement', payload: 1 }
  )
})

test('should change step', () => {
  expect(changeStep(4)).toEqual(
    { type: 'changeStep', payload: 4 }
  )
})

test('should call the middleware', () => {
  const {invoke, next} = create()
  const action = { type: 'changeStep', payload: 4 };
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})