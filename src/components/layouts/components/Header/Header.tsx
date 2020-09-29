import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { MarvelLogo, DottedLine } from "src/icons/index";

type Props = {};

const HeaderWrapper = styled.header`
  ${tw`w-full`};
`;

const HeaderLayout = styled.div`
  ${tw`mx-auto`};
`;

const HeaderContent = styled.div`
  ${tw`flex ml-8 mr-32 items-center justify-between`};
  height: 100px;
`;

const Navigation = styled.nav`
  ${tw`flex items-stretch justify-between items-center`};
`;

const StyledLink = styled(Link)`
  ${tw`ml-10`};
`;

const StyledNavigationLink = styled(NavLink)`
  ${tw`font-default  mx-10 
  `};
  min-height: 30px;
  &&& {
    text-decoration: none;
  }
  &:hover,
  &.active {
    border-width: 0 0 4px 0;
    border-style: dotted;
    border-image-source: url(${DottedLine});
    border-image-repeat: round;
  }
`;
const StyledH1 = styled.h1`
  ${tw`text-marvel`};
  text-decoration: none;
`;

const Header: React.FC<Props> = () => {
  return (
    <HeaderWrapper>
      <HeaderLayout>
        <HeaderContent>
          <StyledLink to="/">
            <img src={MarvelLogo} alt={'Marvel Icon'}/>
          </StyledLink>
          <Navigation>
            <StyledNavigationLink activeClassName="active" to="/comics">
              <StyledH1>Comics</StyledH1>
            </StyledNavigationLink>
            <StyledNavigationLink activeClassName="active" to="/stories">
              <StyledH1>Stories</StyledH1>
            </StyledNavigationLink>
            <StyledNavigationLink activeClassName="active" to="/characters">
              <StyledH1>Characters</StyledH1>
            </StyledNavigationLink>
            <StyledNavigationLink activeClassName="active" to="/about">
              <StyledH1>About</StyledH1>
            </StyledNavigationLink>
          </Navigation>
        </HeaderContent>
      </HeaderLayout>
    </HeaderWrapper>
  );
};

export default Header;
