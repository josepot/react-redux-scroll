// Action types
export const SCROLL_STARTED = 'SCROLL_STARTED';
export const SCROLL_ENDED = 'SCROLL_ENDED';

// Action Creators
export const onScrollStart = number => ({
  type: SCROLL_STARTED,
  payload: number,
});
