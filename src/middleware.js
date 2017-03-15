import IdsManager from './utils/ids-manager';
import CustomWeakSet from './utils/weakset';
import scrollTo from './scroll';

let dispatch = null;
const idsManager = new IdsManager();
const subscriptions = {};
const isProd = process.env.NODE_ENV === 'production';

const clearSubscription = (id) => {
  if (subscriptions[id].cancelScroll) subscriptions[id].cancelScroll();
  idsManager.releaseId(id);
  delete subscriptions[id];
};

export const subscribe = (check, getDomEl, context, onEnd, scrollOptions) => {
  const subscriptionId = idsManager.getNewId();
  subscriptions[subscriptionId] = {
    check,
    getDomEl,
    context,
    onEnd,
    scrollOptions,
  };
  return () => clearSubscription(subscriptionId);
};

const emit = (action, state, prevState) => {
  const takenContexts = new CustomWeakSet();
  Object.keys(subscriptions)
    .map(key => ({
      key,
      options: subscriptions[key].check(action, state, prevState),
    }))
    .filter(({ options }) => !!options)
    .forEach(({ key, options }) => {
      const subscription = subscriptions[key];
      if (takenContexts.has(subscription.context) && !isProd) {
        console.warn( // eslint-disable-line no-console
          'A component was prevented from scrolling as a result of the ' +
          'lastest action because another scroll was triggered ' +
          'for the same context.'
        );
      } else {
        takenContexts.add(subscription.context);
        subscription.cancelScroll = scrollTo(
          subscription.getDomEl(),
          subscription.context,
          (canceled) => {
            subscription.cancelScroll = undefined;
            (options.onEnd || subscription.onEnd)(dispatch, canceled);
          },
          { ...(subscription.scrollOptions), ...(options.scrollOptions || {}) }
        );
      }
    });
};

export default () => (store) => {
  dispatch = store.dispatch.bind(store);
  return next => (action) => {
    const prevState = store.getState();
    const result = next(action);
    emit(action, store.getState(), prevState);
    return result;
  };
};
