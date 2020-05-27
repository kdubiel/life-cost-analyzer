import { AppBar, Button, Toolbar } from '@material-ui/core';
import Assessment from '@material-ui/icons/Assessment';
import { Flex } from 'components';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface Props {}

const StyledLogo = styled(RouterLink)<LinkProps>`
  color: white;
  text-decoration: none;
`;

const Topbar = (_props: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Button startIcon={<Assessment />} style={{ color: 'white' }}>
          <StyledLogo to="/">
            <span>Life cost analyzer</span>
          </StyledLogo>
        </Button>
        <Flex.Grow />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
