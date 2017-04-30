import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default (Component) => {
  class ScrollableArea extends React.Component {
    constructor(props) {
      super(props);
      this.getScrollContext = this.getScrollContext.bind(this);
      this.state = { domNode: null };
    }

    getChildContext() {
      return { getScrollContext: this.getScrollContext };
    }

    componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      this.state.domNode = ReactDOM.findDOMNode(this);
    }

    getScrollContext() {
      return this.state.domNode;
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
