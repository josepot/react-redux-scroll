import React, { PropTypes } from 'react';
import {
  Arrow,
  Dropdown,
  DropdownMenu,
  Fixed,
  NavItem,
  Space,
  Toolbar,
} from 'rebass';

const Navbar = ({
  toogleDropdown,
  isDropdownOpen,
  paragraphs,
  scrollToParagraph,
  scrollToHeader,
}) => (
  <Fixed top left right zIndex={1}>
    <Toolbar>
      <NavItem href="https://github.com/josepot/react-redux-scroll">
        React Redux Scroll
      </NavItem>
      <Space auto />
      <Dropdown>
        <NavItem onClick={toogleDropdown}>
          Scroll to Paragraph
          <Arrow />
        </NavItem>
        <DropdownMenu
          right
          onDismiss={toogleDropdown}
          open={isDropdownOpen}
        >
          {paragraphs.map(({ id, title }) =>
            <NavItem key={id} onClick={() => scrollToParagraph(id)}>
              {title}
            </NavItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Space />
      <NavItem onClick={scrollToHeader}>
        Scroll to Header
      </NavItem>
    </Toolbar>
  </Fixed>
);

Navbar.propTypes = {
  toogleDropdown: PropTypes.func.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  scrollToParagraph: PropTypes.func.isRequired,
  scrollToHeader: PropTypes.func.isRequired,
};

export default Navbar;
