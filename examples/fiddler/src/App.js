import { PropTypes } from 'react';
import R from 'ramda';
import { compose, withState, withHandlers, withContext } from 'recompose';
import { connect } from 'react-redux';

import rebassConfig from './rebass-config';
import ControlPanel from './components/ControlPanel';
import { onScrollStart } from './actions';

const withEventState = ([name, updater, initialValue]) => compose(
  withState(name, updater, initialValue),
  withHandlers({ [updater]: props => e => props[updater](
    typeof initialValue === 'number' ?
      parseInt(e.target.value, 10) :
      e.target.value
  ) })
);

export default compose(
  rebassConfig,
  ...[
    ['numberToScroll', 'onNumberToScrollChange', 6],
    ['duration', 'onDurationChange', 500],
    ['transitionTimingFunction', 'onTimingFnChange', 'EASE_IN_QUAD'],
    ['yAlignment', 'onYAlignmentChange', 'TOP'],
    ['xAlignment', 'onXAlignmentChange', 'LEFT'],
    ['yMargin', 'onYMarginChange', 0],
    ['xMargin', 'onXMarginChange', 0],
  ].map(withEventState),
  connect(R.identity, { onScrollStart }),
  withContext(
    { scrollOptions: PropTypes.object },
    props => ({
      scrollOptions: R.pick([
        'duration', 'transitionTimingFunction',
        'yAlignment', 'xAlignment', 'yMargin', 'xMargin',
      ], props),
    })
  )
)(ControlPanel);
