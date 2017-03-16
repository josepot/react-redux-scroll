import { scrollToWhen } from 'react-redux-scroll';

import LoteryNumber from './LotteryNumber';
import {
  onDisplayDigit,
  DIGIT_DISPLAYED,
  NUMBER_GENERATED,
  RESET,
} from '../../actions';

const SCROLL_TO_NUMBER_DURATION = 2000;
const RESET_DURATION = 0;

const isNumberSelected = (
  { type, payload },
  { positionNumber, number },
  newState
) => (
  number !== null &&
  [NUMBER_GENERATED, DIGIT_DISPLAYED].includes(type) &&
  positionNumber === newState.digitsDisplayed &&
  number.toString(10) === newState.winner.substr(positionNumber, 1)
);

const isReset = ({ type }, { number }) => (type === RESET && number === null);

const onEndScrollingToNumber = (dispatch, canceled) => {
  if (!canceled) dispatch(onDisplayDigit());
};

const returnOptionsWhen = ([conditionFn, options]) => (...args) => (
  conditionFn(...args) ? options : null
);

export default scrollToWhen(
  [
    [isNumberSelected, {
      onEnd: onEndScrollingToNumber,
      scrollOptions: { duration: SCROLL_TO_NUMBER_DURATION },
    }],
    [isReset, {
      scrollOptions: { duration: RESET_DURATION },
    }],
  ].map(returnOptionsWhen),
  null,
  { xAlignment: 'LEFT', yAlignment: null }
)(LoteryNumber);
