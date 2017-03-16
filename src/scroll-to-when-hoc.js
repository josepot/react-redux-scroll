import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { subscribe } from './middleware';

const getMatcher = (pattern) => {
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

export default (
  pattern,
  onEnd,
  scrollOptions,
  excludedProps,
) => (Component) => {
  onEnd = onEnd || Function.prototype; // eslint-disable-line no-param-reassign
  scrollOptions = scrollOptions || {}; // eslint-disable-line no-param-reassign
  excludedProps = excludedProps || []; // eslint-disable-line no-param-reassign

  const matcher = getMatcher(pattern);

  class Scrollable extends React.Component {
    constructor(props, context) {
      super(props, context);
      const { getScrollContext = () => window } = context;
      this.check = this.check.bind(this);
      this.getDomEl = this.getDomEl.bind(this);
      this.state = {
        subscription: subscribe(
          this.check, this.getDomEl, getScrollContext(), onEnd, scrollOptions),
      };
    }

    componentWillUnmount() {
      this.state.subscription();
    }

    getDomEl() {
      return ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    }

    check(action, state, prevState) {
      return matcher(action, this.props, state, prevState);
    }

    render() {
      const newProps = Object
        .keys(this.props)
        // eslint-disable-next-line no-param-reassign
        .reduce((res, key) => { res[key] = this.props[key]; return res; }, {});
      excludedProps.forEach(key => delete newProps[key]);
      return <Component {...newProps} />;
    }
  }

  Scrollable.contextTypes = { getScrollContext: PropTypes.func };

  return Scrollable;
};
