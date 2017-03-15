import { compose, mapProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { onGenerateNumber, onMaxRangeChange, onReset } from '../../actions';
import Header from './Component';

export default compose(
  connect(
    ({ digitsDisplayed, maxRange, winner }) => ({
      numbers: (winner === null ? maxRange.toString(10) : winner)
        .split('')
        .map((digit, idx) => (digitsDisplayed > idx ? digit : '')),
      maxRange,
      isReady: winner === null,
    }),
    { onGenerateNumber, onMaxRangeChange, onReset }
  ),
  mapProps(({
    isReady,
    maxRange,
    onGenerateNumber: generate,
    onReset: reset,
    ...props
  }) => ({
    isReady,
    maxRange,
    onClick: isReady ? generate.bind(null, maxRange) : reset,
    ...props,
  })),
  withHandlers({ onChange:
    ({ onMaxRangeChange: rangeChange }) => e =>
      rangeChange(parseInt(e.target.value, 10)),
  })
)(Header);

