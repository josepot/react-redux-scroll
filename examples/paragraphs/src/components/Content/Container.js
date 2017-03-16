import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { scrollToWhen } from 'react-redux-scroll';
import { SCROLL_TO_HEADER, SCROLL_TO_PARAGRAPH } from '../../actions';
import Content from './Component';

export default compose(
  connect(paragraphs => ({ paragraphs })),
  withProps({
    scrollableHeader: scrollToWhen(SCROLL_TO_HEADER, null, { yMargin: -50 }),
    scrollableParagraph: scrollToWhen(
      (action, props) => (
        action.type === SCROLL_TO_PARAGRAPH && props.id === action.paragraphId
      ),
      null,
      { yMargin: -60 },
      ['id']
    ),
  })
)(Content);
