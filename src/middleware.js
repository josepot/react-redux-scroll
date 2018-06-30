import scrollTo from './scroll';

let dispatch = null;
let latestId = 1;
const subscriptions = {};
const isProd = process.env.NODE_ENV === 'production';

const clearSubscription = id => {
  if (subscriptions[id].running) subscriptions[id].cancelScroll();
  delete subscriptions[id];
};

const setRunning = (id, value) => {
  subscriptions[id].running = value;
};

export const subscribe = (check, domEl, getContext, onEnd, scrollOptions) => {
  // eslint-disable-next-line no-plusplus
  const subscriptionId = latestId++;
  subscriptions[subscriptionId] = {
    check,
    domEl,
    getContext,
    onEnd,
    running: false,
    scrollOptions
  };
  return () => clearSubscription(subscriptionId);
};

const emit = (action, state, prevState) => {
  const takenContexts = new WeakSet();
  Object.keys(subscriptions)
    .map(key => ({
      key,
      options: subscriptions[key].check(action, state, prevState)
    }))
    .filter(({ options }) => !!options)
    .forEach(({ key, options }) => {
      const subscription = subscriptions[key];
      if (!takenContexts.has(subscription.getContext())) {
        takenContexts.add(subscription.getContext());
        setRunning(key, true);
        subscription.cancelScroll = scrollTo(
          subscription.domEl,
          subscription.getContext(),
          canceled => {
            setRunning(key, false);
            (options.onEnd || subscription.onEnd)(dispatch, canceled);
          },
          { ...subscription.scrollOptions, ...(options.scrollOptions || {}) }
        );
      } else if (!isProd) {
        // eslint-disable-next-line no-console
        console.warn(
          'A component was prevented from scrolling as a result of the ' +
            'lastest action because another scroll was triggered ' +
            'for the same context.'
        );
      }
    });
};

export default () =>
  process.env.IS_SSR
    ? () => next => action => next(action)
    : store => {
        dispatch = store.dispatch.bind(store);
        return next => action => {
          const prevState = store.getState();
          const result = next(action);
          emit(action, store.getState(), prevState);
          return result;
        };
      };
