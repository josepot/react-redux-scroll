import React, { PropTypes } from 'react';
import { withProps } from 'recompose';
import {
  Badge,
  Block,
  ButtonCircle,
  Slider,
  Text,
} from 'rebass';
import Icon from 'react-geomicons';

const CenteredBlock = withProps({
  style: {
    margin: '0 auto',
    textAlign: 'center',
  },
})(Block);

const Button = ({ isReady, onClick }) =>
  <ButtonCircle
    style={{ width: '70px', height: '70px', fontSize: '4.75vw' }}
    onClick={onClick}
    title={isReady ? 'start' : 'reset'}
  >
    <Icon name={isReady ? 'play' : 'repost'} />
  </ButtonCircle>;

const Result = ({ numbers }) =>
  <CenteredBlock>
    {numbers.map((n, idx) =>
      <Badge
        circle
        m={2}
        key={`${idx}`} // eslint-disable-line react/no-array-index-key
        rounded
        style={{ width: '65px', height: '65px', fontSize: '3.5vw' }}
        theme="success"
      >{n}</Badge>)}
  </CenteredBlock>;

Result.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Button.propTypes = {
  isReady: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Header = ({
  isReady,
  onClick,
  onChange,
  maxRange,
  numbers,
}) => (
  <Block m={0} backgroundColor="blue">
    <CenteredBlock>
      <Text
        bold
        mt={2}
      >{`Generate Random number between 0 and ${maxRange}`}</Text>
    </CenteredBlock>
    <CenteredBlock>{isReady ?
      <Slider
        fill
        hideLabel
        label=""
        name="randomRange"
        min={9}
        max={99999}
        value={maxRange}
        onChange={onChange}
        style={{ fontSize: '3vw' }}
      /> : null}
    </CenteredBlock>
    <Result numbers={numbers} />
    <CenteredBlock>
      <Button isReady={isReady} onClick={onClick} />
    </CenteredBlock>
  </Block>
);

Header.propTypes = {
  onChange: PropTypes.func.isRequired,
  maxRange: PropTypes.number.isRequired,
  ...Button.propTypes,
  ...Result.propTypes,
};

export default Header;
