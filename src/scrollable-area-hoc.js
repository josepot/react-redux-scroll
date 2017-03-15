import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default (Component) => {
  class ScrollableArea extends React.Component {
    constructor(props) {
      super(props);
      this.getScrollContext = this.getScrollContext.bind(this);
    }

    getChildContext() {
      return { getScrollContext: this.getScrollContext };
    }

    getScrollContext() {
      // eslint-disable-next-line react/no-find-dom-node
      return ReactDOM.findDOMNode(this);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  ScrollableArea.childContextTypes = {
    getScrollContext: PropTypes.func,
  };

  return ScrollableArea;
};
