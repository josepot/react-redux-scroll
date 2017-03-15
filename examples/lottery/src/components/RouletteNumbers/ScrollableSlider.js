import { scrollToWhen } from '../../../../../lib';
import { DIGIT_DISPLAYED, RESET, NUMBER_GENERATED } from '../../actions';
import Slider from './Slider';

const NUMBER_GENERATED_SCROLL_DURATION = 500;
const RESET_SCROLL_DURATION = 0;

const isNumberGeneratedForSlider = ({ type }, { positionNumber }, newState) => (
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
    [isNumberGeneratedForSlider, NUMBER_GENERATED_SCROLL_DURATION],
    [isResetForFirstSlider, RESET_SCROLL_DURATION],
  ].map(returnDurationWhen),
  {
    scrollOptions: { yMargin: -20 },
  }
)(Slider);
