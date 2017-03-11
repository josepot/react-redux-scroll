import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { scrollMiddleware } from '../../lib';

const devMode = process.env.NODE_ENV !== 'production';

const loggerMiddleware = createLogger();

const getMiddlewares = () => {
  const common = [scrollMiddleware];
  const dev = [loggerMiddleware];
  const prod = [];
  return [...common, ...(devMode ? dev : prod)];
};

const getEnhancers = () => (
  devMode && window.devToolsExtension ? [window.devToolsExtension()] : []
);

export default reducer => compose(
  applyMiddleware(...getMiddlewares()),
  ...getEnhancers()
)(createStore)(reducer);
