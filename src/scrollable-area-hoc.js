import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import ReactDOM from 'react-dom';

export default Component => {
  if (process.env.IS_SSR) return Component;

  class ScrollableArea extends React.Component {
    constructor(props) {
      super(props);
      this.getScrollContext = this.getScrollContext.bind(this);
      this._domNode = null;
    }

    getChildContext() {
      return { getScrollContext: this.getScrollContext };
    }

    componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this._domNode = this._domNode || ReactDOM.findDOMNode(this);
    }

    getScrollContext() {
      return this._domNode;
    }

    render() {
      return <Component ref={x => (this._domNode = x)} {...this.props} />;
    }
  }

  ScrollableArea.childContextTypes = {
    getScrollContext: PropTypes.func
  };

  return hoistStatics(ScrollableArea, Component);
};
