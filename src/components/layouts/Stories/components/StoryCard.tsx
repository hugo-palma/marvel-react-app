import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";

import StoryModal from 'src/components/layouts/Stories/components/StoryModal'
import IResult from "src/models/IResults";

const StyledDiv = styled.div`
  ${tw`flex flex-col items-center text-center shadow-lg overflow-hidden p-6 m-6 font-default`};
  border-radius: 10px;
  height: 325px;
  width: 200px;
`;
const StyledTile = styled.h1`
  ${tw`text-center `}
`;
const StyledStoryName = styled.h3``;
interface Props {
  result: IResult;
  style: any;
}

const StoryCard: React.FC<Props> = (props) => {
  const [itemInfo] = useState(props.result);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  return (
    <>
      <StyledDiv onClick={openModal} style={props.style}>
      <StyledTile>Story</StyledTile>
        <StyledStoryName>{getTitle(itemInfo)}</StyledStoryName>
      </StyledDiv>
      <StoryModal itemInfo={itemInfo} isOpen={isModalOpen} onClose={closeModal}/>
    </>
  );
};
function getTitle(item: IResult | undefined) {
  if(item && item.title){
    return item.title
  }
  else if(item && item.name){
    return item.name
  }
  else{
    return ''
  }
}
export default StoryCard;