import { scrollToWhen } from 'react-redux-scroll';

import { DIGIT_DISPLAYED, RESET, NUMBER_GENERATED } from '../../actions';
import Slider from './Slider';

const SCROLL_TO_SLIDER_ROW_DURATION = 500;
const RESET_SCROLL_DURATION = 0;

const isNumberGeneratedForRow = ({ type }, { positionNumber }, newState) => (
  [NUMBER_GENERATED, DIGIT_DISPLAYED].includes(type) &&
  positionNumber === newState.digitsDisplayed
);
const isResetForFirstSlider = ({ type }, { positionNumber }) => (
  type === RESET && positionNumber === 0
);

const returnDurationWhen = ([conditionFn, duration]) => (...args) => (
  conditionFn(...args) ? { scrollOptions: { duration } } : null
);

export default scrollToWhen(
  [
    [isNumberGeneratedForRow, SCROLL_TO_SLIDER_ROW_DURATION],
    [isResetForFirstSlider, RESET_SCROLL_DURATION],
  ].map(returnDurationWhen),
  null,
  { yMargin: -20 }
)(Slider);
