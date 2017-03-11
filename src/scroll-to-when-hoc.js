import React from 'react';
import ReactDOM from 'react-dom';
import scrollTo from './scroll';
import { subscribe } from './middleware';

const getMatcher = (pattern) => {
  const patternType = typeof pattern;
  if (patternType === 'string') return ({ type }) => type === pattern;
  if (patternType === 'function') return pattern;
  if (Array.isArray(pattern)) {
    return action => pattern.some(p => getMatcher(p)(action));
  }

  throw new Error(
    `ScrollToWhen expected a string, a function or an Array of patterns as the pattern parameter, instead it received ${patternType}`
  );
};

export default (
  pattern,
  options = {},
  onEnd = Function.prototype
) => (Component) => {
  const matcher = getMatcher(pattern);

  return class Scrollable extends React.Component {
    constructor(props) {
      super(props);
      this.scroll = this.scroll.bind(this);
      this.check = this.check.bind(this);
      this.state = {
        subscription: subscribe(this.check, this.scroll, window, options, onEnd),
      };
    }

    componentWillUnmount() {
      this.state.subscription();
    }

    check(action, state, prevState) {
      return matcher(action, state, this.props, prevState) ?
        this.scroll.bind(this) : undefined;
    }

    scroll(...args) {
      return scrollTo(
        // eslint-disable-next-line react/no-find-dom-node
        ReactDOM.findDOMNode(this),
        ...args
      );
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};
