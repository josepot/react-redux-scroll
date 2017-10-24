const identity = x => x;

export const scrollableArea = identity;
export const scrollToWhen = () => identity;
export const createScrollMiddleware =
  () => () => next => action => next(action);
