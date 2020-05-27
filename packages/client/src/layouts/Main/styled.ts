import styled from 'styled-components';
import { breakpoints } from 'styles';

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  padding-top: ${props => props.theme.topBar.mobile.height};

  @media ${breakpoints.sm} {
    padding-top: ${props => props.theme.topBar.desktop.height};
  }
`;

const Content = styled.main`
  padding: 100px 0px;
`;

export default {
  Container,
  Content,
};
