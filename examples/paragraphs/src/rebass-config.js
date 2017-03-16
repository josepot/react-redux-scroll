import { PropTypes } from 'react';
import { withContext } from 'recompose';
import { config } from 'rebass';

const rebass = {
  colors: {
    ...config.colors,
    gray2: '#666',
    darken: 'rgba(0, 0, 0, .9375)',
    d1: 'rgba(0, 0, 0, .125)',
  },
  Divider: {
    borderColor: 'inherit',
  },
  PageHeader: {
    borderColor: 'inherit',
  },
  SectionHeader: {
    borderColor: 'inherit',
  },
};

export default withContext(
  { rebass: PropTypes.object, reflexbox: PropTypes.object },
  () => ({
    rebass,
    reflexbox: {
      breakpoints: {
        sm: '(min-width: 30em)',
        md: '(min-width: 48em)',
        lg: '(min-width: 57.75em)',
      },
    },
  }),
);

