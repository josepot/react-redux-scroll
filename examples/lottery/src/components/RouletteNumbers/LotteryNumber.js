import React, { PropTypes } from 'react';
import { Badge, Block } from 'rebass';

const ScrollableNumber = ({ style, number }) =>
  <Block style={{ ...style, float: 'left' }} m={0} p={0} border={0}>
    <Badge
      style={{ width: '90%', height: '90%', fontSize: '10vw' }}
      circle
      rounded
    >{number}</Badge>
  </Block>;

ScrollableNumber.defaultProps = { number: null };

ScrollableNumber.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number,
};

export default ScrollableNumber;

