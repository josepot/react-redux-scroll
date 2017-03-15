import { combineReducers } from 'redux';

import {
  DIGIT_DISPLAYED,
  MAX_RANGE_CHANGED,
  NUMBER_GENERATED,
  RESET,
} from './actions';

const maxRange = (state = 9999, { type, payload }) => (
  type === MAX_RANGE_CHANGED ? payload : state
);

const digitsDisplayed = (state = 0, { type }) => (
  type === DIGIT_DISPLAYED  ? state + 1 :
  type === RESET            ? 0 :
                              state
);

const winner = (state = null, { type, payload } = {}) => (
  type === NUMBER_GENERATED ? payload :
  type === RESET            ? null :
                              state
);

export default combineReducers({ maxRange, digitsDisplayed, winner });
