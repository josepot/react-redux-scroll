import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import hoistStatics from 'hoist-non-react-statics';
import { subscribe } from './middleware';

const getMatcher = pattern => {
  const patternType = typeof pattern;
  if (patternType === 'string') return ({ type }) => type === pattern;
  if (patternType === 'function') return pattern;
  if (Array.isArray(pattern)) {
    return (...args) => {
      let val;
      for (let i = 0; !val && i < pattern.length; i += 1) {
        val = getMatcher(pattern[i])(...args);
      }
      return val;
    };
  }

  throw new Error(
    `ScrollToWhen expected a string, a function or an Array of patterns as the pattern parameter, instead it received ${patternType}`
  );
};

const getArgs = args => {
  if (args.length === 0)
    throw new Error('scrollToWhen HOC expects at least 1 argument');
  if (args.length > 1) return args;
  if (typeof args[0] !== 'object') return args;
  return [
    args[0].pattern,
    args[0].onEnd,
    args[0].scrollOptions,
    args[0].excludedProps
  ];
};

export default (...args) => Component => {
  if (process.env.IS_SSR) return Component;
  const [
    pattern,
    onEnd = Function.prototype,
    scrollOptions = {},
    excludedProps = []
  ] = getArgs(args).map(x => (x === null ? undefined : x));

  const matcher = getMatcher(pattern);

  class Scrollable extends React.Component {
    constructor(props, context) {
      super(props, context);
      this._domNode = null;
      this.check = this.check.bind(this);
      this.subscription = Function.prototype;
    }

    componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this._domNode = this._domNode || ReactDOM.findDOMNode(this);
      this.subscription = subscribe(
        this.check,
        this._domNode,
        this.context.getScrollContext || (() => window),
        onEnd,
        scrollOptions
      );
    }

    componentWillUnmount() {
      this.subscription();
    }

    check(action, state, prevState) {
      return matcher(action, this.props, state, prevState);
    }

    render() {
      const newProps =
        excludedProps.length > 0 ? { ...this.props } : this.props;
      excludedProps.forEach(key => delete newProps[key]);
      return <Component ref={x => (this._domNode = x)} {...newProps} />;
    }
  }

  Scrollable.contextTypes = { getScrollContext: PropTypes.func };

  return hoistStatics(Scrollable, Component);
};
