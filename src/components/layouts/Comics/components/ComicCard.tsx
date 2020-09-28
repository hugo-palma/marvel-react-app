import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import tw from "twin.macro";
import styled from "styled-components";
const StyledDiv = styled.div`
  ${tw`flex flex-col items-center text-center shadow-lg overflow-hidden p-6 m-6`};
  border-radius: 10px;
  height: 325px;
  width: 200px;
`;
const StyledImage = styled.img`
  height: 225px;
  width: 150px;
`;

const StyledTitle = styled.h3``;

interface Props {
  id: string | undefined;
  imagePath: string | undefined;
  title: string | undefined;
  style: any;
}

const ComicCard: React.FC<Props> = (props) => {
  const [imagePath] = useState(props.imagePath);
  const [title] = useState(props.title);
  const location = useLocation();
  console.log(location.pathname);
  return (
    <StyledDiv style={props.style}>
      <StyledImage src={imagePath} alt={`imagen de comic ${title}`} />
      <StyledTitle>{title}</StyledTitle>
    </StyledDiv>
  );
};

export default ComicCard;
