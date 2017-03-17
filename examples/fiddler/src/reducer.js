import { combineReducers } from 'redux';
import { SCROLL_STARTED, SCROLL_ENDED } from './actions';

const isScrollRunning = (state = false, { type }) => (
  type === SCROLL_STARTED ? true :
  type === SCROLL_ENDED   ? false :
                            state
);

export default combineReducers({ isScrollRunning });
