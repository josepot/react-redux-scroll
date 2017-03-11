import IdsManager from './ids-manager';

let dispatch = null;
const idsManager = new IdsManager();
const subscriptions = {};

const clearSubscription = (id) => {
  if (subscriptions[id].cancelScroll) subscriptions[id].cancelScroll();
  idsManager.releaseId(id);
  subscriptions[id] = undefined;
};

export const subscribe = (check, scroll, context, options, onEnd) => {
  const subscriptionId = idsManager.getNewId();
  subscriptions[subscriptionId] = { check, scroll, context, options, onEnd };
  return () => clearSubscription(subscriptionId);
};

const emit = (action, state, prevState) => {
  const takenContexts = new WeakSet();
  Object.keys(subscriptions)
    .filter(key => subscriptions[key].check(action, state, prevState))
    .forEach((winnerKey) => {
      const winner = subscriptions[winnerKey];
      const { context } = winner;
      if (takenContexts.has(context) && process.env.NODE_ENV !== 'production') {
        console.warning( // eslint-disable-line no-console
          'A component was prevented from scrolling as a result of the ' +
          'lastest action because another scroll was triggered ' +
          'for the same context.'
        );
      } else {
        takenContexts.add(context);
        winner.cancelScroll = winner.scroll(
          context,
          (canceled) => {
            winner.cancelScroll = undefined;
            winner.onEnd(dispatch, canceled);
          },
          winner.options
        );
      }
    });
};

export default (store) => {
  dispatch = store.dispatch.bind(store);
  return next => (action) => {
    const prevState = store.getState();
    const result = next(action);
    emit(action, store.getState(), prevState);
    return result;
  };
};
