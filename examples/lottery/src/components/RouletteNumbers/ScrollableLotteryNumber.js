import { scrollToWhen } from '../../../../../lib';
import LoteryNumber from './LotteryNumber';
import {
  onDisplayDigit,
  DIGIT_DISPLAYED,
  NUMBER_GENERATED,
  RESET,
} from '../../actions';

const onEnd = (dispatch, canceled) => {
  if (!canceled) dispatch(onDisplayDigit());
};

export default scrollToWhen([
  ({ type, payload }, { positionNumber, number }, newState) => (
    [NUMBER_GENERATED, DIGIT_DISPLAYED].includes(type) &&
    positionNumber === newState.digitsDisplayed &&
    `${number}` === newState.winner.substr(positionNumber, 1) ?
      { onEnd, scrollOptions: { duration: 2000 } } :
      undefined
  ),
  ({ type }, { number }) => (type === RESET && number === null ?
    { scrollOptions: { duration: 0 } } : undefined
  ),
], {
  scrollOptions: { xAlignment: 'LEFT', yAlignment: null },
})(LoteryNumber);
