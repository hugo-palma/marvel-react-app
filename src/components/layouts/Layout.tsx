import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

type Props = {};

const LayoutWrapper = styled.div`
  ${tw`flex flex-col overflow-hidden`};
`;

const MainContent = styled.main`
  ${tw`flex flex-col w-full`};
  flex: 1 0 auto;
  align-self: center;
`;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutWrapper>
        <MainContent>{children}</MainContent>
    </LayoutWrapper>
  );
};

export default Layout;
