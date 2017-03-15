import React, { PropTypes } from 'react';
import { Block } from 'rebass';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ScrollableSlider from './ScrollableSlider';
import { scrollableArea } from '../../../../../lib';

const getRange = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) result.push(i);
  return result;
};

const RouletteNumbers = ({ nDigits }) =>
  <Block
    style={{
      width: '200px',
      height: '220px',
      overflow: 'scroll',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: '20px',
    }}
    border={0}
    m={0}
    p={0}
  >
    {getRange(0, nDigits).map(positionNumber =>
      <ScrollableSlider positionNumber={positionNumber} key={positionNumber} />
    )}
  </Block>;

RouletteNumbers.propTypes = {
  nDigits: PropTypes.number.isRequired,
};

export default compose(
  connect(({ maxRange }) => ({ nDigits: maxRange.toString(10).length })),
  scrollableArea
)(RouletteNumbers);
