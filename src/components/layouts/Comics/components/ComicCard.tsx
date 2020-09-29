import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import path from "path";

import ComicModal from 'src/components/layouts/Comics/components/ComicModal'
import IResult from "src/models/IResults";
import { ImagesUrlCreator } from "src/lib/ComicImageUrlCreator";
import { placeholderMarvelImage } from "src/images/index";
const placeholderMarvelImagePath = path.resolve(placeholderMarvelImage);

const StyledDiv = styled.div`
  ${tw`flex flex-col items-center text-center shadow-lg overflow-hidden p-6 m-6 font-default`};
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
  result: IResult;
  style: any;
}

const ComicCard: React.FC<Props> = (props) => {
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
        <StyledImage src={getImagePath(itemInfo)} alt={`imagen de comic ${getTitle(itemInfo)}`} />
        <StyledTitle>{getTitle(itemInfo)}</StyledTitle>
      </StyledDiv>
      <ComicModal itemInfo={itemInfo} isOpen={isModalOpen} onClose={closeModal}/>
    </>
  );
};

function getImagePath(item:IResult | undefined) {
  const images = getImages(item)
  if(images && images.length > 0){
    return ImagesUrlCreator.createItemImageUrl(images[0].path, images[0].extension)
  }
  else{
    return placeholderMarvelImagePath
  }
}
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
function getImages(item: IResult| undefined) {
  if(item && item.images)
  {
    return item.images
  }
  else if(item && item.thumbnail){
    return [item.thumbnail]
  }
  else return
}
export default ComicCard;