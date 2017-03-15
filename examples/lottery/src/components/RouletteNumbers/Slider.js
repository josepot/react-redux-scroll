import React, { PropTypes } from 'react';
import { Block } from 'rebass';
import ScrollableLotteryNumber from './ScrollableLotteryNumber';
import { scrollableArea } from '../../../../../lib';

const ScrollableArea = scrollableArea(Block);
const SLIDE_SIZE = '200px';
const dimensions = { width: SLIDE_SIZE, height: SLIDE_SIZE };

const Slider = ({ positionNumber }) =>
  <ScrollableArea
    m={0}
    p={0}
    style={{
      ...dimensions,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Block m={0} p={0} style={{ width: '999999999999px', height: SLIDE_SIZE }}>
      {[null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number =>
        <ScrollableLotteryNumber
          positionNumber={positionNumber}
          key={number}
          style={dimensions}
          number={number}
        />
      )}
    </Block>
  </ScrollableArea>;

Slider.propTypes = {
  positionNumber: PropTypes.number.isRequired,
};

export default Slider;

