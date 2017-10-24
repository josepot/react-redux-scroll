const target = process.env.HAS_SSR ? 'server' : 'browser';

const {
  createScrollMiddleware,
  scrollableArea,
  scrollToWhen,
} = require(`./index.${target}.js`); // eslint-disable-line import/no-dynamic-require

export { createScrollMiddleware, scrollableArea, scrollToWhen };
