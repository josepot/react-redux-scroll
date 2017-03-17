import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createScrollMiddleware } from 'react-redux-scroll';

const devMode = process.env.NODE_ENV !== 'production';

const loggerMiddleware = createLogger();

const getMiddlewares = () => {
  const common = [createScrollMiddleware()];
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
