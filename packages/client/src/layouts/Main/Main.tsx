import { Topbar } from 'components';
import React, { ReactNode } from 'react';
import Styled from './styled';

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <Styled.Container>
      <Topbar />
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default Main;
