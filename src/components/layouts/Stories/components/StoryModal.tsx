import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CSSProperties } from "styled-components";
import ReactDom from "react-dom";

import Result from "src/models/stories/Result";
import IResult from "src/models/IResults";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  itemInfo: IResult;
}
const StyledModal = styled.div`
  ${tw`fixed bg-white font-default rounded-lg`};
`;
const MODAL_STYLES: CSSProperties = {
  width: "1400px",
  height: "800px",
  top: "15%",
  left: "25%",
  transform: "translate(-25%, -15%)",
  padding: "50px",
  zIndex: 1000,
};
const OVERLAY_STYLES: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};
const StyledTitleContainer = styled.div`
  ${tw`text-center`}
`;
const StyledTitle = styled.h1`
  ${tw`text-5xl`}
`;
const ContentContainer = styled.div`
  ${tw`flex flex-row mx-12`};
`;
const DetailsContainer = styled.div`
  ${tw`ml-12`};
`;
const StyledDescriptionContainer = styled.div`
  ${tw`rounded-md bg-gray-400 mt-0 py-3`}
`;
const StyledDescriptionLabel = styled.h2`
  ${tw`my-0`}
`;
const StyledDescription = styled.h3`
  ${tw`mx-4`}
`;

const portalDiv = document.getElementById("portal");
const StoryModal: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [itemInfo, setItemInfo] = useState(props.itemInfo);
  const [StoryInfo, setStoryInfo] = useState({ ...itemInfo } as Result);
  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);
  useEffect(() => {
    setItemInfo(itemInfo);
    setStoryInfo({ ...itemInfo } as Result);
  }, [itemInfo]);
  if (!isOpen) return null;
  return portalDiv
    ? ReactDom.createPortal(
        <>
          <div style={OVERLAY_STYLES} onClick={props.onClose} />
          <StyledModal style={MODAL_STYLES}>
            <StyledTitleContainer>
              <StyledTitle>{getTitle(StoryInfo)}</StyledTitle>
            </StyledTitleContainer>
            <ContentContainer>
              <DetailsContainer>
                <StyledDescriptionLabel>Creators</StyledDescriptionLabel>
                <StyledDescriptionContainer>
                  <StyledDescription>{StoryInfo.creators.items?.map((creator) => creator.name).toString()}</StyledDescription>
                </StyledDescriptionContainer>
                <StyledDescriptionLabel>Series</StyledDescriptionLabel>
                <StyledDescriptionContainer>
                  <StyledDescription>{StoryInfo.series.items?.map((item) => item.name).toString()}</StyledDescription>
                </StyledDescriptionContainer>
                <StyledDescriptionLabel>Events</StyledDescriptionLabel>
                <StyledDescriptionContainer>
                  <StyledDescription>{StoryInfo.events.items?.map((event) => event.name).toString()}</StyledDescription>
                </StyledDescriptionContainer>
              </DetailsContainer>
              <DetailsContainer>                
                
                  <StyledDescriptionLabel>Description</StyledDescriptionLabel>
                  <StyledDescriptionContainer>
                    <StyledDescription>{StoryInfo.description}</StyledDescription>
                  </StyledDescriptionContainer>
                  <StyledDescriptionLabel>Characters</StyledDescriptionLabel>
                  <StyledDescriptionContainer>
                    <StyledDescription>{StoryInfo.characters.items?.map((character) => character.name).toString()}</StyledDescription>
                  </StyledDescriptionContainer>
                  <StyledDescriptionLabel>Comics</StyledDescriptionLabel>
                  <StyledDescriptionContainer>
                    <StyledDescription>{StoryInfo.comics.items?.map((comic) => comic.name).toString()}</StyledDescription>
                  </StyledDescriptionContainer>
              </DetailsContainer>
            </ContentContainer>
          </StyledModal>
        </>,
        portalDiv
      )
    : null;
};
function getTitle(item: IResult | undefined) {
  if (item && item.title) {
    return item.title;
  } else if (item && item.name) {
    return item.name;
  } else {
    return "";
  }
}
export default StoryModal;
