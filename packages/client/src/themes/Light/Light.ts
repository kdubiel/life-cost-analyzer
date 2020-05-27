// eslint-disable-next-line import/named
import { DefaultTheme } from 'styled-components';

import { breakpoints } from 'styles';

const Light: DefaultTheme = {
  breakpoints,
  sideBar: {
    width: '240px',
  },
  topBar: {
    mobile: {
      height: '56px',
    },
    desktop: {
      height: '64px',
    },
  },
  palette: {
    background: {
      default: 'red',
    },
  },
};

export default Light;
