import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { scrollToParagraph, scrollToHeader } from '../../actions';
import Navbar from './Component';

export default compose(
  connect(
    paragraphs => ({ paragraphs }),
    { scrollToParagraph, scrollToHeader }
  ),
  withState('isDropdownOpen', 'setDropdownState', false),
  withHandlers({ toogleDropdown:
    ({ isDropdownOpen, setDropdownState }) => () =>
      setDropdownState(!isDropdownOpen),
  })
)(Navbar);
