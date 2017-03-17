import R from 'ramda';
import React, { PropTypes } from 'react';
import { Block } from 'rebass';
import { compose, getContext } from 'recompose';

import { scrollableArea, scrollToWhen } from 'react-redux-scroll';
import { SCROLL_STARTED, SCROLL_ENDED } from '../actions';

const SIZE = 300;

const BlockNumber = ({ number }) =>
  <div
    style={{
      width: `${Math.floor(SIZE / 2)}px`,
      height: `${Math.floor(SIZE / 2)}px`,
      float: 'left',
      border: '1px solid black',
      textAlign: 'center',
      fontFamily: 'Monospace',
      fontSize: `${Math.floor(SIZE / 4.5)}px`,
    }}
  >{number}</div>;
BlockNumber.propTypes = { number: PropTypes.number.isRequired };

const ScrollableNumber = compose(
  getContext({ scrollOptions: PropTypes.object }),
  scrollToWhen(
    ({ type, payload }, { number, scrollOptions }) => (
      type === SCROLL_STARTED && payload === number ? { scrollOptions } : null
    ),
    (dispatch, canceled) => dispatch({ type: SCROLL_ENDED, canceled })
  )
)(BlockNumber);

const ScrollArea = () =>
  <Block
    style={{
      width: `${SIZE}px`,
      height: `${SIZE}px`,
      overflow: 'scroll',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
    border={0}
    m={0}
    p={0}
  >
    <Block m={0} p={0} border={0} style={{ width: `${SIZE * 2}px` }}>
      {R.range(1, 17).map(number =>
        <ScrollableNumber number={number} key={number} />
      )}
    </Block>
  </Block>;

export default scrollableArea(ScrollArea);
